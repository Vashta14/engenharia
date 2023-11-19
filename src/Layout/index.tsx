import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { Fragment, useState } from "react";
import { AuthTokens } from "../utils/authTokens";
import { CurrentUser } from "../utils/userUtils";

export default function Layout() {
  const [key, setKey] = useState<number>(0);

  if (!CurrentUser.get() || !AuthTokens.tokensExist()) {
    CurrentUser.clear();
    AuthTokens.cleanTokens();
    window.location.replace("/login");
  }

  return (
    <Fragment key={key}>
      <Header setKey={setKey} />
      <Outlet />
    </Fragment>
  );
}
