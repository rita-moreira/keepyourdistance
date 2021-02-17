import React, { useCallback, useContext, useState } from 'react';
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
import { useRouter } from 'next/router';
import Countries from './Countries';
import ImageSelector from './ImageSelector';
import { StateUpdateFormValues } from '../../interface/index';
import { getUser, update } from '../../actions/user';
import { isAuth, authenticate } from '../../actions/cookies';
import { API_BASE_URL } from '../../config';
import { useStyles } from '../../theme/theme';
import { AuthContext } from '../../contexts/AuthContext';

const useStylesPage = makeStyles((theme: Theme) => createStyles({
  container: {
    marginTop: '10%',
    border: '2px solid',
    padding: '50px',
    borderRadius: '20px',
    backgroundColor: 'white',
  },
  updateProfile: {
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


interface UpdateFormProps {
  handleCloseEdit: (value: boolean) => void;
}
const UpdateForm: React.FC<UpdateFormProps> = ({ handleCloseEdit }: UpdateFormProps) => {
  const classes = useStyles();
  const classes2 = useStylesPage();
  const router = useRouter();
  const { setAuth } = useContext(AuthContext);
  const { data, mutate } = getUser(`${API_BASE_URL}/api/user/${router.query.username}`);

  // const { data } = useSWR(url, async (url) => {
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   return data;
  // });

  if (!data || !data.user) {
    return <>Loading...</>;
  }

  const initialValues = {
    username: `${data.user.username}`,
    email: `${data.user.email}`,
    description: `${data.user.description}`,
    country: `${data.user.country}`,
    photo: `${data.user.photo}`,
    error: '',
    message: '',
  };

  const [formData, setFormData] = useState<StateUpdateFormValues>(
    initialValues,
  );

  const handleCountryValue = (country: string) => {
    setFormData({ ...formData, country });
  };
  const handleProfileValue = (photo: string) => {
    setFormData({ ...formData, photo });
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({ ...formData, error: '' });

    const user = {
      _id: isAuth()._id,
      username,
      email,
      description,
      country,
      photo,
    };
    const response = await update(user)
    if (response.error) {
      setFormData({ ...formData, error: response.error });
    } else {
      authenticate(response, () => {
        setAuth({
          _id: isAuth()._id,
          username,
          email,
          // password: isAuth().password,
        });
        router.push(`/profile/${username}`);
        closeModalEdit();
      });
    }
    mutate();
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
        className={classes2.updateProfile}
      >
        UPDATE PROFILE
      </Typography>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <Grid container spacing={3} justify="center" alignItems="center">
          <Grid xs={12} item>
            <ImageSelector
              handleProfileValue={handleProfileValue}
              defaultValue={data.user.photo}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              InputLabelProps={{
                style: { color: '#1F2634' },
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
              onChange={handleChange('username')}
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              InputLabelProps={{
                style: { color: '#1F2634' },
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
              onChange={handleChange('email')}
            />
          </Grid>

          <Grid xs={12} item>
            <TextField
              InputLabelProps={{
                style: { color: '#1F2634' },
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
              onChange={handleChange('description')}
            />
          </Grid>
          <Grid xs={12} item>
            <Countries
              handleCountryValue={handleCountryValue}
              defaultValue={data.user.country}
            />
          </Grid>
          <Grid xs={4} item className={classes2.alignCenter} />
          <Grid xs={4} item className={classes2.alignRight}>
            <Button
              className={`${classes.primaryButton} ${classes2.button}`}
              onClick={closeModalEdit}
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
              EDIT
            </Button>
          </Grid>
        </Grid>
      </form>
      {handleShowMessage()}
    </Container>
  );
};

export default UpdateForm;
