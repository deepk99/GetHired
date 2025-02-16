import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container w-11/12 m-auto">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10 ">
        Project by Deepak Talele..🚀
      </div>
    </div>
  );
}

export default AppLayout;
