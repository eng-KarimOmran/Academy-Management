import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/auth/layout.tsx", [index("routes/auth/login.tsx")]),
  layout("routes/protected-route/layout.tsx", [
    route("logout", "routes/protected-route/logout.tsx"),
    route("settings", "routes/protected-route/settings.tsx"),
    route("dashboard", "routes/protected-route/dashboard/dashboard.tsx"),
    route(
      "dashboard/:entity",
      "routes/protected-route/dashboard/entity/entity.tsx"
    ),
  ]),
] satisfies RouteConfig;
