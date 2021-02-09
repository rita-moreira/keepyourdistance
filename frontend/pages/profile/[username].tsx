import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
// actions
import { getUser } from "../../actions/user";

// custom style
import { useStyles } from "../../theme/theme";

// components
import Navbar from "../../components/navbar/NavBar";
import UserInfo from "../../components/user/UserInfo";
import UpdateForm from "../../components/user/UpdateForm";
import ProgressBar from "../../components/user/ProgressBar";
import TaskModal from "../../components/user/CreateTask";
import Loading from "../../components/individual/Loading";
import CurrentAdminTasks from "../../components/user/tasks/CurrentAdminTasks";
import TasksNavigation from "../../components/user/tasks/TasksNavigation";
import UserTasksCreated from "../../components/user/tasks/UserTasksCreated";
import CurrentAcceptedTasks from "../../components/user/tasks/CurrentAcceptedTasks";
// material ui
import { Button, Grid, Typography } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";

// api url
import { API } from "../../config";
import { isAuth } from "../../actions/cookies";

// context
// import { AuthContext } from "../../contexts/AuthContext";

const Profile = () => {
  const classes = useStyles();
  const router = useRouter();
  // const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuth()) {
      Router.push("/login");
    }
  }, []);

  const { data, mutate } = getUser(`${API}/api/user/${router.query.username}`);
  const [openModalTask, setOpenModelTask] = useState(false);
  const [openModalEdit, setOpenModelEdit] = useState(false);

  if (!data || !data.user || !data.userTasks) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  mutate();

  const handleClose = (close: boolean) => {
    setOpenModelTask(close);
  };
  const handleCloseEdit = (close: boolean) => {
    setOpenModelEdit(close);
  };

  return (
    <div className={classes.backgroundColor}>
      <Modal
        open={openModalTask}
        onClose={handleClose}
        disableEnforceFocus
        disableAutoFocus
      >
        <React.Fragment>
          <TaskModal handleClose={handleClose} />
        </React.Fragment>
      </Modal>
      <Modal
        open={openModalEdit}
        onClose={handleCloseEdit}
        disableEnforceFocus
        disableAutoFocus
      >
        <React.Fragment>
          <UpdateForm handleCloseEdit={handleCloseEdit} />
        </React.Fragment>
      </Modal>

      <Navbar />

      <Grid
        container
        spacing={3}
        justify="flex-start"
        alignItems="flex-start"
        style={{ marginTop: "50px" }}
      >
        <Grid item xs={6} style={{ textAlign: "center" }}>
          <UserInfo
            username={data.user.username}
            description={data.user.description}
            country={data.user.country}
            photo={data.user.photo}
          />

          {isAuth() && isAuth().username !== data.user.username ? null : (
            <React.Fragment>
              <div>
                <Button
                  onClick={() => setOpenModelEdit(true)}
                  style={{ marginTop: "20px" }}
                  className={classes.primaryButton}
                >
                  UPDATE PROFILE
                </Button>
              </div>
              <Button
                style={{ marginTop: "20px" }}
                onClick={() => setOpenModelTask(true)}
                className={classes.primaryButton}
              >
                CREATE TASK
              </Button>
              <Typography color="secondary" variant="body2">
                Reach 15% to unlock this action
              </Typography>
            </React.Fragment>
          )}
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <ProgressBar />
          </Grid>
          <Grid item xs={12} style={{ marginTop: "20px" }}>
            <CurrentAdminTasks />
          </Grid>
          <Grid item xs={12} style={{ marginTop: "20px" }}>
            <CurrentAcceptedTasks
              title={data.userTasks[0].title}
              description={data.userTasks[0].description}
              postedBy={data.userTasks[0].postedBy.username}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <TasksNavigation />
        </Grid>
        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <UserTasksCreated />
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
