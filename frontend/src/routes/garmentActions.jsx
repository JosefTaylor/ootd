import { redirect } from "react-router-dom";
import { updateGarment, createGarment, createWear } from "../axiosApi.jsx";

export async function updateGarmentAction({ request, params }) {
  const formData = await request.formData();
  let newGarment = Object.fromEntries(formData);
  const date_fields = ["purchase_date", "deaq_date"];
  newGarment;
  newGarment = fixDates(newGarment, date_fields);
  await updateGarment(params.garmentId, newGarment);
  return redirect("/home");
}

export async function createGarmentAction({ request }) {
  const formData = await request.formData();
  let newGarment = Object.fromEntries(formData);
  const date_fields = ["purchase_date", "deaq_date"];
  newGarment = fixDates(newGarment, date_fields);
  await createGarment(newGarment);
  return redirect("/home");
}

function fixDates(object, date_fields) {
  date_fields.forEach((field) => {
    if (object[field]) {
      object = {
        ...object,
        [field]: new Date(object[field]).toISOString().split("T")[0],
      };
    }
  });
  return object;
}
