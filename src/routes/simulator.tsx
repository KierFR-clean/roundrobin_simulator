import { Route } from "@tanstack/react-router";
import { rootRoute } from "./root";
import Lbsimulator from "../pages/lbsimulator";

export const simulatorRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "simulator",
  component: Lbsimulator,
});
