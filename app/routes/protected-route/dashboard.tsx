import type { Route } from "../../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "لوحة التحكم | إدارة الأكاديمية" },
    {
      name: "description",
      content: "لوحة التحكم الخاصة بك",
    },
  ];
}

export default function Dashboard() {
  return <div>dashboard</div>;
}
