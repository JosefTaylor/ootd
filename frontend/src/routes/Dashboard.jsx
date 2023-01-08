import React, { useEffect, useState } from "react";

import { getDashboardData } from "../axiosApi.jsx";
import DateSelector from "../components/DateSelector.jsx";
import { WearLine } from "../components/WornToday.jsx";
import Card from "../components/Card.jsx";
import DataTable from "../components/DataTable.jsx";
import GarmentSelector from "../components/GarmentSelector.jsx";
import { formatCost } from "./Wardrobe.jsx";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [daySelected, setDateSelected] = useState(new Date());
  const [refreshData, setRefreshData] = useState(true);

  useEffect(() => {
    async function func() {
      console.log("Refreshing dashboard");
      const newData = await getDashboardData();
      setDashboardData(newData);
      setRefreshData(false);
    }
    func();
  }, [refreshData]);

  if (!dashboardData) {
    return <p>Loading...</p>;
  }

  const filteredWears = dashboardData.garment_wears.filter((wear) => {
    const date = new Date(wear.scan_date).toDateString();
    return date === daySelected.toDateString();
  });

  const filteredGarments = dashboardData.garments.filter((garment) => {
    const aq_date = new Date(garment.purchase_date);
    const deaq_date = garment.deaq_date ? new Date(garment.deaq_date) : null;
    return (aq_date <= daySelected) & (!deaq_date || daySelected <= deaq_date);
  });

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
        <GarmentSelector date={daySelected} onChange={setRefreshData}>
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
