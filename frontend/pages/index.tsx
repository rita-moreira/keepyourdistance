import Head from "next/head";
import React from "react";

// components
import NavBar from "../components/navbar/NavBar";
import MainContent from "../components/MainContent";

// custom style
import { useStyles } from "../theme/theme";

export default function Home() {
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>Keep your distance</title>
      </Head>

      <main className={classes.backgroundColor}>
        <div style={{ width: "100%", height: "100vh" }}>
          <NavBar />
          <MainContent />
        </div>
      </main>
    </div>
  );
}
