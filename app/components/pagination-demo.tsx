import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import getPaginationRange from "~/lib/getPaginationRange";

export function PaginationDemo({
  total,
  page,
  limit,
  setPage,
}: {
  total: number;
  page: number;
  limit: number;
  setPage: (page: number) => void;
}) {
  const { t } = useTranslation();
  const totalPage = Math.ceil(total / limit);
  const pages = getPaginationRange(page, totalPage);
  return pages.length === 0 ? null : (
    <Pagination>
      <PaginationContent className="me-0 md:me-auto overflow-x-auto">
        <PaginationItem className="hidden md:block">
          <Button
            disabled={page === totalPage}
            variant="ghost"
            onClick={() => setPage(page + 1)}
          >
            {t("action.next")}
          </Button>
        </PaginationItem>

        <div className="flex items-center gap-1">
          {pages.map((p, i) =>
            p === "..." ? (
              <PaginationItem key={`...${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <Button
                  variant={p === page ? "default" : "ghost"}
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              </PaginationItem>
            ),
          )}
        </div>

        <PaginationItem className="hidden md:block">
          <Button
            disabled={page === 1}
            variant="ghost"
            onClick={() => setPage(page - 1)}
          >
            {t("action.previous")}
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}