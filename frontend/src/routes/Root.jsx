import React from "react";
import { Outlet, redirect, useLoaderData } from "react-router-dom";

import { API, getUser } from "../axiosApi.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { AuthProvider, useAuth } from "./Login.jsx";

export async function loader() {
  const response = await API.get("/users/")
    .then((response) => {
      return {user: response.data[0]}
    })
    .catch((error) => {
      if (error.response.status === 403) {
        return redirect("/login")
      }
      else {
        throw error;
      }
    })
  return response
}

export default function Root() {

  // const { user } = useAuth();

  // if (!user) {
  //   console.log('no user here!')
  // }

  return (
    <AuthProvider className="global-stack">
      <Header />
      <main className="field">
        <Outlet />
      </main>
    </AuthProvider>
  )
}
