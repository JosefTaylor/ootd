import React, { useState } from "react";
import { Form } from "react-router-dom";

export function WardrobeGarment(props) {

    const [mode, setMode] = useState(props.mode)

    switch (mode) {
        case "declutter":
            return <DeclutterRow
                garment={props.garment}
                onSave={props.onSave}
                onExit={(event) => { setMode(props.mode) }}
                onCancel={(event) => { setMode("display") }}
            />;
        case "edit":
            return <EditRow
                garment={props.garment}
                onSave={props.onSave}
                onExit={(event) => { setMode(props.mode) }}
                onDeclutter={(event) => setMode("declutter")}
            />;
        case "new":
            return <button
                onClick={(event) => { setMode("edit") }}>
                New Garment
            </button>;
        default:
            return <DisplayRow
                garment={props.garment}
                onEdit={(event) => { setMode("edit") }}
                onWear={props.onWear}
            />;
    }
}

function DisplayRow(props) {
    return (
        <div className="splitter">
            <div className="garment-name">
                {props.garment.name}
            </div>
            <div className="cost-per-wear">
                {new Intl.NumberFormat("en-US", {
                    currency: "USD",
                    style: "currency",
                }).format(props.garment.cost_per_wear)}/wear
            </div>
            <div>
                <Form method="post" action={"/garmentwears"}>
                    <button type="submit">wear</button>
                    <button
                        onClick={props.onEdit}
                    >edit</button>
                </Form>
            </div>
        </div>
    );
}

function EditRow(props) {

    return (

        <Form
            method={props.garment.id ? "patch" : "post"}
            action={props.garment.id ? "/garments/" + props.garment.id + "/update" : "/garments/create"}
        >
            <label>
                garment name:
                <input
                    type="text"
                    name="name"
                    defaultValue={props.garment.name}
                />
            </label>
            <label>
                purchase date:
                <input
                    type="date"
                    name="purchase_date"
                    defaultValue={props.garment.purchase_date}
                />
            </label>
            <label>
                purchase price:
                <input
                    type="number"
                    name="purchase_price"
                    defaultValue={props.garment.purchase_price}
                />
            </label>
            <button type="submit">Save</button>
            <button type="cancel" onClick={props.onExit}>Cancel</button>
            <button type="cancel" onClick={props.onDeclutter}>Declutter</button>
        </Form>
    );
}

function DeclutterRow(props) {

    return (
        <Form method="patch"
            action={"/garments/" + props.garment.id + "/update"}
            onSubmit={(event) => {
                if (!confirm("Please confirm you are removing this garment from your wardrobe.")) {
                    event.preventDefault();
                }
            }}>
            <h3>Declutter {props.garment.name}?</h3>
            <label>
                De-acquisition date
                <input
                    type="date"
                    name="deaq_date"
                    defaultValue={props.garment.deaq_date}
                />
            </label>
            <label>
                Sale price
                <input
                    type="number"
                    name="deaq_price"
                    defaultValue={props.garment.deaq_price}
                />
            </label>
            <button type="cancel" onClick={props.onExit}>Cancel</button>
            <button type="submit">Declutter</button>
        </Form>
    );
}