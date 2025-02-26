import React from "react";
import { NavBar } from "../components/NavBar";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <main className="min-h-screen font-poppins bg-white dark:bg-black dark:text-white flex flex-col gap-5 py-3 px-5">
      <NavBar />
      <Outlet />
    </main>
  );
};
