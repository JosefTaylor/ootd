import React, { useEffect, useState } from "react";

import { getDashboardData, deleteWear } from "../ootdApi.jsx";
import { getInference } from "../roboflowApi.jsx";
import DateSelector from "../components/DateSelector.jsx";
import Card from "../components/Card.jsx";
import DataTable from "../components/DataTable.jsx";
import GarmentSelector from "../components/GarmentSelector.jsx";
import { formatCost } from "./Wardrobe.jsx";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [daySelected, setDateSelected] = useState(new Date());
  const [refreshData, setRefreshData] = useState(true);
  const [predictions, setPredictions] = useState(null);
  const [imageEncoded, setImageEncoded] = useState(null);

  useEffect(() => {
    async function func() {
      const newData = await getDashboardData();
      setDashboardData(newData);
      setRefreshData(false);
    }
    func();
  }, [refreshData]);

  const handleEncodeFile = async (img) => {
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      async () => {
        // convert image file to base64 string
        setImageEncoded(reader.result);

        const response = await getInference(reader.result);
        // setInference(response);
        setPredictions(response?.predictions);
      },
      false
    );

    reader.readAsDataURL(img);
  };

  if (!dashboardData) {
    return <p>Loading...</p>;
  }

  // show only those wears which occur today
  const filteredWears = dashboardData.garment_wears.filter((wear) => {
    const date = new Date(wear.scan_date);
    let yesterday = new Date(daySelected);
    yesterday.setDate(yesterday.getDate() - 1);
    return (date > yesterday) & (date <= daySelected);
  });

  // show only garments which are active today
  const filteredGarments = dashboardData.garments.filter((garment) => {
    const aq_date = new Date(garment.purchase_date);
    const deaq_date = garment.deaq_date ? new Date(garment.deaq_date) : null;
    return aq_date <= daySelected && (!deaq_date || daySelected <= deaq_date);
  });

  const inPrediction = (garment) => {
    const searchText = [garment.name, ...garment.tags].join(" ").toLowerCase();
    if (predictions) {
      return predictions
        .map((prediction) =>
          searchText.includes(prediction.class.toLowerCase())
        )
        .reduce((a, b) => a || b);
    } else {
      return false;
    }
  };

  const toSelectOption = (garment) => {
    return {
      value: garment,
      label: [
        garment.name,
        Intl.NumberFormat("en-US", {
          currency: "USD",
          style: "currency",
        }).format(garment.cost_per_wear) + "/wear",
      ].join(" "),
    };
  };

  const inGroup = filteredGarments
    .filter((garment) => inPrediction(garment))
    .map((garment) => toSelectOption(garment));
  const outGroup = filteredGarments
    .filter((garment) => !inPrediction(garment))
    .map((garment) => toSelectOption(garment));

  const garmentGroups = predictions
    ? [
        { label: "predicted", options: inGroup },
        {
          label:
            inGroup.length > 0
              ? "others"
              : "nothing matched the robot's guesses.",
          options: outGroup,
        },
      ]
    : outGroup;

  // Calculate the cost of the whole outfit
  const outfitCost = filteredWears.reduce((sum, wear) => sum + wear.cost, 0);

  return (
    <div className="wrapper stack pad-1 wd-max ht-full">
      <Card className="ht-150-min" title="What are you wearing?">
        <DateSelector
          date={daySelected}
          onClick={(n) => () => {
            let newDay = new Date(daySelected);
            newDay.setDate(daySelected.getDate() + n);
            setDateSelected(newDay);
          }}
          onChange={(event) => {
            setDateSelected(new Date(event.target.value));
          }}
          name="Outfit on:  "
        />
        {imageEncoded ? (
          <div className="center">
            <img
              alt={
                predictions
                  ? "A picture of a beautiful human being in a STUNNING outfit."
                  : null
              } // images without alt text are blurred by reset.css. poor man's loading spinner.
              height={"250px"}
              src={imageEncoded}
            />
            {/* <br />  */}
            <button onClick={() => setImageEncoded(null)}>Remove</button>
          </div>
        ) : (
          <div className="center">
            <label htmlFor="selfie">
              Take a selfie and a robot will check your fit!
            </label>
            <input
              type="file"
              id="selfie"
              accept="image/*"
              capture="user"
              onChange={(event) => {
                handleEncodeFile(event.target.files[0]);
              }}
            />
          </div>
        )}
        <GarmentSelector date={daySelected} onChange={setRefreshData}>
          {garmentGroups}
        </GarmentSelector>
        <DataTable>
          {filteredWears.map((wear) => (
            <div key={wear.id} className="data-item">
              <WearLine
                wear={wear}
                onChange={() => {
                  setRefreshData(true);
                }}
              />
            </div>
          ))}
        </DataTable>
        <p>Your outfit cost you {formatCost(outfitCost)} today</p>
      </Card>
    </div>
  );
}

export function WearLine(props) {
  return (
    <div className="splitter">
      <div className="garment-name">{props.wear.garment_name}</div>
      <div className="cost-per-wear">{formatCost(props.wear.cost)}/wear</div>
      <div>
        <button
          onClick={async () => {
            await deleteWear(props.wear);
            props.onChange();
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
