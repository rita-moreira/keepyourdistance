import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { GetServerSideProps } from 'next';
import Modal from '@material-ui/core/Modal';
import { Button, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Alert from '@material-ui/lab/Alert';
import { getUser } from '../../actions/user';
import { useStyles } from '../../theme/theme';
import Navbar from '../../components/navbar/NavBar';
import UserInfo from '../../components/user/UserInfo';
import UpdateForm from '../../components/user/UpdateForm';
import ProgressBar from '../../components/user/ProgressBar';
import TaskModal from '../../components/user/CreateTask';
import Loading from '../../components/individual/Loading';
import CurrentAdminTasks from '../../components/user/tasks/CurrentAdminTasks';
import TasksNavigation from '../../components/user/tasks/TasksNavigation';
import UserTasksCreated from '../../components/user/tasks/UserTasksCreated';
import CurrentAcceptedTasks from '../../components/user/tasks/CurrentAcceptedTasks';
import CompletedAdminTasks from '../../components/user/tasks/CompletedAdminTasks';
import CompletedUserTasks from '../../components/user/tasks/CompletedUserTasks';
import CompleteUserTaskModal from '../../components/user/tasks/CompleteUserTaskModal';
import { API_BASE_URL } from '../../config';
import { isAuth } from '../../actions/cookies';
import { AuthContext } from '../../contexts/AuthContext';
import { UserTasks } from "../../interface/index"


const useStylesPage = makeStyles((theme: Theme) => createStyles({
  root: {
    marginTop: '10px', textAlign: 'center'
  },
  divButton: {
    display: 'inline-block',
    width: '10%',
    verticalAlign: 'middle',
  },
  divAcceptedTasks: {
    display: 'inline-block',
    width: '90%',
    verticalAlign: 'middle',
  },
  grid: {
    marginTop: '50px'
  },
  gridItem: {
    textAlign: 'center'
  },
  various: {
    marginTop: '20px'
  },
  gridItem2: {
    padding: '30px'
  },
  alert: {
    color: 'white',
    backgroundColor: '#EF7D1D'
  }

}));


const Profile = ({ params }: any) => {
  const classes = useStyles();
  const classes2 = useStylesPage();
  const { auth } = useContext(AuthContext);
  const { username } = params;

  // se
  useEffect(() => {
    if (auth.username !== username) {
      Router.push('/');
    }
  }, []);

  interface CompleteTask {
    _id: string;
    title: string;
    description: string;
    createdBy: string;
  }
  const { data, mutate } = getUser(`${API_BASE_URL}/api/user/${username}`);
  const [openModalTask, setOpenModelTask] = useState(false);
  const [openModalEdit, setOpenModelEdit] = useState(false);
  const [openModalUserTask, setOpenModalUserTask] = useState(false);
  const [showTasks, setShowTasks] = useState(0);
  const [completeTask, setCompleteTask] = useState<CompleteTask>({
    _id: "",
    title: "",
    description: "",
    createdBy: "",
  });

  if (!data || !data.user || !data.userTasks) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const handleCloseCompleteUserTask = (
    close: boolean,
    _id?: string,
    title?: string,
    description?: string,
    createdBy?: string,
  ) => {

    if (_id && title && description && createdBy) {
      setCompleteTask({
        _id, title, description, createdBy,
      });

    }
    setOpenModalUserTask(close);


  };

  const renderAcceptedTask = data.userTasks
    .filter((task: UserTasks) => task.completed === false)

    .map((task: UserTasks) => (

      < div
        key={task.title}
        className={classes2.root}
      >
        <div
          className={classes2.divButton}
        >
          <Button color="primary">
            <CheckCircleOutlineIcon
              onClick={() => handleCloseCompleteUserTask(
                true,
                task._id,
                task.title,
                task.description,
                task.postedBy.username,
              )}
            />
          </Button>
        </div>
        <div
          className={classes2.divAcceptedTasks}
        >
          <CurrentAcceptedTasks
            _id={task._id}
            title={task.title}
            description={task.description}
            postedBy={task.postedBy.username}
            mutate={mutate}
          />
        </div>
      </div >
    ));

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
          <>
            <CompleteUserTaskModal
              handleCloseCompleteUserTask={handleCloseCompleteUserTask}
              task={completeTask}
              mutate={mutate}
            />
          </>
        </Modal>
        <Modal
          open={openModalTask}
          onClose={handleClose}
          disableEnforceFocus
          disableAutoFocus
        >
          <>
            <TaskModal handleClose={handleClose} />
          </>
        </Modal>
        <Modal
          open={openModalEdit}
          onClose={handleCloseEdit}
          disableEnforceFocus
          disableAutoFocus
        >
          <>
            <UpdateForm handleCloseEdit={handleCloseEdit} />
          </>
        </Modal>

        <Navbar />

        <Grid
          container
          spacing={3}
          justify="flex-start"
          alignItems="flex-start"
          className={classes2.grid}
        >
          <Grid item xs={6} className={classes2.gridItem}>
            <UserInfo
              username={data.user.username}
              description={data.user.description}
              country={data.user.country}
              photo={data.user.photo}
            />

            {isAuth() && isAuth().username !== data.user.username ? null : (
              <>
                <Button
                  onClick={() => setOpenModelEdit(true)}

                  className={`${classes.primaryButton} ${classes2.various}`}
                >
                  UPDATE PROFILE
                </Button>

                <Button
                  className={`${classes.primaryButton} ${classes2.various}`}
                  onClick={() => setOpenModelTask(true)}

                  disabled={data.user.progress <= 2}
                >
                  CREATE TASK
                </Button>
                <Typography color="secondary" variant="body2">
                  Reach 15% to unlock this action
                </Typography>
              </>
            )}
          </Grid>
          <Grid item xs={6} className={classes2.gridItem2}>
            <Grid item xs={12}>
              <ProgressBar progressValue={data.user.progress} />
            </Grid>
            <Grid item xs={12} className={classes2.various}>
              <CurrentAdminTasks
                user={data.user}
                progressValue={data.user.progress}
                mutate={mutate}
              />
            </Grid>
            <Grid item xs={12} className={classes2.various}>
              <Typography color="primary" variant="body2">
                Accepted Tasks
              </Typography>
              {renderAcceptedTask.length > 0 ? (
                renderAcceptedTask
              ) : (
                  <div>
                    <Alert
                      severity="info"
                      className={classes2.alert}
                    >
                      There are no tasks in course, you can accept tasks from
                      other users!
                  </Alert>
                  </div>
                )}
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes2.various}>
            <TasksNavigation handleShowTasks={handleShowTasks} />
          </Grid>
          {showTasks === 2 ? (
            <Grid item xs={12} className={classes2.various}>
              <UserTasksCreated />
            </Grid>
          ) : showTasks === 1 ? (
            <>
              <Grid item xs={12} className={classes2.various}>
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
                  <Grid item xs={12} className={classes2.various}>
                    <UserTasksCreated />
                  </Grid>

                  <Grid item xs={12} className={classes2.various}>
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

export const getServerSideProps: GetServerSideProps = async (context) => ({
  props: { params: context.params },
});

export default Profile;
