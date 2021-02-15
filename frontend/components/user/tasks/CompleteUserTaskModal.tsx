import React, { useState } from "react";
import { StateCompleteFormValues } from "../../../interface/types";
import {
  Switch,
  Container,
  FormControlLabel,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import TextFieldInput from "../../auth/TextField";

// theme
import { useStyles } from "../../../theme/theme";

// actions
import { update } from "../../../actions/userTasks";

const CompleteUserTaskModal: React.FC<any> = ({
  handleCloseCompleteUserTask,
  task,
}: any) => {
  const classes = useStyles();
  const initialValues = {
    title: task.title,
    description: task.description,
    comment: "",
    share: true,
    error: "",
    message: "",
  };
  const [formData, setFormData] = useState<StateCompleteFormValues>(
    initialValues
  );
  const closeModal = () => {
    handleCloseCompleteUserTask(false);
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

  // handlle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ ...formData, error: "" });
    const taskData = {
      title,
      description,
      share,
      comment,
      _id: task._id,
      completed: true,
    };
    console.log(taskData);
    update(taskData).then((data: any) => {
      if (data.error) {
        setFormData({ ...formData, error: data.error });
      } else {
        setFormData({ ...formData, error: data.message });
        handleCloseCompleteUserTask(false);
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
            <Typography color="primary">createdBy: {task.createdBy}</Typography>
          </Grid>
          <Grid xs={12} item>
            <TextFieldInput
              name="comment"
              placeholder="Please share your experience!"
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
              COMPLETE
            </Button>
          </Grid>
        </Grid>
      </form>
      {showError()}
      {showMessage()}
    </Container>
  );
};

export default CompleteUserTaskModal;
