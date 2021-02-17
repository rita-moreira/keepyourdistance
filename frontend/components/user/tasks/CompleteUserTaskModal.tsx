import React, { useCallback, useState } from 'react';
import {
  Switch,
  Container,
  FormControlLabel,
  Grid,
  Typography,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { StateCompleteFormValues } from '../../../interface/index';
import TextFieldInput from '../../auth/TextField';
import { useStyles } from '../../../theme/theme';
import { update } from '../../../actions/userTasks';


const useStylesPage = makeStyles((theme: Theme) => createStyles({
  container: {
    border: '2px solid',
    padding: '50px',
    borderRadius: '20px',
    marginTop: '5%',
  },
  typography: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  alignCenter: {
    textAlign: "center"
  },
  alignLeft: {
    textAlign: "left"
  },
  alignRight: {
    textAlign: "right"
  },
  button: {
    width: "70%"
  }
}));

interface StateTask {
  _id: string,
  title: string;
  description: string;
  createdBy: string;
}

interface CompleteUserTaskModalProps {
  handleCloseCompleteUserTask: (value: boolean) => void;
  task: StateTask;
  mutate: () => void
}
const CompleteUserTaskModal: React.FC<CompleteUserTaskModalProps> = ({
  handleCloseCompleteUserTask,
  task,
  mutate,
}: CompleteUserTaskModalProps) => {

  const classes = useStyles();
  const classes2 = useStylesPage();
  const initialValues = {
    title: task.title,
    description: task.description,
    comment: '',
    share: true,
    error: '',
    message: '',
  };
  const [formData, setFormData] = useState<StateCompleteFormValues>(
    initialValues,
  );
  const closeModal = () => {
    handleCloseCompleteUserTask(false);
  };
  const {
    title, description, comment, share, error, message,
  } = formData;
  // handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const toggleChecked = () => {
    setFormData({ ...formData, share: !share });
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

  // handlle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({ ...formData, error: '' });
    const taskData = {
      title,
      description,
      share,
      comment,
      _id: task._id,
      completed: true,
    };
    const response = await update(taskData)
    if (response.error) {
      setFormData({ ...formData, error: response.error });
    } else {
      setFormData({ ...formData, error: response.message });
      handleCloseCompleteUserTask(false);

    }
    mutate();
  };
  return (
    <Container
      maxWidth="sm"
      className={`${classes.backgroundColor} ${classes2.container}`}
    >
      <Typography
        color="primary"
        variant="h4"
        className={classes2.typography}
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
            <Typography color="primary">
              createdBy:
              {task.createdBy}
            </Typography>
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
              control={(
                <Switch
                  checked={share}
                  onChange={toggleChecked}
                  color="primary"
                />
              )}
              label={(
                <Typography color="primary" variant="body1">
                  Share
                </Typography>
              )}
            />
          </Grid>
          <Grid xs={4} item className={classes2.alignCenter} />
          <Grid xs={4} item className={classes2.alignRight}>
            <Button
              className={`${classes.primaryButton} ${classes2.button}`}
              onClick={closeModal}
            >
              CANCEL
            </Button>
          </Grid>
          <Grid xs={4} item className={classes2.alignLeft}>
            <Button
              className={`${classes.primaryButton} ${classes2.button}`}
              type="submit"
              onClick={handleShowMessage}
            >
              COMPLETE
            </Button>
          </Grid>
        </Grid>
      </form>
      {handleShowMessage()}

    </Container>
  );
};

export default CompleteUserTaskModal;
