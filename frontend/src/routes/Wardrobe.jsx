/* eslint-disable react/prop-types */
import React from "react";

import {
  createGarment,
  getDashboardData,
  ToClosetDate,
  updateGarment,
} from "../ootdApi.jsx";
import Card from "../components/Card.jsx";
import DataTable from "../components/DataTable.jsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Wardrobe() {
  const [dashboardData, setDashboardData] = React.useState(null);
  const [filterText, setFilterText] = React.useState("");
  const [refreshData, setRefreshData] = React.useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const fields = [
    { label: "Aquisition Date", field: "purchase_date" },
    { label: "Price", field: "purchase_price" },
    { label: "Cost/Wear", field: "cost_per_wear" },
    { label: "Wears", field: "num_wears" },
    { label: "Tags", field: "tags" },
  ];

  React.useEffect(() => {
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

  const filteredGarments = dashboardData.garments.filter((garment) => {
    const matchText = [garment.name, ...garment.tags].join(" ").toLowerCase();
    const searchTexts = filterText.toLowerCase().split(" ");
    return searchTexts
      .map((searchText) => matchText.includes(searchText))
      .reduce((a, b) => a & b);
  });

  const toTags = (text) => {
    const allTags = new Set(
      filteredGarments.flatMap((garment) => garment.tags)
    );
    const textTags = text.split(new RegExp("[ ,;]+", "i"));
    return textTags.filter((tag) => allTags.has(tag));
  };

  return (
    <Card className="ht-150-min" title="Your Wardrobe">
      <input
        value={filterText}
        onChange={(event) => setFilterText(event.target.value)}
      />
      <DataTable>
        <div className="data-item">
          <button className="invisible">
            <div className="splitter">
              <div className="garment-name">Garment</div>
              {fields.map((field, index) => (
                <div key={index} className="cost-per-wear">
                  {field.label}
                </div>
              ))}
            </div>
          </button>
        </div>
        {filteredGarments.map((garment) => (
          <div key={garment.id} className="data-item">
            {garment.id === parseInt(params.garmentId) ? (
              location.state === "declutter" ? (
                <DeclutterRow
                  garment={garment}
                  onCancel={() => {
                    navigate("/wardrobe");
                  }}
                  onDeclutter={() => {
                    navigate("/wardrobe");
                    setRefreshData(true);
                  }}
                />
              ) : (
                <EditRow
                  garment={garment}
                  onSave={() => {
                    navigate("/wardrobe");
                    setRefreshData(true);
                  }}
                  onCancel={() => {
                    navigate("/wardrobe");
                  }}
                  onDeclutter={() => {
                    navigate("/wardrobe/" + garment.id.toString(), {
                      state: "declutter",
                    });
                  }}
                />
              )
            ) : (
              <DisplayRow
                garment={garment}
                fields={fields}
                onEdit={() => {
                  navigate("/wardrobe/" + garment.id.toString());
                }}
              />
            )}
          </div>
        ))}
      </DataTable>
      {location.state === "new" ? (
        <EditRow
          garment={{
            name: filterText,
            purchase_date: ToClosetDate(new Date()),
            tags: toTags(filterText),
          }}
          onSave={() => {
            navigate("/wardrobe");
            setRefreshData(true);
          }}
          onCancel={() => {
            navigate("/wardrobe");
          }}
        />
      ) : (
        <button onClick={() => navigate("/wardrobe", { state: "new" })}>
          {filterText ? `create "${filterText}"` : "new"}
        </button>
      )}
    </Card>
  );
}

function DisplayRow(props) {
  let displayGarment = { ...props.garment };
  if (props.garment.cost_per_wear) {
    displayGarment = {
      ...displayGarment,
      cost_per_wear: formatCost(props.garment.cost_per_wear) + "/wear",
    };
  }
  if (props.garment.tags) {
    displayGarment = {
      ...displayGarment,
      tags: props.garment.tags.join(", "),
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
      ? props.garment.purchase_date
      : ToClosetDate(new Date())
  );
  const [purchase_price, setPurchase_price] = React.useState(
    props.garment.purchase_price ? props.garment.purchase_price : 0
  );
  const [tags, setTags] = React.useState(
    props.garment.tags ? props.garment.tags.join(", ") : ""
  );

  async function handleSubmit() {
    if (props.garment?.id) {
      await updateGarment(props.garment.id, {
        name,
        purchase_date,
        purchase_price,
        tags: tags.split(",").map((tagString) => tagString.trim()),
      });
    } else {
      await createGarment({ name, purchase_date, purchase_price, tags });
    }
    props.onSave();
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
      <label>
        tags:
        <input
          type="text"
          name="tags"
          value={tags}
          onChange={(event) => {
            setTags(event.target.value);
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
  const [deaq_date, setDeaq_date] = React.useState(ToClosetDate(new Date()));
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
      props.onDeclutter();
    } else {
      props.onCancel();
    }
  }

  return (
    <div className="flow">
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
      <button onClick={handleSubmit} className="warning">
        Declutter
      </button>
    </div>
  );
}

export function formatCost(cost) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(cost);
}
