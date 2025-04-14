import { Route } from "@tanstack/react-router";
import { rootRoute } from "./root";
import HomePage from "../pages/HomePage";

export const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
