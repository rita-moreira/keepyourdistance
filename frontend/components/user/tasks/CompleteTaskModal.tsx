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
import React, { useCallback, useState } from 'react';
import { Alert } from '@material-ui/lab';
import { StateCompleteFormValues } from '../../../interface/index';
import { useStyles } from '../../../theme/theme';
import TextFieldInput from '../../auth/TextField';
import { update } from '../../../actions/user';
import { completeTask } from '../../../actions/adminTask';
import { getCookie } from '../../../actions/cookies';
import { CompleteTaskUser } from "../../../interface/index"

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


interface CompleteTaskModalProps {
  defaultTitle: string;
  defaultDescription: string;
  handleClose: (value: boolean) => void;
  user: CompleteTaskUser;
  progressValue: number;
  mutate: () => void;
}

const CompleteTaskModal: React.FC<CompleteTaskModalProps> = ({
  defaultTitle,
  defaultDescription,
  handleClose,
  user,
  progressValue,
  mutate,
}: CompleteTaskModalProps) => {

  const classes = useStyles();
  const classes2 = useStylesPage();
  const initialValues = {
    title: defaultTitle,
    description: defaultDescription,
    comment: '',
    share: true,
    error: '',
    message: '',
  };
  const [formData, setFormData] = useState<StateCompleteFormValues>(
    initialValues,
  );
  const closeModal = () => {
    handleClose(false);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormData({ ...formData, error: '' });
    const {
      _id, username, email, country, description, photo,
    } = user;

    const taskData = {
      title,
      description,
      comment,
      share,
    };
    const token = getCookie('token');

    const response = await completeTask(taskData, token)
    if (response.error) {
      setFormData({ ...formData, error: response.error });
    } else {
      setFormData({
        ...formData,
        error: '',
        message: response.message,
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
      update(userData);
      handleClose(false);
      mutate();
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

              onClick={closeModal}
              className={`${classes.primaryButton} ${classes2.button}`}
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

export default CompleteTaskModal;
