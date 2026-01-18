import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";
import api from "@/service/academy.api";
import type { Academy } from "@/type/entity";

interface AcademyContextType {
  academies: Academy[];
  activeAcademy: Academy | null;
  setActiveAcademy: (academy: Academy) => void;
  clear: () => void;
}

const initialContext: AcademyContextType = {
  academies: [],
  activeAcademy: null,
  setActiveAcademy: () => {},
  clear: () => {},
};

export const academyContext =
  React.createContext<AcademyContextType>(initialContext);

export default function AcademyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [academies, setAcademies] = useState<Academy[]>([]);
  const [activeAcademy, setActiveAcademy] = useState<Academy | null>(null);

  const { data, error } = useQuery({
    queryKey: ["academies"],
    queryFn: api.getAll,
    staleTime: Infinity,
    select: (res) => res.data.data.items,
  });

  useEffect(() => {
    if (!data || data.length === 0) {
      setActiveAcademy(null);
      Cookies.remove("academyId");
      return;
    }
    setAcademies(data);
    const savedId = Cookies.get("academyId");
    const found = data.find((a) => a.id === savedId);
    setActiveAcademy(found || data[0]);
  }, [data]);

  useEffect(() => {
    if (!activeAcademy) return;
    Cookies.set("academyId", activeAcademy.id, { expires: 7 });
  }, [activeAcademy]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const clear = () => {
    setActiveAcademy(null);
    Cookies.remove("academyId");
  };

  return (
    <academyContext.Provider
      value={{ setActiveAcademy, academies, clear, activeAcademy }}
    >
      {children}
    </academyContext.Provider>
  );
}
