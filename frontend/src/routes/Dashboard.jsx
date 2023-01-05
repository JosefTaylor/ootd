import React, { useEffect, useState } from "react";

import { getDashboardData } from "../axiosApi.jsx";

import { WardrobeGarment } from "../components/Wardrobe.jsx";
import FilterBar from "../components/FilterBar.jsx";
import DateSelector from "../components/DateSelector.jsx";
import { WearLine } from "../components/WornToday.jsx";
import Card from "../components/Card.jsx";
import DataTable from "../components/DataTable.jsx";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [daySelected, setDateSelected] = useState(new Date());
  const [filterText, setFilterText] = useState("");
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
                date={daySelected}
                onChange={() => {
                  setRefreshData(true);
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
          onChange={() => {
            setRefreshData(true);
          }}
        />
      </Card>
    </div>
  );
}
