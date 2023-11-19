import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { Fragment, useState } from "react";

export default function Layout() {
  const [key, setKey] = useState<number>(0);
  return (
    <Fragment key={key}>
      <Header setKey={setKey} />
      <Outlet />
    </Fragment>
  );
}
