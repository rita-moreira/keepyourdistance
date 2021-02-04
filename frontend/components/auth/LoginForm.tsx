import React, { useState, useContext } from "react";

// material ui
import { Container, Grid, Link, Typography, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

// custom material ui
import { useStyles } from "../../theme/theme";

// import interface
import { StateLoginFormValues } from "../../interface/types";

// components
import TextFieldInput from "./TextField";
import { signin } from "../../actions/auth";

// actions
import { authenticate, isAuth } from "../../actions/cookies";

// router -- next
import Router from "next/router";

// context
import { AuthContext } from "../../contexts/AuthContext";

const initialValues = {
  email: "",
  password: "",
  error: "",
  message: "",
};
const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<StateLoginFormValues>(initialValues);
  const { setAuth } = useContext(AuthContext);
  const classes = useStyles();
  const { email, password, error, message } = formData;

  // show error
  const showError = () =>
    error ? (
      <Alert variant="filled" severity="error">
        {error}
      </Alert>
    ) : null;

  // show message
  const showMessage = () =>
    message && !error ? (
      <Alert variant="filled" severity="success">
        {message}
      </Alert>
    ) : null;
  // handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // handleSubmit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({ ...formData, error: "" });
    const user = { email, password };

    signin(user).then((data: any) => {
      if (data.error) {
        setFormData({ ...formData, error: data.error });
      } else {
        // save user token to cookie
        // save user info to cookie
        // authenticate user

        authenticate(data, () => {
          if (isAuth()) {
            setAuth(isAuth());
            Router.push(`/profile/${isAuth().username}`);
          }
        });
      }
    });
  };

  return (
    <Container
      maxWidth="sm"
      className={classes.backgroundColor}
      style={{
        border: "2px solid",
        padding: "50px",
        borderRadius: "20px",
        marginTop: "5%",
      }}
    >
      <Typography
        color="primary"
        variant="h4"
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
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
          <Grid xs={12} item style={{ textAlign: "right" }}>
            <Link variant="subtitle2" style={{ color: "#646464" }}>
              Forgot password?
            </Link>
          </Grid>
          <Grid xs={12} item style={{ textAlign: "center" }}>
            <Button className={classes.primaryButton} type="submit">
              LOGIN
            </Button>
          </Grid>
          <Grid xs={12} item style={{ textAlign: "center" }}>
            <Typography color="primary" variant="subtitle2">
              Dont have an account?{" "}
              <Link href="/register" underline="always">
                Register
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
      {showError()}
      {showMessage()}
    </Container>
  );
};

export default LoginForm;
