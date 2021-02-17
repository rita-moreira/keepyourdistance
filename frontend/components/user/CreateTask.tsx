import React, { useCallback, useState } from 'react';

import {
  Button,
  Container,
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { getCookie } from '../../actions/cookies';
import { createTask } from '../../actions/task';
import { currentDate } from '../../actions/date';
import { useStyles } from '../../theme/theme';

const useStylesPage = makeStyles((theme: Theme) => createStyles({
  container: {
    marginTop: '10%',
    border: '2px solid',
    padding: '50px',
    borderRadius: '20px',
    backgroundColor: 'white',
  },
  createTask: {
    textAlign: 'center', marginBottom: '20px'
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


const initialValues = {
  title: '',
  description: '',
  error: '',
  message: '',
};
const CreateTaskModal: React.FC<any> = ({ handleClose }: any) => {
  const classes = useStyles();
  const classes2 = useStylesPage();
  const [formData, setFormData] = useState(initialValues);

  const {
    title, description, error, message,
  } = formData;

  const token = getCookie('token');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentTime = currentDate();

    setFormData({ ...formData, error: '' });

    const task = { title, description, currentTime };
    const response = await createTask(task, token)
    if (response.error) {
      setFormData({ ...formData, error: response.error });

    } else {

      setFormData({
        ...formData,
        title: '',
        description: '',
        error: '',
        message: response.message,
      });
    }
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


  const closeModal = () => {
    handleClose(false);
  };
  const handleChange = (name: string) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData({ ...formData, error: '', [name]: e.target.value });
  };
  return (
    <Container
      maxWidth="sm"
      className={classes2.container}
    >
      <Typography
        color="secondary"
        variant="h4"
        className={classes2.createTask}
      >
        CREATE TASK
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3} justify="center" alignItems="center">
          <Grid xs={12} item>
            <TextField
              InputLabelProps={{
                style: { color: '#1F2634' },
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
              onChange={handleChange('title')}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              InputLabelProps={{
                style: { color: '#1F2634' },
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
              onChange={handleChange('description')}
            />
          </Grid>

          <Grid xs={4} item className={classes2.alignCenter} />
          <Grid xs={4} item className={classes2.alignRight} >
            <Button
              onClick={closeModal}
              className={`${classes.primaryButton} ${classes2.button}`}
            >
              CANCEL
            </Button>
          </Grid>
          <Grid xs={4} item className={classes2.alignLeft} >
            <Button
              className={`${classes.primaryButton} ${classes2.button}`}
              onClick={handleShowMessage}
              type="submit"
            >
              CREATE
            </Button>
          </Grid>
        </Grid>
      </form>
      {handleShowMessage()}

    </Container >
  );
};

export default CreateTaskModal;
