import React, { createContext } from "react";

interface AuthContextType {
  auth: { id: string; username: string; email: string; password: string };
  setAuth: React.Dispatch<
    React.SetStateAction<{ username: string; email: string; password: string }>
  >;
}
export const AuthContext = createContext<AuthContextType>({
  auth: { id: "", username: "", email: "", password: "" },
  setAuth: (auth: {}) => auth,
});
