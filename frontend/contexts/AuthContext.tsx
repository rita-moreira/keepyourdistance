import React, { createContext } from "react";

interface AuthContextType {
  auth: { _id: string; username: string; email: string };
  setAuth: React.Dispatch<
    React.SetStateAction<{ _id: string; username: string; email: string }>
  >;
}
export const AuthContext = createContext<AuthContextType>({
  auth: { _id: "", username: "", email: "" },
  setAuth: (auth: {}) => auth,
});
