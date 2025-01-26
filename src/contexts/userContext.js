import { getUserData } from "@/api/user-api";
import { createContext, useEffect, useState, useContext } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [token, setToken] = useState();
  useEffect(() => {
    setToken(localStorage.getItem("token-user"));
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
