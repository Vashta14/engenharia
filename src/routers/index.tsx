import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import SignUp from "../pages/SignUp";
import Users from "../pages/Users";
import Projects from "../pages/Projects";
import Project from "../pages/Project";

const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Login"));

export function Routers() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" index element={<Login />} />
          <Route path="/home" index element={<Home />} />
          <Route path="/sign-up" index element={<SignUp />} />
          <Route path="/users" index element={<Users />} />
          <Route path="/projects" index element={<Projects />} />
          <Route path="/project/:id" index element={<Project />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </RecoilRoot>
  );
}
