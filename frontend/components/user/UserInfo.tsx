import React from "react";

// material ui
import { Grid, Typography, Paper } from "@material-ui/core";
// icons
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DescriptionIcon from "@material-ui/icons/Description";

import Avatar from "@material-ui/core/Avatar";

// theme
import { useStyles } from "../../theme/theme";

const UserInfo = ({ username, country, description, photo }: any) => {
  const classes = useStyles();
  return (
    <div>
      <Paper
        square={false}
        elevation={5}
        className={classes.backgroundColor}
        style={{ margin: "30px", minHeight: "300px" }}
      >
        <Grid
          container
          spacing={3}
          justify="center"
          alignItems="center"
          style={{ textAlign: "center" }}
        >
          <Grid item xs={12}>
            <Avatar
              alt="Profile image"
              style={{
                width: "100px",
                height: "100px",
                marginLeft: "50%",
                transform: "translate(-50%)",
              }}
              src={photo}
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
    </div>
  );
};

export default UserInfo;
