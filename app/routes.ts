import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/auth/layout.tsx", [index("routes/auth/login.tsx")]),
  layout("routes/protected-route/layout.tsx", [
    route("dashboard", "routes/protected-route/dashboard.tsx"),
  ]),
] satisfies RouteConfig;
