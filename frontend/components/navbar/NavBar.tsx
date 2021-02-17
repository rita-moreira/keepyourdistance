import React, { useContext, useEffect, useState } from 'react';

import { Container, Grid } from '@material-ui/core';

import Logo from '../individual/Logo';
import LogButton from './LogButton';
import SwitchMode from './SwitchMode';
import MenuSmall from './MenuSmall';

import { AuthContext } from '../../contexts/AuthContext';

interface StateAuthenticate {
  _id: string;
  username: string;
  email: string;
}

const initialValues = {
  _id: "",
  username: "",
  email: "",
}

const NavBar: React.FC = () => {
  const { auth } = useContext(AuthContext);
  const [authenticate, setAuthenticate] = useState<StateAuthenticate>(initialValues);
  useEffect(() => {
    setAuthenticate(auth);
  }, [auth]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={7}>
          <Logo />
        </Grid>
        <Grid item xs={1}>
          <SwitchMode />
        </Grid>
        <Grid item xs={1}>
          {authenticate ? <MenuSmall /> : null}
        </Grid>
        <Grid item xs={3}>
          <LogButton />
        </Grid>
      </Grid>
    </Container>
  );
};

export default NavBar;
