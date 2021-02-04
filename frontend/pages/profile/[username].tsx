import React, { useContext, useState } from "react";

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

// material ui
import { Button, Grid, Typography } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";

// api url
import { API } from "../../config";
import { isAuth } from "../../actions/cookies";

// context
import { AuthContext } from "../../contexts/AuthContext";

const Profile = () => {
  const classes = useStyles();

  const { auth } = useContext(AuthContext);

  const data = getUser(`${API}/api/user/${auth?.username}`).data;
  const mutate = getUser(`${API}/api/user/${auth?.username}`).mutate;
  const [openModalTask, setOpenModelTask] = useState(false);
  const [openModalEdit, setOpenModelEdit] = useState(false);
  mutate();
  console.log(data);

  const handleClose = (close: any) => {
    setOpenModelTask(close);
  };
  const handleCloseEdit = (close: any) => {
    setOpenModelEdit(close);
  };
  if (!data || !data.user) {
    return <div>Loading...</div>;
  }
  console.log(data.user.photo);
  return (
    <div className={classes.backgroundColor}>
      <Modal
        open={openModalTask}
        onClose={handleClose}
        disableEnforceFocus
        disableAutoFocus
        style={{ backgroundColor: "#1F2634" }}
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
        style={{ backgroundColor: "#1F2634" }}
      >
        <React.Fragment>
          <UpdateForm handleCloseEdit={handleCloseEdit} />
        </React.Fragment>
      </Modal>

      <Navbar />

      <Grid container spacing={3} justify="center" alignItems="center">
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
                Reach 15% to unlock this action{" "}
              </Typography>
            </React.Fragment>
          )}
        </Grid>
        <Grid item xs={6}>
          <ProgressBar />
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
