import React, { createContext } from "react";

interface AuthContextType {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AuthContext = createContext<AuthContextType>({
  auth: false,
  setAuth: (auth: boolean) => auth,
});
