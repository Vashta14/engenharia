import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ItemsTable } from "../pages/ItemsTable";

const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Login"));

export function Routers() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" index element={<Login />} />
          <Route path="/" index element={<Home />} />
          <Route path="/items" index element={<ItemsTable />} />
        </Routes>
      </Suspense>
    </RecoilRoot>
  );
}
