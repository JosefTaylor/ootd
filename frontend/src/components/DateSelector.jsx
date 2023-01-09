import React from "react";

export default function DateSelector(props) {
  return (
    <div className="splitter">
      <div>
        <button onClick={props.onClick(-7)}>{"<<"}</button>
        <button onClick={props.onClick(-1)}>{"<"}</button>
      </div>
      <div className="splitter">
        <label htmlFor="date">
          <p>{props.name}</p>
        </label>
        <input
          type="date"
          value={props.date.toISOString().split("T")[0]}
          onChange={props.onChange}
        />
      </div>
      <div>
        <button onClick={props.onClick(1)}>{">"}</button>
        <button onClick={props.onClick(7)}>{">>"}</button>
      </div>
    </div>
  );
}
