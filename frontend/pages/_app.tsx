import React, { useState } from 'react';
import { AppProps } from 'next/app';
import 'fontsource-roboto';
import '../public/fonts.css';
import { ThemeProvider } from '@material-ui/core';
import Head from 'next/head';
import { ThemeContext } from '../contexts/ThemeContext';
import { AuthContext } from '../contexts/AuthContext';
import { theme, darkTheme } from '../theme/theme';
import { getCookie } from '../actions/cookies';

function App({ Component, pageProps }: AppProps) {
  const themeCookie = getCookie('theme');
  const [themeMode, setThemeMode] = useState<string>(themeCookie);
  const authCookie = getCookie('user');
  const [auth, setAuth] = useState<{
    _id: string;
    username: string;
    email: string;
  }>(authCookie);
  return (
    <>
      <Head>
        <title>Keep your distance</title>
      </Head>
      <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <ThemeProvider theme={themeMode === 'light' ? theme : darkTheme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </AuthContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
