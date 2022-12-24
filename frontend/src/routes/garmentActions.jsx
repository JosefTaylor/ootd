import { redirect } from "react-router-dom";
import { updateGarment, createGarment } from "../axiosApi.jsx";

export async function updateGarmentAction({ request, params }) {
    const formData = await request.formData();
    let newGarment = Object.fromEntries(formData);
    const date_fields = ["purchase_date", "deaq_date"]
    console.dir(newGarment)
    date_fields.forEach((field) => {
        if (newGarment[field]) {
            console.log(field, newGarment[field])
            newGarment = {
                ...newGarment,
                [field]: new Date(newGarment[field])
                    .toISOString()
                    .split('T')[0]
            }
        }
    })
    updateGarment(params.garmentId, newGarment);
    return redirect("/home")
}

export async function createGarmentAction({ request, params }) {
    const formData = await request.formData();
    let newGarment = Object.fromEntries(formData);
    const date_fields = ["purchase_date", "deaq_date"]
    console.dir(newGarment)
    date_fields.forEach((field) => {
        if (newGarment[field]) {
            console.log(field, newGarment[field])
            newGarment = {
                ...newGarment,
                [field]: new Date(newGarment[field])
                    .toISOString()
                    .split('T')[0]
            }
        }
    })
    createGarment(newGarment);
    return redirect("/home")
}