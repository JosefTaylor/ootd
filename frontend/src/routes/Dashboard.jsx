import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import {
  API,
  createGarment,
  createWear,
  deleteWear,
  getDashboardData,
  updateGarment,
} from "../axiosApi.jsx";

import { WardrobeGarment } from "../components/Wardrobe.jsx";
import FilterBar from "../components/FilterBar.jsx";
import DateSelector from "../components/DateSelector.jsx";
import { WearTable, WearLine } from "../components/WornToday.jsx";
import Card from "../components/Card.jsx";
import DataTable from "../components/DataTable.jsx";
import { RequireAuth, useAuth } from "./Login.jsx";

export async function loader() {
  
  console.log("in dashboard Loader, trying to get some data");
  const dashboardData = await getDashboardData();
  return { dashboardData };
}

export default function Dashboard() {
  console.log("in Dashboard, rendering.")
  const { dashboardData } = useLoaderData();
  const [daySelected, setDateSelected] = useState(new Date());
  const [filterText, setFilterText] = useState("");

  const filteredWears = dashboardData.garment_wears.filter((wear) => {
    const date = new Date(wear.scan_date).toDateString();
    return date === daySelected.toDateString();
  });

  const filteredGarments = dashboardData.garments.filter((garment) => {
    const aq_date = new Date(garment.purchase_date);
    const name = garment.name.toLowerCase();
    const deaq_date = garment.deaq_date ? new Date(garment.deaq_date) : null;
    return (
      (aq_date <= daySelected) &
      (!deaq_date || daySelected <= deaq_date) &
      name.includes(filterText.toLowerCase())
    );
  });

  return (
      <div className="wrapper stack pad-1 wd-max ht-full">
        <Card className="ht-one-third ht-150-min" title="">
          <DateSelector
            date={daySelected}
            onClick={(n) => (event) => {
              let newDay = new Date(daySelected);
              newDay.setDate(daySelected.getDate() + n);
              setDateSelected(newDay);
            }}
            onChange={(event) => {
              setDateSelected(new Date(event.target.value));
            }}
            name="Outfit on:  "
          />
          <DataTable>
            {filteredWears.map((wear) => (
              <div key={wear.id} className="data-item">
                <WearLine
                  wear={wear}
                  onDelete={(wear) => (event) => {
                    deleteWear(wear);
                  }}
                />
              </div>
            ))}
          </DataTable>
        </Card>
        <Card className="ht-two-thirds ht-225-min" title="Your Wardrobe">
          <FilterBar
            value={filterText}
            onChange={(event) => {
              setFilterText(event.target.value);
            }}
          />
          <DataTable>
            {filteredGarments.map((garment) => (
              <div key={garment.id} className="data-item">
                <WardrobeGarment
                  garment={garment}
                  mode="display"
                  onWear={(garment) => (event) => {
                    createWear(garment, daySelected);
                  }}
                  onSave={(newGarment) => {
                    updateGarment(garment, newGarment);
                  }}
                />
              </div>
            ))}
          </DataTable>
          <WardrobeGarment
            garment={{
              name: filterText,
              purchase_date: daySelected.toISOString().split("T")[0],
            }}
            mode={"new"}
            newName={filterText}
            onSave={(newGarment) => {
              createGarment(newGarment);
            }}
          />
        </Card>
      </div>
  );
}
