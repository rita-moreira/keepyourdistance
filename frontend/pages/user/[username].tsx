import React from 'react';
import { GetServerSideProps } from 'next';

import {
  Paper, Avatar, Divider, Typography, Grid, createStyles, makeStyles, Theme,
} from '@material-ui/core';
import NavBar from '../../components/navbar/NavBar';
import Loading from '../../components/individual/Loading';

import { useStyles } from '../../theme/theme';

import { getUser } from '../../actions/user';
import { API_BASE_URL } from '../../config';

const useStylesPage = makeStyles((theme: Theme) => createStyles({
  root: {
    height: '100vh'
  },
  paper: {
    marginTop: '10%',
    marginLeft: '50%',
    transform: 'translate(-50%)',
    width: '80%',
    textAlign: 'center',
    padding: '20px',
  },
  avatar: {
    width: '100px',
    height: '100px',
    marginLeft: '50%',
    transform: 'translate(-50%)',
  },
  mT10: {
    marginTop: '10px'
  },
  mT20: {
    marginTop: '20px'
  },
  values: {
    color: '#EF7D1D', marginTop: '10px'
  },

}));


// interface ParamsProps {
//   username: string;
// }

const UsersProfile = ({ params }: any) => {
  const { username } = params;
  const classes = useStyles();
  const classes2 = useStylesPage();

  const { data, error } = getUser(`${API_BASE_URL}/api/user/${username}`);

  if (error) {
    return <div>Failed to load!</div>;
  }
  if (!data) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const userTasksCompleted = data.userTasks.filter((item: any) => item.completed);
  return (
    <div className={`${classes.backgroundColor} ${classes2.root}`} >
      <NavBar />
      <Paper
        elevation={3}
        className={classes2.paper}
      >
        <Avatar
          alt="profile"
          className={classes2.avatar}
          src={data.user.photo}
        />
        <Divider variant="middle" className={classes2.mT10} />
        <div>
          <Typography color="secondary" variant="h4">
            {data.user.username}
          </Typography>

          <Typography color="textPrimary" variant="body2">
            From:
            {data.user.country}
          </Typography>
          <Typography color="textPrimary" variant="body2">
            Description:
            {data.user.description}
          </Typography>
        </div>
        <Divider variant="middle" className={classes2.mT20} />
        <div>
          <Typography
            color="textPrimary"
            variant="h5"
            className={classes2.mT20}
          >
            ACHIVEMENTS
          </Typography>
          <Grid container spacing={3} className={classes2.mT20}>
            <Grid item xs>
              <Typography color="secondary" variant="subtitle2">
                Tasks created active
              </Typography>
              <Typography
                variant="body2"
                className={classes2.values}
              >
                {data.tasks.length}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography color="secondary" variant="subtitle2">
                Mandatory Tasks completed
              </Typography>
              <Typography
                variant="body2"
                className={classes2.values}
              >
                {data.adminCompletedTasks.length}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography color="secondary" variant="subtitle2">
                User Tasks completed
              </Typography>
              <Typography
                variant="body2"
                className={classes2.values}
              >
                {userTasksCompleted.length}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { params: context.params },
});

export default UsersProfile;
