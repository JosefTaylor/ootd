import React from "react";

export default function DataTable(props) {
  return (
    <div className="scroll">
      <table id="data-table" className={props.className}>
        {props.header ? (
          <thead>
            <tr>
              {props.header.map((field, index) => (
                <th key={index}>{field}</th>
              ))}
            </tr>
          </thead>
        ) : (
          ""
        )}
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
}
