import React from "react";
import Head from "next/head";

// components
import RegisterForm from "../components/auth/RegisterForm";
import Logo from "../components/individual/Logo";
import SwitchMode from "../components/navbar/SwitchMode";

// custom style
import { useStyles } from "../theme/theme";
import { Container, Grid } from "@material-ui/core";

const Login: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>Keep your distance</title>
      </Head>
      <main className={classes.backgroundColor}>
        <div
          style={{
            width: "100%",
            height: "100vh",
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={3} justify="center" alignItems="center">
              <Grid item xs={7}>
                <Logo />
              </Grid>
              <Grid item xs={5}>
                <SwitchMode />
              </Grid>
            </Grid>
          </Container>

          <RegisterForm />
        </div>
      </main>
    </div>
  );
};

export default Login;
