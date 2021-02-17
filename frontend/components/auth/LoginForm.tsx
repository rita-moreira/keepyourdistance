import React, { useState, useContext, useCallback } from 'react';

import {
  Container, Grid, Link, Typography, Button, makeStyles, createStyles,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useRouter } from 'next/router';
import { useStyles } from '../../theme/theme';
import { StateLoginFormValues } from '../../interface/index';
import TextFieldInput from './TextField';
import { signIn } from '../../actions/auth';
import { authenticate, isAuth } from '../../actions/cookies';
import { AuthContext } from '../../contexts/AuthContext';


const useStylesPage = makeStyles((theme) => createStyles({
  root: {
    border: '2px solid',
    padding: '50px',
    borderRadius: '20px',
    marginTop: '5%',
  },
  loginText: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  center: {
    textAlign: "center"
  }

}));


const initialValues = {
  email: '',
  password: '',
  error: '',
  message: '',
};
const LoginForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<StateLoginFormValues>(initialValues);
  const { setAuth } = useContext(AuthContext);
  const classes = useStyles();
  const classes2 = useStylesPage();
  const {
    email, password, error, message,
  } = formData;

  const handleShowMessage = useCallback(() => {
    if (error) {
      return (
        <Alert variant="filled" severity="error" >
          {error}
        </Alert >)
    }
    else if (message && !error) {
      return (
        <Alert variant="filled" severity="success" >
          {message}
        </Alert >)
    }
    else {
      return null;
    }

  }, [error, message])

  // handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // handleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({ ...formData, error: '' });
    const user = { email, password };
    const data = await signIn(user);
    if (data.error) {
      setFormData({ ...formData, error: data.error });
    } else {
      authenticate(data, () => {
        if (isAuth()) {
          setAuth(isAuth());
          router.push(`/profile/${isAuth().username}`);
        }
      });
    }
  };

  return (
    <div className={classes.backgroundColor}>
      <Container
        maxWidth="sm"
        className={classes2.root}
      >
        <Typography
          color="primary"
          variant="h4"
          className={classes2.loginText}
        >
          LOGIN
      </Typography>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3} justify="center" alignItems="center">
            <Grid xs={12} item>
              <TextFieldInput
                name="email"
                placeholder="Email"
                value={email}
                type="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={12} item>
              <TextFieldInput
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
            </Grid>
            {/* <Grid xs={12} item style={{ textAlign: "right" }}>
            <Link variant="subtitle2" style={{ color: "#646464" }}>
              Forgot password?
            </Link>
          </Grid> */}
            <Grid xs={12} item className={classes2.center}>
              <Button className={classes.primaryButton} type="submit" onClick={handleShowMessage}>
                LOGIN
            </Button>
            </Grid>
            <Grid xs={12} item className={classes2.center}>
              <Typography color="primary" variant="subtitle2">
                Dont have an account?
                <Link href="/register" underline="always">
                  Register
              </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
        {handleShowMessage()}
      </Container >
    </div>
  );
};

export default LoginForm;
