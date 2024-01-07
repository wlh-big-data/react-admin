import React from "react";
import { Outlet } from "react-router-dom";
import "./UserLayout.less";

export default function AppContainer(): JSX.Element {
  return <Outlet />;
}
