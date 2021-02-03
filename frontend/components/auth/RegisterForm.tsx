import React, { useState } from "react";

// material ui
import { Container, Grid, Link, Typography, Button } from "@material-ui/core";
// npm install @material-ui/lab
import Alert from "@material-ui/lab/Alert";

// custom material ui
import { useStyles } from "../../theme/theme";

// import interface
import { StateRegisterFormValues } from "../../interface/types";

// components
import TextFieldInput from "./TextField";

// actions
import { signup } from "../../actions/auth";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  error: "",
  message: "",
};
const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<StateRegisterFormValues>(
    initialValues
  );

  const classes = useStyles();
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
    setFormData({ ...formData, error: "" });

    const user = { username, email, password, confirmPassword };

    signup(user).then((data: { error: string; message: string }) => {
      console.log(error, message);
      if (data.error) {
        setFormData({ ...formData, error: data.error });
      } else {
        setFormData({
          ...formData,
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          error: "",
          message: data.message,
        });
      }
    });
  };

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
  const handleChange = (name: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [name]: e.target.value });
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
              onChange={handleChange("username")}
            />
          </Grid>

          <Grid xs={12} item>
            <TextFieldInput
              name="email"
              placeholder="Email"
              value={email}
              type="email"
              onChange={handleChange("email")}
            />
          </Grid>
          <Grid xs={12} item>
            <TextFieldInput
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange("password")}
            />
          </Grid>
          <Grid xs={12} item>
            <TextFieldInput
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange("confirmPassword")}
            />
          </Grid>
          <Grid xs={12} item style={{ textAlign: "center" }}>
            <Button className={classes.primaryButton} type="submit">
              REGISTER
            </Button>
          </Grid>
          <Grid xs={12} item style={{ textAlign: "center" }}>
            <Typography color="primary" variant="subtitle2">
              Already have an account?{" "}
              <Link href="/login" underline="always">
                Login
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

export default RegisterForm;
