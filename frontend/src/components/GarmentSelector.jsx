/* eslint-disable react/prop-types */
import React from "react";
import CreatableSelect from "react-select/creatable";
import { createGarment, createWear, ToClosetDate } from "../ootdApi.jsx";

export default function GarmentSelector(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [value, setValue] = React.useState(null);

  async function handleCreate(name) {
    // TODO pop up a thing to tag the new garment
    setIsLoading(true);
    const userTags = prompt(
      `Please tag your ${name}!
      multiple tags separated by commas`,
      props.tags?.join(", ")
    );
    if (!userTags) {
      setIsLoading(false);
      return;
    }
    const tags = userTags ? userTags.split(",").map((tag) => tag.trim()) : [];
    const newGarment = await createGarment({
      name: name,
      purchase_date: ToClosetDate(props.date),
      tags: tags,
    });
    console.log("in garmentSelector:handleCreate, newGarment:", newGarment);
    await createWear(newGarment, ToClosetDate(props.date));
    await props.onChange();
    setValue(null);
    setIsLoading(false);
  }

  return (
    <CreatableSelect
      className="basic-single"
      classNamePrefix="select"
      defaultValue={""}
      placeholder={
        props.children.length > 0
          ? "Select..."
          : "Start typing to add a new garment"
      }
      isLoading={isLoading}
      isClearable={true}
      isSearchable={true}
      name="garment"
      options={props.children}
      value={value}
      onCreateOption={handleCreate}
      onChange={async (newValue) => {
        const garment = newValue?.value;
        await createWear(garment, ToClosetDate(props.date));
        await props.onChange();
        setValue(null);
      }}
    />
  );
}
