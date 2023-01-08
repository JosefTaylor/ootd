import React from "react";

import { createWear, updateGarment } from "../axiosApi.jsx";

export function WardrobeGarment(props) {
  // Props:
  // mode - string, see switch below for options.
  // garment - directly aligning with API call
  // onChange - call to refresh the wardrobe data in the parent

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
          date={props.date}
          onChange={props.onChange}
          onEdit={() => {
            setMode("edit");
          }}
        />
      );
  }
}

function DisplayRow(props) {
  return (
    <div className="splitter">
      <div className="garment-name">{props.garment.name}</div>
      <div className="cost-per-wear">
        {new Intl.NumberFormat("en-US", {
          currency: "USD",
          style: "currency",
        }).format(props.garment.cost_per_wear)}
        /wear
      </div>
      <div>
        <button
          type="submit"
          onClick={() => {
            async function func() {
              await createWear(props.garment, props.date);
              props.onChange();
            }
            func();
          }}
        >
          wear
        </button>
        <button type="cancel" onClick={props.onEdit}>
          edit
        </button>
      </div>
    </div>
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
    await updateGarment(props.garment.id, {
      name,
      purchase_date,
      purchase_price,
    });
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
      <button onClick={props.onDeclutter}>Declutter</button>
    </div>
  );
}

function DeclutterRow(props) {
  const [deaq_date, setDeaq_date] = React.useState(
    props.date.toISOString().split("T")[0]
  );
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
