import React from "react";

// material ui
import { Container, Grid, Typography } from "@material-ui/core";
// icons
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DescriptionIcon from "@material-ui/icons/Description";

import Avatar from "@material-ui/core/Avatar";

const UserInfo = ({ username, country, description }: any) => {
  return (
    <div>
      <Container
        maxWidth="xs"
        style={{
          border: "2px solid",
          padding: "50px",
          borderRadius: "20px",
          height: "calc(100vh - 200px)",
        }}
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
              src="/default-profile.png"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography color="primary" variant="h5">
              {username}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              color="primary"
              variant="subtitle2"
              style={{ textAlign: "left" }}
            >
              <LocationOnIcon />
              {country}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              color="primary"
              variant="body2"
              style={{ textAlign: "left" }}
            >
              <DescriptionIcon />
              {description}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default UserInfo;
