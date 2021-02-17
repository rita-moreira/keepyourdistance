import React from 'react';
import Head from 'next/head';

import { Container, createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import LoginForm from '../components/auth/LoginForm';
import Logo from '../components/individual/Logo';
import SwitchMode from '../components/navbar/SwitchMode';
import { useStyles } from '../theme/theme';

const useStylesPage = makeStyles((theme: Theme) => createStyles({
  size: {
    width: '100%',
    height: '100vh',
  },

}));

const Login: React.FC = () => {
  const classes = useStyles();
  const classes2 = useStylesPage();
  return (
    <div>
      <Head>
        <title>Keep your distance</title>
      </Head>
      <main className={classes.backgroundColor}>
        <div
          className={classes2.size}
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

          <LoginForm />
        </div>
      </main>
    </div>
  );
};

export default Login;
