import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Skeleton } from "./ui/skeleton";
import type { Action } from "./actionTable";
import ActionTable from "./actionTable";

interface BaseRow {
  id: string | number;
}

export interface Column<T extends BaseRow> {
  key: Extract<keyof T, string | number>;
  label: string;
  display: (data: any) => ReactNode;
}

export interface ICustomTable<T extends BaseRow> {
  columns: Column<T>[];
  rows: T[];
  isLoading: boolean;
  actions?: Action[];
}

export default function CustomTable<T extends BaseRow>({
  columns,
  rows,
  isLoading,
  actions,
}: ICustomTable<T>) {
  const { t } = useTranslation();

  return (
    <Table className="border border-zinc-400 dark:border-zinc-700">
      <TableHeader>
        <TableRow className="border-zinc-400 dark:border-zinc-700 h-12">
          {columns.map((col) => (
            <TableHead className="text-center" key={col.key}>
              {t(col.label)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={columns.length}>
              <Skeleton className="w-full rounded-md h-40" />
            </TableCell>
          </TableRow>
        ) : rows && rows.length > 0 ? (
          rows.map((row) => (
            <TableRow
              key={row.id}
              className="border-zinc-400 dark:border-zinc-700 h-12"
            >
              {columns.map((col) => (
                <TableCell className="text-center" key={`${row.id}-${col.key}`}>
                  {col.display(row[col.key])}
                </TableCell>
              ))}
              {actions && actions.length > 0 && (
                <TableCell className="text-center">
                  <ActionTable actions={actions} id={row["id"]} />
                </TableCell>
              )}
            </TableRow>
          ))
        ) : (
          <TableRow className="border-zinc-400 dark:border-zinc-700 h-12">
            <TableCell
              colSpan={columns.length}
              className="text-center col-span-5 capitalize"
            >
              {t("table.no data available")}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
