import React, { useState } from "react";

// material ui
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { getCookie } from "../../actions/cookies";
import { createTask } from "../../actions/task";
import { currentDate } from "../../actions/date";

// custom theme
import { useStyles } from "../../theme/theme";

const initialValues = {
  title: "",
  description: "",
  error: "",
  message: "",
};
const CreateTaskModal: React.FC<any> = ({ handleClose }: any) => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialValues);

  const { title, description, error, message } = formData;

  const token = getCookie("token");
  console.log(token);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentTime = currentDate();
    setFormData({ ...formData, error: "" });

    const task = { title, description, currentTime };

    createTask(task, token).then((data: any) => {
      if (data.error) {
        setFormData({ ...formData, error: data.error });
      } else {
        setFormData({
          ...formData,
          title: "",
          description: "",
          error: "",
          message: data.message,
        });
      }
    });
    // Router.push("/profile");
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

  const closeModal = () => {
    handleClose(false);
  };
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
        color="secondary"
        variant="h4"
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        CREATE TASK
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3} justify="center" alignItems="center">
          <Grid xs={12} item>
            <TextField
              InputLabelProps={{
                style: { color: "#1F2634" },
              }}
              variant="outlined"
              color="primary"
              value={title}
              name="title"
              label="Title"
              required
              placeholder="title"
              type="text"
              fullWidth
              onChange={handleChange("title")}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              InputLabelProps={{
                style: { color: "#1F2634" },
              }}
              name="description"
              label="Description"
              type="text"
              value={description}
              required
              placeholder="description"
              variant="outlined"
              color="primary"
              fullWidth
              onChange={handleChange("description")}
            />
          </Grid>

          <Grid xs={4} item style={{ textAlign: "center" }}></Grid>
          <Grid xs={4} item style={{ textAlign: "right" }}>
            <Button
              style={{ width: "70%" }}
              onClick={closeModal}
              className={classes.primaryButton}
            >
              CANCEL
            </Button>
          </Grid>
          <Grid xs={4} item style={{ textAlign: "left" }}>
            <Button
              style={{ width: "70%" }}
              className={classes.primaryButton}
              onClick={handleClose}
              type="submit"
            >
              CREATE
            </Button>
          </Grid>
        </Grid>
      </form>

      {showMessage()}
      {showError()}
    </Container>
  );
};

export default CreateTaskModal;
