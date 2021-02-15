import React from "react";
import { GetServerSideProps } from "next";
// components
import NavBar from "../../components/navbar/NavBar";
import Loading from "../../components/individual/Loading";

// theme
import { useStyles } from "../../theme/theme";

// actions
import { getUser } from "../../actions/user";
import { API } from "../../config";

// material ui
import { Paper, Avatar, Divider, Typography, Grid } from "@material-ui/core";

const UsersProfile = ({ params }: any) => {
  const { username } = params;
  const classes = useStyles();

  const { data, error } = getUser(`${API}/api/user/${username}`);

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

  const userTasksCompleted = data.userTasks.filter((item: any) => {
    return item.completed;
  });
  return (
    <div className={classes.backgroundColor} style={{ height: "100vh" }}>
      <NavBar />
      <Paper
        elevation={3}
        style={{
          marginTop: "10%",
          marginLeft: "50%",
          transform: "translate(-50%)",
          width: "80%",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <Avatar
          alt="profile"
          style={{
            width: "100px",
            height: "100px",
            marginLeft: "50%",
            transform: "translate(-50%)",
          }}
          src={data.user.photo}
        />
        <Divider variant="middle" style={{ marginTop: "10px" }} />
        <div>
          <Typography color="secondary" variant="h4">
            {data.user.username}
          </Typography>

          <Typography color="textPrimary" variant="body2">
            From: {data.user.country}
          </Typography>
          <Typography color="textPrimary" variant="body2">
            Description: {data.user.description}
          </Typography>
        </div>
        <Divider variant="middle" style={{ marginTop: "20px" }} />
        <div>
          <Typography
            color="textPrimary"
            variant="h5"
            style={{ marginTop: "20px" }}
          >
            ACHIVEMENTS
          </Typography>
          <Grid container spacing={3} style={{ marginTop: "20px" }}>
            <Grid item xs>
              <Typography color="secondary" variant="subtitle2">
                Tasks created active
              </Typography>
              <Typography
                variant="body2"
                style={{ color: "#EF7D1D", marginTop: "10px" }}
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
                style={{ color: "#EF7D1D", marginTop: "10px" }}
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
                style={{ color: "#EF7D1D", marginTop: "10px" }}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { params: context.params },
  };
};

export default UsersProfile;
