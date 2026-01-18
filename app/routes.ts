import { type RouteConfig,
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
      "routes/protected-route/dashboard/entity/entity.tsx",
    ),
    route(
      "dashboard/:entity/delete/:id",
      "routes/protected-route/dashboard/entity/delete.tsx",
    ),
    route(
      "dashboard/:entity/add",
      "routes/protected-route/dashboard/entity/add.tsx",
    ),
    route(
      "dashboard/:entity/update/:id",
      "routes/protected-route/dashboard/entity/update.tsx",
    ),
  ]),
] satisfies RouteConfig;
