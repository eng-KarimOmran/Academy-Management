import React, { useEffect } from "react";
import type { User } from "~/type/user";
import type { Response } from "@/type/type";
import axios from "axios";

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  isLogin: boolean | null;
  setIsLogin: (isLogin: boolean) => void;
  clear: () => void;
}

const initialValuesUser: User = {
  id: "",
  name: "",
  userName: "",
  role: "",
};

const initialValuesContext: UserContextType = {
  user: initialValuesUser,
  isLogin: null,
  setIsLogin: () => {},
  setUser: () => {},
  clear: () => {},
};

export const userContext =
  React.createContext<UserContextType>(initialValuesContext);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = React.useState<User>(initialValuesUser);
  const [isLogin, setIsLogin] = React.useState<boolean | null>(null);

  const clear = () => {
    setIsLogin(null);
    setUser(initialValuesUser);
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/auth/is-login",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            withCredentials: true,
          }
        );
        const data = res.data as Response<User>;
        setUser(data.data);
        setIsLogin(true);
      } catch (err) {
        clear();
      }
    };
    checkLogin();
  }, []);

  return (
    <userContext.Provider value={{ user, setUser, isLogin, setIsLogin, clear }}>
      {children}
    </userContext.Provider>
  );
}
