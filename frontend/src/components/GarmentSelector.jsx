import React from "react";
import Select from "react-select";

export default function GarmentSelector(props) {
  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      defaultValue={""}
      isLoading={false}
      isClearable={false}
      isSearchable={true}
      name="color"
      options={props.children}
    />
  );
}
