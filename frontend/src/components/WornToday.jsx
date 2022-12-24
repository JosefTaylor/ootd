import React from "react";

function PrettyPrintGarmentWear(wear) {
    const wear_date = new Date(wear.scan_date).toDateString();
    if (wear.wearer_name === wear.owner_name) {
        return `You wore ${wear.garment_name} on ${wear_date}`;
    } else {
        return `You wore ${wear.owner_name}'s ${wear.garment_name} on ${wear_date}`;
    }
}

export function WearLine(props) {
    return (
        <div className="splitter">
            <div>
                {PrettyPrintGarmentWear(props.wear)}
            </div>
            <div>
                <button onClick={props.onDelete}>
                    Remove
                </button>
            </div>
        </div>
    )
}
