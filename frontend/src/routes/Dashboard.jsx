/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

import { getDashboardData, deleteWear } from "../ootdApi.jsx";
import { getInference } from "../roboflowApi.jsx";
import DateSelector from "../components/DateSelector.jsx";
import Card from "../components/Card.jsx";
import DataTable from "../components/DataTable.jsx";
import GarmentSelector from "../components/GarmentSelector.jsx";
import { formatCost } from "./Wardrobe.jsx";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [daySelected, setDateSelected] = useState(new Date());
  const [refreshData, setRefreshData] = useState(true);
  const [selectedTags, setSelectedTags] = useState({
    top: false,
    sweater: false,
    "t-shirt": false,
    pants: false,
    jacket: false,
    trousers: false,
    jeans: false,
    boots: false,
    cap: false,
    hat: false,
    jumpsuit: false,
    overalls: false,
    shirt: false,
    shorts: false,
    slippers: false,
    suit: false,
  });
  const [imageEncoded, setImageEncoded] = useState(null);

  useEffect(() => {
    async function func() {
      const newData = await getDashboardData();
      setDashboardData(newData);
      addTags(newData.garments.flatMap((garment) => garment.tags));
      setRefreshData(false);
    }
    func();
  }, [refreshData]);

  const addTags = (tags) => {
    const newTags = {};
    tags.forEach((tag) => {
      if (!(tag in selectedTags)) {
        newTags[tag] = false;
      }
    });
    setSelectedTags({ ...selectedTags, ...newTags });
  };

  const handleTagSelect = (tag) => {
    // TODO use a Set for this!
    if (selectedTags && tag in selectedTags) {
      setSelectedTags({ ...selectedTags, [tag]: !selectedTags[tag] });
    } else {
      setSelectedTags({ ...selectedTags, [tag]: true });
    }
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

  const rankByPrediction = (garment) => {
    if (selectedTags) {
      return Object.keys(selectedTags)
        .map(
          (tag) =>
            selectedTags[tag] &&
            garment.tags.includes(tag) +
              garment.name.toLowerCase().includes(tag)
        )
        .reduce((a, b) => a + b);
    } else {
      return 0;
    }
  };

  filteredGarments.sort((a, b) => rankByPrediction(b) - rankByPrediction(a));

  const handleEncodeFile = async (img) => {
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      async () => {
        // convert image file to base64 string
        setImageEncoded(reader.result);

        const response = await getInference(reader.result);
        // setInference(response);
        const newTags = {};
        response.predictions?.map((prediction) => {
          const tag = prediction.class;
          newTags[tag] = true;
        });
        setSelectedTags({ ...selectedTags, ...newTags });
      },
      false
    );

    reader.readAsDataURL(img);
  };

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
              alt="A picture of a beautiful human being in a STUNNING outfit."
              width={"250px"}
              src={imageEncoded}
            />
            {/* <br />  */}
            <button onClick={() => setImageEncoded(null)}>Remove</button>
          </div>
        ) : (
          <div className="center">
            <input
              type="file"
              name="myImage"
              onChange={(event) => {
                handleEncodeFile(event.target.files[0]);
              }}
            />
          </div>
        )}
        <div className="flow">
          {Object.keys(selectedTags).map((tag) => (
            <button
              className={selectedTags[tag] ? "active" : ""}
              key={tag}
              value={tag}
              onClick={(event) => handleTagSelect(event.target.value)}
            >
              {tag}
            </button>
          ))}
        </div>
        <GarmentSelector
          date={daySelected}
          onChange={setRefreshData}
          tags={Object.keys(selectedTags).filter((tag) => selectedTags[tag])}
        >
          {filteredGarments.map((garment) => ({
            value: garment,
            label:
              garment.name +
              "  " +
              Intl.NumberFormat("en-US", {
                currency: "USD",
                style: "currency",
              }).format(garment.cost_per_wear) +
              "/wear" +
              rankByPrediction(garment),
          }))}
        </GarmentSelector>
        <Link className="button" to={"selfie/"}>
          Or take a selfie
        </Link>
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
