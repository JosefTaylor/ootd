import React from "react";

export default function DataTable(props) {
    return (
        <div className={[props.className, "stack data-table ht-full"].join(" ", )}>
            {props.children}
        </div>);
}