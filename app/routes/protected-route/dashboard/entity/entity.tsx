import { Link, useNavigate, useParams } from "react-router";
import { config, isEntityKey } from "./config/index";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { academyContext } from "@/context/academy.context";
import CustomTable from "@/components/custom-table";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import { PaginationDemo } from "@/components/pagination-demo";

export default function Entity() {
  const { entity } = useParams<{ entity: string }>();
  const navigate = useNavigate();
  const { activeAcademy } = useContext(academyContext);
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 800);
    return () => clearTimeout(handler);
  }, [search]);

  if (!entity || !isEntityKey(entity)) {
    navigate("/not-found", { replace: true });
    return null;
  }

  const entityConfig = config[entity];

  const queryKey: (string | number)[] = [entity];
  if (entity !== "academies" && activeAcademy?.id) {
    queryKey.push(activeAcademy.id);
  }

  queryKey.push(page);
  queryKey.push(debouncedSearch);
  queryKey.push(limit);

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () =>
      entityConfig.api.search({ limit, page, search: debouncedSearch }),
    staleTime: Infinity,
    select: (res) => res.data.data,
  });

  if (error) {
    toast.error(error.message);
    return null;
  }

  const rows = data?.items || [];
  const total = data?.count || 0;

  entityConfig.table.rows = rows;

  return (
    <section className="container mx-auto py-8 px-4 flex flex-col gap-6">
      <header className="bg-sidebar p-6 w-full rounded-xl shadow-sm border">
        <h1 className="text-xl font-semibold tracking-tight">
          {`${t("administration")} ${t(`entity.${entity}`)}`}
        </h1>
      </header>

      <main className="bg-card border p-6 w-full rounded-xl shadow-sm flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center flex-1 gap-3 max-w-md">
            <Input
              placeholder={`${t("action.search")}...`}
              className="bg-muted/50 focus-visible:ring-primary"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              disabled={rows.length === 0 && debouncedSearch === ""}
            />
          </div>

          <Button asChild>
            <Link
              to={`/dashboard/${entity}/add`}
              className="flex items-center gap-0.5 text-lg capitalize"
            >
              <span>+</span>
              <span>{t("action.add")}</span>
              <span>
                {t(`${entityConfig.table.entity}.${entityConfig.table.entity}`)}
              </span>
            </Link>
          </Button>
        </div>

        <CustomTable {...entityConfig.table} isLoading={isLoading} />

        <Separator />
        <div className="flex items-center justify-between">
          <PaginationDemo
            limit={limit}
            page={page}
            setPage={setPage}
            total={total}
          />
        </div>
      </main>
    </section>
  );
}
