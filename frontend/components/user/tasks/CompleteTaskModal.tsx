import {
  Switch,
  Container,
  FormControlLabel,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";

// interface
import { StateCompleteFormValues } from "../../../interface/types";
import { useStyles } from "../../../theme/theme";
import TextFieldInput from "../../auth/TextField";

// actions
import { update } from "../../../actions/user";
import { completeTask } from "../../../actions/adminTask";
import { getCookie } from "../../../actions/cookies";
import { Alert } from "@material-ui/lab";
const CompleteTaskModal: React.FC<any> = ({
  defaultTitle,
  defaultDescription,
  handleClose,
  user,
  progressValue,
}: {
  defaultTitle: string;
  defaultDescription: string;
  handleClose: any;
  user: any;
  progressValue: number;
}) => {
  const classes = useStyles();
  const initialValues = {
    title: defaultTitle,
    description: defaultDescription,
    comment: "",
    share: true,
    error: "",
    message: "",
  };
  const [formData, setFormData] = useState<StateCompleteFormValues>(
    initialValues
  );
  const closeModal = () => {
    handleClose(false);
  };
  const { title, description, comment, share, error, message } = formData;

  // handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const toggleChecked = () => {
    setFormData({ ...formData, share: !share });
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormData({ ...formData, error: "" });
    const { _id, username, email, country, description, photo } = user;

    const taskData = {
      title,
      description,
      comment,
      share,
    };
    const token = getCookie("token");
    completeTask(taskData, token).then((data: any) => {
      if (data.error) {
        setFormData({ ...formData, error: data.error });
      } else {
        setFormData({
          ...formData,
          error: "",
          message: data.message,
        });
        const userData = {
          _id,
          username,
          email,
          country,
          description,
          photo,
          progress: progressValue + 1,
        };
        update(userData).then((data: any) => {
          if (data.error) {
            console.log(data.error);
          } else {
            console.log(data.message);
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
        COMPLETE TASK
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3} justify="center" alignItems="center">
          <Grid xs={12} item>
            <Typography color="primary">{title}</Typography>
          </Grid>
          <Grid xs={12} item>
            <Typography color="primary">{description}</Typography>
          </Grid>
          <Grid xs={12} item>
            <TextFieldInput
              name="comment"
              placeholder="Plese share your experience!"
              value={comment}
              type="text"
              onChange={handleChange}
            />
          </Grid>
          <Grid xs={12} item>
            <FormControlLabel
              labelPlacement="start"
              control={
                <Switch
                  checked={share}
                  onChange={toggleChecked}
                  color="primary"
                />
              }
              label={
                <Typography color="primary" variant="body1">
                  Share
                </Typography>
              }
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
              type="submit"
            >
              CREATE
            </Button>
          </Grid>
        </Grid>
      </form>
      {showError()}
      {showMessage()}
    </Container>
  );
};

export default CompleteTaskModal;
