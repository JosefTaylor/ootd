import React, { useEffect, useState } from "react";

import { getDashboardData, deleteWear, FromClosetDate } from "../ootdApi.jsx";
import { getInference } from "../roboflowApi.jsx";
import DateSelector from "../components/DateSelector.jsx";
import Card from "../components/Card.jsx";
import DataTable from "../components/DataTable.jsx";
import GarmentSelector from "../components/GarmentSelector.jsx";
import { formatCost } from "./Wardrobe.jsx";
import { useNavigate } from "react-router-dom";

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
    const date = FromClosetDate(wear.date);
    let yesterday = new Date(daySelected);
    yesterday.setDate(yesterday.getDate() - 1);
    return (date > yesterday) & (date <= daySelected);
  });

  // show only garments which are active today
  const filteredGarments = dashboardData.garments.filter((garment) => {
    const aq_date = FromClosetDate(garment.purchase_date);
    const deaq_date = garment.deaq_date
      ? FromClosetDate(garment.deaq_date)
      : null;
    return aq_date <= daySelected && (!deaq_date || daySelected <= deaq_date);
  });

  const inPrediction = (garment) => {
    const searchText = [garment.name, ...garment.tags].join(" ").toLowerCase();
    if (predictions?.length > 0) {
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

  //Remove tags from garment wears from the prediction list
  const garmentsWorn = filteredWears.map((wear) => wear.garment_id);
  const tagsWorn = new Set(
    filteredGarments
      .filter((garment) => garmentsWorn.includes(garment.id))
      .map((garment) => [garment.name, ...garment.tags].join(" ").toLowerCase())
      .join(" ")
      .split(" ")
  );
  const predictionsRemaining = !predictions
    ? null
    : tagsWorn
    ? predictions.filter((pred) => {
        return !tagsWorn.has(pred.class);
      })
    : predictions;

  // Calculate the cost of the whole outfit
  const outfitCost = filteredWears.reduce((sum, wear) => sum + wear.cost, 0);

  return (
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
        <div className="img-overlay">
          <img
            alt={
              predictions
                ? "A picture of a beautiful human being in a STUNNING outfit."
                : null
            } // images without alt text are blurred by reset.css. poor man's loading spinner.
            src={imageEncoded}
          />
          <button className="warning" onClick={() => setImageEncoded(null)}>
            ✖️
          </button>
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
      <GarmentSelector
        date={daySelected}
        tags={predictionsRemaining?.map((pred) => pred.class)}
        onChange={setRefreshData}
      >
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
      {filteredWears.length > 0 ? (
        <p>Your outfit cost you {formatCost(outfitCost)} today</p>
      ) : (
        ""
      )}
    </Card>
  );
}

export function WearLine(props) {
  const navigate = useNavigate();
  return (
    <div className="splitter">
      <button
        className="invisible"
        onClick={() => {
          console.log();
          navigate("/wardrobe/" + props.wear.garment_id.toString());
        }}
      >
        <div className="garment-name">{props.wear.garment_name}</div>
      </button>
      <div className="cost-per-wear">{formatCost(props.wear.cost)}/wear</div>
      <div>
        <button
          className="invisible"
          onClick={async () => {
            await deleteWear(props.wear);
            props.onChange();
          }}
        >
          ✖️
        </button>
      </div>
    </div>
  );
}
