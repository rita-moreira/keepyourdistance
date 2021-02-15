import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Router from "next/router";
import { GetServerSideProps } from "next";
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
import CompletedAdminTasks from "../../components/user/tasks/CompletedAdminTasks";
import CompletedUserTasks from "../../components/user/tasks/CompletedUserTasks";
import CompleteUserTaskModal from "../../components/user/tasks/CompleteUserTaskModal";

// material ui
import { Button, Grid, Typography } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Alert from "@material-ui/lab/Alert";

// api url
import { API } from "../../config";
import { isAuth } from "../../actions/cookies";

// context
import { AuthContext } from "../../contexts/AuthContext";

const Profile = ({ params }: any) => {
  const classes = useStyles();

  const { auth } = useContext(AuthContext);
  const { username } = params;

  // se
  useEffect(() => {
    if (auth.username !== username) {
      Router.push("/");
    }
  }, []);

  const { data, mutate } = getUser(`${API}/api/user/${username}`);
  const [openModalTask, setOpenModelTask] = useState(false);
  const [openModalEdit, setOpenModelEdit] = useState(false);
  const [openModalUserTask, setOpenModalUserTask] = useState(false);
  const [showTasks, setShowTasks] = useState(0);
  const [completeTask, setCompleteTask] = useState(null);

  if (!data || !data.user || !data.userTasks) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const handleCloseCompleteUserTask = (
    close?: boolean,
    _id?: string,
    title?: string,
    description?: string,
    createdBy?: string
  ) => {
    setCompleteTask({ _id, title, description, createdBy });
    setOpenModalUserTask(close);
  };
  const renderAcceptedTask = data.userTasks
    .filter((task: any) => {
      return task.completed === false;
    })

    .map((task: any) => {
      return (
        <div
          key={task.title}
          style={{ marginTop: "10px", textAlign: "center" }}
        >
          <div
            style={{
              display: "inline-block",
              width: "10%",
              verticalAlign: "middle",
            }}
          >
            <Button color="primary">
              <CheckCircleOutlineIcon
                onClick={() =>
                  handleCloseCompleteUserTask(
                    true,
                    task._id,
                    task.title,
                    task.description,
                    task.postedBy.username
                  )
                }
              />
            </Button>
          </div>
          <div
            style={{
              display: "inline-block",
              width: "90%",
              verticalAlign: "middle",
            }}
          >
            <CurrentAcceptedTasks
              _id={task._id}
              title={task.title}
              description={task.description}
              postedBy={task.postedBy.username}
              mutate={mutate}
            />
          </div>
        </div>
      );
    });

  const handleClose = (close: boolean) => {
    setOpenModelTask(close);
  };
  const handleCloseEdit = (close: boolean) => {
    setOpenModelEdit(close);
  };
  const handleShowTasks = (show: number) => {
    setShowTasks(show);
  };

  return (
    <div>
      <Head>
        <title>KeepYourDistance</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={classes.backgroundColor}>
        <Modal
          open={openModalUserTask}
          onClose={handleCloseCompleteUserTask}
          disableEnforceFocus
          disableAutoFocus
        >
          <React.Fragment>
            <CompleteUserTaskModal
              handleCloseCompleteUserTask={handleCloseCompleteUserTask}
              task={completeTask}
            />
          </React.Fragment>
        </Modal>
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
                  disabled={data.user.progress <= 2}
                >
                  CREATE TASK
                </Button>
                <Typography color="secondary" variant="body2">
                  Reach 15% to unlock this action
                </Typography>
              </React.Fragment>
            )}
          </Grid>
          <Grid item xs={6} style={{ padding: "30px" }}>
            <Grid item xs={12}>
              <ProgressBar progressValue={data.user.progress} />
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <CurrentAdminTasks
                user={data.user}
                progressValue={data.user.progress}
                mutate={mutate}
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography color="primary" variant="body2">
                Accepted Tasks
              </Typography>
              {renderAcceptedTask.length > 0 ? (
                renderAcceptedTask
              ) : (
                <div>
                  <Alert
                    severity="info"
                    style={{ color: "white", backgroundColor: "#EF7D1D" }}
                  >
                    There are no tasks in course, you can accept tasks from
                    other users!
                  </Alert>
                </div>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "20px" }}>
            <TasksNavigation handleShowTasks={handleShowTasks} />
          </Grid>
          {showTasks === 2 ? (
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <UserTasksCreated />
            </Grid>
          ) : showTasks === 1 ? (
            <>
              <Grid item xs={12} style={{ marginTop: "20px" }}>
                <CompletedAdminTasks
                  admintasks={data.adminCompletedTasks}
                  mutate={mutate}
                />
              </Grid>
              <Grid item xs={12}>
                <CompletedUserTasks
                  userTasks={data.userTasks}
                  mutate={mutate}
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} style={{ marginTop: "20px" }}>
                <UserTasksCreated />
              </Grid>

              <Grid item xs={12} style={{ marginTop: "20px" }}>
                <CompletedAdminTasks
                  admintasks={data.adminCompletedTasks}
                  mutate={mutate}
                />
              </Grid>
              <Grid item xs={12}>
                <CompletedUserTasks
                  userTasks={data.userTasks}
                  mutate={mutate}
                />
              </Grid>
            </>
          )}
        </Grid>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { params: context.params },
  };
};

export default Profile;
