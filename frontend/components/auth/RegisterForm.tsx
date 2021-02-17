import React, { useCallback, useState } from 'react';
import {
  Container, Grid, Link, Typography, Button, makeStyles, createStyles,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useStyles } from '../../theme/theme';
import { StateRegisterFormValues } from '../../interface/index';
import TextFieldInput from './TextField';
import { signUp } from '../../actions/auth';


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
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  error: '',
  message: '',
};
const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<StateRegisterFormValues>(
    initialValues,
  );

  const classes = useStyles();
  const classes2 = useStylesPage();
  const {
    username,
    email,
    password,
    confirmPassword,
    error,
    message,
  } = formData;

  // handleSubmit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({ ...formData, error: '' });

    const user = {
      username, email, password, confirmPassword,
    };

    signUp(user).then((data: { error: string; message: string }) => {
      console.log(error, message);
      if (data.error) {
        setFormData({ ...formData, error: data.error });
      } else {
        setFormData({
          ...formData,
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          error: '',
          message: data.message,
        });
      }
    });
  };

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
  const handleChange = (name: string) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData({ ...formData, [name]: e.target.value });
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
          REGISTER
      </Typography>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3} justify="center" alignItems="center">
            <Grid xs={12} item>
              <TextFieldInput
                name="username"
                placeholder="Username"
                value={username}
                type="text"
                onChange={handleChange('username')}
              />
            </Grid>

            <Grid xs={12} item>
              <TextFieldInput
                name="email"
                placeholder="Email"
                value={email}
                type="email"
                onChange={handleChange('email')}
              />
            </Grid>
            <Grid xs={12} item>
              <TextFieldInput
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange('password')}
              />
            </Grid>
            <Grid xs={12} item>
              <TextFieldInput
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleChange('confirmPassword')}
              />
            </Grid>
            <Grid xs={12} item className={classes2.center}>
              <Button className={classes.primaryButton} type="submit" onClick={handleShowMessage}>
                REGISTER
            </Button>
            </Grid>
            <Grid xs={12} item className={classes2.center}>
              <Typography color="primary" variant="subtitle2">
                Already have an account?
              {' '}
                <Link href="/login" underline="always">
                  Login
              </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
        {handleShowMessage()}

      </Container>
    </div>
  );
};

export default RegisterForm;
