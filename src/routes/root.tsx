import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Layout } from "../App";

export const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});
