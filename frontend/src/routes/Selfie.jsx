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
  const [selectedImage, setSelectedImage] = useState(null);
  const [inference, setInference] = useState(null);

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

  // show only garments which are active today and which match the inferred tags
  const filteredGarments = dashboardData.garments.filter((garment) => {
    const aq_date = new Date(garment.purchase_date);
    const deaq_date = garment.deaq_date ? new Date(garment.deaq_date) : null;
    const inferenceTags = inference?.predictions?.flatmap(
      (prediction) => prediction.class
    );
    return (aq_date <= new Date()) &
      (!deaq_date || new Date() <= deaq_date) &
      inferenceTags
      ? inferenceTags
          .map((inferenceTag) => garment.tags.includes(inferenceTag))
          .reduce((a, b) => a || b)
      : true;
  });

  // Calculate the cost of the whole outfit
  const outfitCost = filteredWears.reduce((sum, wear) => sum + wear.cost, 0);

  return (
    <div className="wrapper stack pad-1 wd-max ht-full">
      <Card className="ht-150-min" title="Take a selfie">
        {selectedImage ? (
          <div className="center">
            <img
              alt="A picture of a beautiful human being in a STUNNING outfit."
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
            {/* <br />  */}
            <button onClick={() => setSelectedImage(null)}>Remove</button>
            <button
              onClick={async () => {
                const response = await getInference(selectedImage);
                setInference(response);
              }}
            >
              Submit
            </button>
          </div>
        ) : (
          <div className="center">
            <input
              type="file"
              name="myImage"
              onChange={(event) => {
                setSelectedImage(event.target.files[0]);
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
              "/wear",
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
