import React from "react";

import {
  createGarment,
  getDashboardData,
  ToPythonDate,
  updateGarment,
} from "../axiosApi.jsx";
import Card from "../components/Card.jsx";
import DataTable from "../components/DataTable.jsx";

export default function Wardrobe() {
  const [dashboardData, setDashboardData] = React.useState(null);
  const [filterText, setFilterText] = React.useState("");
  const [refreshData, setRefreshData] = React.useState(true);

  const fields = [
    { label: "Aquisition Date", field: "purchase_date" },
    { label: "Price", field: "purchase_price" },
    { label: "Cost/Wear", field: "cost_per_wear" },
    { label: "Wears", field: "num_wears" },
  ];

  React.useEffect(() => {
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

  const filteredGarments = dashboardData.garments.filter((garment) => {
    const name = garment.name.toLowerCase();
    return name.includes(filterText.toLowerCase());
  });

  return (
    <div className="wrapper stack pad-1 ht-full">
      <Card className="ht-150-min" title="Your Wardrobe">
        <input
          value={filterText}
          onChange={(event) => setFilterText(event.target.value)}
        />
        <DataTable>
          <div className="data-item">
            <div className="splitter">
              <div className="garment-name">Garment</div>
              {fields.map((field, index) => (
                <div key={index} className="cost-per-wear">
                  {field.label}
                </div>
              ))}
            </div>
          </div>
          {filteredGarments.map((garment) => (
            <div key={garment.id} className="data-item">
              <WardrobeGarment
                mode={"display"}
                isActive={garment.is_active}
                fields={fields}
                garment={garment}
                onChange={() => setRefreshData(true)}
              />
            </div>
          ))}
        </DataTable>
        <WardrobeGarment
          mode={"new"}
          garment={{
            name: { filterText },
            purchase_date: ToPythonDate(new Date()),
          }}
          onChange={() => setRefreshData(true)}
        />
      </Card>
    </div>
  );
}

export function WardrobeGarment(props) {
  // Props:
  // mode - string, see switch below for options.
  // garment - directly aligning with API call
  // onChange - call to refresh the wardrobe data in the parent
  // fields - array of strings; which fields to display

  const [mode, setMode] = React.useState(props.mode);

  switch (mode) {
    case "declutter":
      return (
        <DeclutterRow
          garment={props.garment}
          date={props.date}
          onCancel={() => {
            setMode(props.mode);
          }}
          onChange={() => {
            setMode(props.mode);
            props.onChange();
          }}
        />
      );
    case "edit":
      return (
        <EditRow
          garment={props.garment}
          onCancel={() => {
            setMode(props.mode);
          }}
          onDeclutter={() => {
            setMode("declutter");
          }}
          onChange={() => {
            setMode(props.mode);
            props.onChange();
          }}
        />
      );
    case "new":
      return (
        <button
          onClick={() => {
            setMode("edit");
          }}
        >
          New Garment
        </button>
      );
    default:
      return (
        <DisplayRow
          garment={props.garment}
          fields={props.fields}
          onEdit={() => {
            setMode("edit");
          }}
        />
      );
  }
}

function DisplayRow(props) {
  let displayGarment = { ...props.garment };
  if (props.garment.cost_per_wear) {
    displayGarment = {
      ...displayGarment,
      cost_per_wear: formatCost(props.garment.cost_per_wear) + "/wear",
    };
  }
  if (props.garment.purchase_price) {
    displayGarment = {
      ...displayGarment,
      purchase_price: formatCost(props.garment.purchase_price),
    };
  }
  if (props.garment.deaq_price) {
    displayGarment = {
      ...displayGarment,
      deaq_price: formatCost(props.garment.deaq_price),
    };
  }

  return (
    <button className="invisible" type="cancel" onClick={props.onEdit}>
      <div className="splitter">
        <div className="garment-name">{displayGarment.name}</div>
        {props.fields.map((field, index) => (
          <div key={index} className="cost-per-wear">
            {displayGarment[field.field]}
          </div>
        ))}
      </div>
    </button>
  );
}

function EditRow(props) {
  const [name, setName] = React.useState(props.garment.name);
  const [purchase_date, setPurchase_date] = React.useState(
    props.garment.purchase_date
  );
  const [purchase_price, setPurchase_price] = React.useState(
    props.garment.purchase_price
  );

  async function handleSubmit() {
    if (props.garment?.id) {
      await updateGarment(props.garment.id, {
        name,
        purchase_date,
        purchase_price,
      });
    } else {
      await createGarment({ name, purchase_date, purchase_price });
    }
    props.onChange();
  }

  return (
    <div className="flow">
      <label>
        garment name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </label>
      <label>
        purchase date:
        <input
          type="date"
          name="purchase_date"
          value={purchase_date}
          onChange={(event) => {
            setPurchase_date(event.target.value);
          }}
        />
      </label>
      <label>
        purchase price:
        <input
          type="number"
          name="purchase_price"
          value={purchase_price}
          onChange={(event) => {
            setPurchase_price(event.target.value);
          }}
        />
      </label>
      <button onClick={handleSubmit}>Save</button>
      <button onClick={props.onCancel}>Cancel</button>
      <button onClick={props.onDeclutter} className="warning">
        Declutter
      </button>
    </div>
  );
}

function DeclutterRow(props) {
  const [deaq_date, setDeaq_date] = React.useState(ToPythonDate(props.date));
  const [deaq_price, setDeaq_price] = React.useState(0);

  async function handleSubmit() {
    if (
      confirm(
        "Please confirm you are removing " +
          props.garment.name +
          " from your wardrobe"
      )
    ) {
      await updateGarment(props.garment.id, {
        deaq_date,
        deaq_price,
      });
      props.onChange();
    } else {
      props.onCancel();
    }
  }

  return (
    <div className="flow">
      <h3>Declutter {props.garment.name}?</h3>
      <label>
        De-acquisition date:
        <input
          type="date"
          name="deaq_date"
          value={deaq_date}
          onChange={(event) => setDeaq_date(event.target.value)}
        />
      </label>
      <label>
        Sale price:
        <input
          type="number"
          name="deaq_price"
          value={deaq_price}
          onChange={(event) => setDeaq_price(event.target.value)}
        />
      </label>
      <button onClick={props.onCancel}>Cancel</button>
      <button onClick={handleSubmit}>Declutter</button>
    </div>
  );
}

export function formatCost(cost) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(cost);
}
