import React, { useEffect, useMemo, useState } from "react";
import type { Academy } from "@/type/academy";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";
import api from "@/service/academy";

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
  const [activeAcademy, setActiveAcademyState] =
    useState<Academy | null>(null);

  const { data, error } = useQuery({
    queryKey: ["academies"],
    queryFn: api.getAll,
    staleTime: Infinity,
    select: (res) => res.data.data.items,
  });


  useEffect(() => {
    if (!data || data.length === 0) return;

    setAcademies(data);

    const savedId = Cookies.get("academyId");
    const found = data.find((a) => a.id === savedId);

    setActiveAcademyState(found || data[0]);
  }, [data]);


  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);


  const setActiveAcademy = (academy: Academy) => {
    setActiveAcademyState(academy);
    Cookies.set("academyId", academy.id, { expires: 7 });
  };

  const clear = () => {
    setActiveAcademyState(null);
    Cookies.remove("academyId");
  };


  const value = useMemo(
    () => ({
      academies,
      activeAcademy,
      setActiveAcademy,
      clear,
    }),
    [academies, activeAcademy],
  );

  return (
    <academyContext.Provider value={value}>
      {children}
    </academyContext.Provider>
  );
}