import React from "react";

export default function Card(props) {
  return (
    <div className={[props.className, "card stack"].join(" ")}>
      <div>
        <h2>{props.title}</h2>
      </div>
      {props.children}
    </div>
  );
}
