import React, { memo } from 'react';

import { Grid, Typography, Paper, createStyles, makeStyles, Theme } from '@material-ui/core';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import DescriptionIcon from '@material-ui/icons/Description';

import Avatar from '@material-ui/core/Avatar';
import { useStyles } from '../../theme/theme';


const useStylesPage = makeStyles((theme: Theme) => createStyles({
  paper: {
    margin: '30px', minHeight: '300px'
  },
  grid: {
    textAlign: 'center'
  },
  avatar: {
    width: '100px',
    height: '100px',
    marginLeft: '50%',
    transform: 'translate(-50%)',
  },

}));


interface UserInfoProps {
  username: string;
  country: string;
  description: string;
  photo: string;
}
const UserInfo: React.FC<UserInfoProps> = ({
  username, country, description, photo,
}: UserInfoProps) => {

  const classes = useStyles();
  const classes2 = useStylesPage()
  return (
    <>
      <Paper
        square={false}
        elevation={5}
        className={`${classes.backgroundColor} ${classes2.paper}`}
      >
        <Grid
          container
          spacing={3}
          justify="center"
          alignItems="center"
          className={classes2.grid}
        >
          <Grid item xs={12}>
            <Avatar
              className={classes2.avatar}
              src={photo}
              alt="Profile image"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography color="primary" variant="h5">
              {username}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography color="primary" variant="body2">
              <LocationOnIcon />
              {country}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="primary" variant="body2">
              <DescriptionIcon />
              {description}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default memo(UserInfo);
