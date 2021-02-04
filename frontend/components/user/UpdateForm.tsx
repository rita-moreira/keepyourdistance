import React, { useContext, useState } from "react";

// components
import Countries from "./Countries";

// material ui
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

// typescript interface types
import { StateUpdateFormValues } from "../../interface/types";
// router -- next
import Router from "next/router";
// actions
import { getUser, update } from "../../actions/user";
import { isAuth, authenticate } from "../../actions/cookies";
import { API } from "../../config";

// theme custom
import { useStyles } from "../../theme/theme";

// context
import { AuthContext } from "../../contexts/AuthContext";

const UpdateForm: React.FC<any> = ({ handleCloseEdit }: any) => {
  const classes = useStyles();

  const { auth, setAuth } = useContext(AuthContext);
  const data = getUser(`${API}/api/user/${auth?.username}`).data;

  // const { data } = useSWR(url, async (url) => {
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   return data;
  // });

  const initialValues = {
    username: `${data.user.username}`,
    email: `${data.user.email}`,
    description: `${data.user.description}`,
    country: `${data.user.country}`,
    photo: `${data.user.photo}`,
    error: "",
    message: "",
  };

  const [formData, setFormData] = useState<StateUpdateFormValues>(
    initialValues
  );

  const handleCountryValue = (country: string) => {
    setFormData({ ...formData, country });
  };
  const closeModalEdit = () => {
    handleCloseEdit(false);
  };
  const {
    username,
    email,
    country,
    description,
    photo,
    error,
    message,
  } = formData;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({ ...formData, error: "" });

    const user = {
      _id: isAuth()._id,
      username,
      email,
      description,
      country,
      photo,
    };

    update(user).then((data: any) => {
      console.log(data);
      if (data.error) {
        setFormData({ ...formData, error: data.error });
      } else {
        authenticate(data, () => {
          console.log(data);
          setAuth({
            username: username,
            email: email,
            password: isAuth().password,
          });
          Router.push(`/profile/${username}`);
          closeModalEdit();
        });
        // setFormData({
        //   username: username,
        //   email: email,
        //   description: description,
        //   country: country,
        //   error: "",
        //   message: data.message,
        // });
      }
    });
  };
  const showError = () =>
    error ? (
      <Alert variant="filled" severity="error">
        {error}
      </Alert>
    ) : null;
  const showMessage = () =>
    message && !error ? (
      <Alert variant="filled" severity="success">
        {message}
      </Alert>
    ) : null;

  const handleChange = (name: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, error: "", [name]: e.target.value });
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        marginTop: "10%",
        border: "2px solid",
        padding: "50px",
        borderRadius: "20px",
        backgroundColor: "white",
      }}
    >
      <Typography
        color="primary"
        variant="h4"
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        UPDATE PROFILE
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3} justify="center" alignItems="center">
          <Grid xs={12} item>
            <input name="photo" type="file" onChange={handleChange("photo")} />
          </Grid>
          <Grid xs={12} item>
            <TextField
              InputLabelProps={{
                style: { color: "#1F2634" },
              }}
              variant="outlined"
              color="primary"
              value={username}
              name="username"
              label="Username"
              required
              placeholder="username"
              type="text"
              fullWidth
              onChange={handleChange("username")}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              InputLabelProps={{
                style: { color: "#1F2634" },
              }}
              variant="outlined"
              color="primary"
              value={email}
              name="email"
              label="Email"
              required
              placeholder="email"
              type="email"
              fullWidth
              onChange={handleChange("email")}
            />
          </Grid>

          <Grid xs={12} item>
            <TextField
              InputLabelProps={{
                style: { color: "#1F2634" },
              }}
              name="description"
              label="Description"
              value={description}
              required
              type="description"
              placeholder="description"
              variant="outlined"
              color="primary"
              fullWidth
              onChange={handleChange("description")}
            />
          </Grid>
          <Grid xs={12} item>
            <Countries handleCountryValue={handleCountryValue} />
          </Grid>
          <Grid xs={4} item style={{ textAlign: "center" }}></Grid>
          <Grid xs={4} item style={{ textAlign: "right" }}>
            <Button
              style={{ width: "70%" }}
              onClick={closeModalEdit}
              className={classes.primaryButton}
            >
              CANCEL
            </Button>
          </Grid>
          <Grid xs={4} item style={{ textAlign: "left" }}>
            <Button
              className={classes.primaryButton}
              style={{ width: "70%" }}
              type="submit"
            >
              EDIT
            </Button>
          </Grid>
        </Grid>
      </form>
      {showError()}
      {showMessage()}
    </Container>
  );
};

export default UpdateForm;
