import React from "react";
import CreatableSelect from "react-select/creatable";
import { createGarment, createWear, ToPythonDate } from "../axiosApi.jsx";

export default function GarmentSelector(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [value, setValue] = React.useState(null);

  async function handleCreate(name) {
    setIsLoading(true);
    const newGarment = await createGarment({
      name: name,
      purchase_date: props.date.toISOString().split("T")[0],
    });
    console.log("in garmentSelector:handleCreate, newGarment:", newGarment);
    await createWear(newGarment, ToPythonDate(props.date));
    await props.onChange();
    setValue(null);
    setIsLoading(false);
  }

  return (
    <CreatableSelect
      className="basic-single"
      classNamePrefix="select"
      defaultValue={""}
      isLoading={isLoading}
      isClearable={true}
      isSearchable={true}
      name="garment"
      options={props.children}
      value={value}
      onCreateOption={handleCreate}
      onChange={async (newValue) => {
        const garment = newValue?.value;
        await createWear(garment, ToPythonDate(props.date));
        await props.onChange();
        setValue(null);
      }}
    />
  );
}
