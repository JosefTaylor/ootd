/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

import { getDashboardData, deleteWear } from "../ootdApi.jsx";
import { getInference } from "../roboflowApi.jsx";
import Card from "../components/Card.jsx";
import DataTable from "../components/DataTable.jsx";
import GarmentSelector from "../components/GarmentSelector.jsx";
import { formatCost } from "./Wardrobe.jsx";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [refreshData, setRefreshData] = useState(true);
  const [inference, setInference] = useState(null);
  const [imageEncoded, setImageEncoded] = useState(null);

  useEffect(() => {
    async function func() {
      const newData = await getDashboardData();
      setDashboardData(newData);
      setRefreshData(false);
    }
    func();
  }, [refreshData]);

  if (!dashboardData) {
    return <p>Loading...</p>;
  }

  // show only those wears which occur today
  const filteredWears = dashboardData.garment_wears.filter((wear) => {
    const date = new Date(wear.scan_date);
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (date > yesterday) & (date <= new Date());
  });

  const inferenceTags = inference?.predictions?.flatMap(
    (prediction) => prediction.class
  );
  console.log(inferenceTags, Boolean(inferenceTags));

  // show only garments which are active today and which match the inferred tags
  let filteredGarments = dashboardData.garments.filter((garment) => {
    const aq_date = new Date(garment.purchase_date);
    const deaq_date = garment.deaq_date ? new Date(garment.deaq_date) : null;

    return aq_date <= new Date() && (!deaq_date || new Date() <= deaq_date);
  });

  const rankByPrediction = (garment) => {
    if (inferenceTags) {
      return inferenceTags
        .map(
          (tag) =>
            garment.tags.includes(tag) +
            garment.name.toLowerCase().includes(tag.toLowerCase())
        )
        .reduce((a, b) => a + b);
    } else {
      return 0;
    }
  };

  filteredGarments.sort((a, b) => rankByPrediction(b) - rankByPrediction(a));

  console.log("filtered and sorted:", filteredGarments);

  const handleEncodeFile = async (img) => {
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      async () => {
        // convert image file to base64 string
        setImageEncoded(reader.result);

        const response = await getInference(reader.result);
        setInference(response);
      },
      false
    );

    reader.readAsDataURL(img);
  };

  // Calculate the cost of the whole outfit
  const outfitCost = filteredWears.reduce((sum, wear) => sum + wear.cost, 0);

  return (
    <div className="wrapper stack pad-1 wd-max ht-full">
      <Card className="ht-150-min" title="Take a selfie">
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
        <GarmentSelector date={new Date()} onChange={setRefreshData}>
          {filteredGarments.map((garment) => ({
            value: garment,
            label:
              garment.name +
              "  " +
              Intl.NumberFormat("en-US", {
                currency: "USD",
                style: "currency",
              }).format(garment.cost_per_wear) +
              "/wear " +
              rankByPrediction(garment),
          }))}
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
