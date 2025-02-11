import { getUserData } from "@/api/user-api";
import { createContext, useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [token, setToken] = useState();
  useEffect(() => {
    setToken(Cookies.get("token-user"));
  }, []);
  const user = getUserData(token);

  return (
    <UserContext.Provider value={user.data}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
