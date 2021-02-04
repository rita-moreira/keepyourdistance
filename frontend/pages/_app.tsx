import React, { useState } from "react";
// https://nextjs.org/learn/excel/typescript/nextjs-types --> custom App --> convert to .tsx
import { AppProps } from "next/app";
// import font roboto
import "fontsource-roboto";
// import gotham font
import "../public/fonts.css";

// import context
import { ThemeContext } from "../contexts/ThemeContext";
import { AuthContext } from "../contexts/AuthContext";

// material ui
import { ThemeProvider } from "@material-ui/core";
// custom themes
import { theme, darkTheme } from "../theme/theme";

// actions
import { getCookie } from "../actions/cookies";

function App({ Component, pageProps }: AppProps) {
  const themeCookie = getCookie("theme");
  const [themeMode, setThemeMode] = useState<string>(themeCookie);
  const authCookie = getCookie("user");
  const [auth, setAuth] = useState<{
    id: string;
    username: string;
    email: string;
    password: string;
  }>(authCookie);
  return (
    <div>
      <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <ThemeProvider theme={themeMode === "light" ? theme : darkTheme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </AuthContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
