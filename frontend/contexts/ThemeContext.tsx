import React, { createContext } from "react";

interface ThemeContextType {
  themeMode: string;
  setThemeMode: React.Dispatch<React.SetStateAction<string>>;
}
export const ThemeContext = createContext<ThemeContextType>({
  themeMode: "light",
  setThemeMode: (themeMode: string) => themeMode,
});
