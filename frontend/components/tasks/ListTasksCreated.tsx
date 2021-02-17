import React, { useState } from 'react';
import {
  Avatar,
  Typography,
  makeStyles,
  withStyles,
  Link,
  Slide,
  Dialog,
  Paper,
  Divider,
  createStyles,
  Theme,
} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { TransitionProps } from '@material-ui/core/transitions';
import { AlertTitle } from '@material-ui/lab';
import { useFetch } from '../../actions/global'
import { isAuth, getCookie } from '../../actions/cookies';
import { API_BASE_URL } from '../../config';
import { acceptTask } from '../../actions/userTasks';
import Loading from '../individual/Loading';
import PaginationPage from './PaginationPage';
import { useStyles } from '../../theme/theme';

interface Task {
  _id: string;
  title: string;
  description: string;

  date: string;
  postedBy: { _id: string; username: string; photo: string; country: string };
}

const StyledTooltip = withStyles({
  tooltip: {
    backgroundColor: 'rgba(0,0,0,0.72)',
    color: '#fff',
  },
})(Tooltip);

const useBasicProfileStyles = makeStyles(({ palette }) => ({
  avatar: {
    backgroundColor: '#495869',
  },
  overline: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: 'black',
    textAlign: 'left',
    width: '100%',
    marginTop: '2px',
  },
  name: {
    fontSize: 14,
    fontWeight: 500,
    color: '#495869',
    textAlign: 'left',
    width: '100%',
  },
}));

const BasicProfile = ({
  username,
  photo,
  date,
}: {
  username: string;
  photo: string;
  date: string;
}) => {
  const styles = useBasicProfileStyles();
  return (
    <div style={{ padding: '10px' }}>
      <div style={{ float: 'left', marginRight: '10px' }}>
        <Avatar
          className={styles.avatar}
          src={photo}
          alt="profile photo"
          style={{ width: '40px', height: '40px' }}
        />
      </div>

      <Link underline="always" href={`user/${username}`}>
        <Typography className={styles.name}>{username}</Typography>
      </Link>
      <Typography className={styles.overline}>{date}</Typography>
    </div>
  );
};

const useCardHeaderStyles = makeStyles(() => ({
  title: {
    fontSize: '1.25rem',
    color: '#122740',
    textAlign: 'left',
    width: '100%',
  },
  subheader: {
    fontSize: '14px',
    color: '#495869',
    textAlign: 'left',
    width: '80%',
    marginTop: '10px',
  },
}));

const CardHeader = ({
  title,
  description,
  handleAcceptTask,
  _id,
}: {
  title: string;
  description: string;
  handleAcceptTask: (value: string) => void;
  _id: string;
}) => {
  const styles = useCardHeaderStyles();

  return (
    <div style={{ padding: '10px', width: '90%' }}>
      <div style={{ float: 'left' }}>
        <Typography className={styles.title}>
          <b>{title}</b>
        </Typography>
        <Typography className={styles.subheader}>{description}</Typography>
      </div>
      <div style={{ float: 'right', width: '10%' }}>
        <StyledTooltip title="Accept task">
          <IconButton onClick={() => handleAcceptTask(_id)}>
            <AddIcon />
          </IconButton>
        </StyledTooltip>
      </div>
    </div>
  );
};

const Transition = React.forwardRef((
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);



const ListTasksCreatedStyle = makeStyles((theme: Theme) => createStyles({
  renderTasks: {
    display: 'inline-block',
    width: '25%',
    padding: '10px',
    marginTop: '40px',
  },
  paperRoot: {
    width: '100%',
    textAlign: 'center'
  },
  paper: {
    padding: '10px',
    margin: '20px',
    minHeight: '100px',
    textAlign: 'center',
  },
  title: {
    padding: '20px'
  },
  tasks: {
    minHeight: 'calc(100vh - 500px)',
    marginTop: '50px',
    width: '100%',
  },
  alert: {
    color: 'white',
    backgroundColor: '#EF7D1D'
  }

}));


const ListTasksCreated: React.FC = () => {
  const classes = useStyles();
  const classes2 = ListTasksCreatedStyle();
  const { data, error } = useFetch<Task[]>(`${API_BASE_URL}/api/tasks`);
  const [message, setMessage] = useState({ type: "undefined", message: "" });
  const [open, setOpen] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [tasksPerPage] = useState(6);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (error) {
    return <div>failed to load</div>;
  }
  if (!data) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const handleAcceptTask = async (id: string) => {
    const token = getCookie('token');
    const response = await acceptTask({ _id: id }, token);
    if (response.error) {
      setMessage({ type: 'error', message: response.error });
      handleClickOpen();
    } else {
      setMessage({ type: 'success', message: response.message });
      handleClickOpen();
    }
  };

  const renderTasks = data
    ?.filter((user: Task) => user.postedBy.username !== isAuth().username)
    .map((task: Task) => (
      <div
        key={task._id}
        className={classes2.renderTasks}
      >
        <Paper>
          <Grid container spacing={4} justify="center" key={task._id}>
            <Grid item xs={12}>
              <CardHeader
                title={task.title}
                description={task.description}
                handleAcceptTask={handleAcceptTask}
                _id={task._id}
              />
            </Grid>
            <Grid item xs={12}>
              <BasicProfile
                username={task.postedBy.username}
                photo={task.postedBy.photo}
                date={task.date}
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
    ));

  // get current
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = renderTasks.slice(indexOfFirstTask, indexOfLastTask);

  if (renderTasks.length > 0) {
    return (
      <div>
        {message ? (
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <Alert severity={message.type === "error" ? "error" : "success"}>
              <AlertTitle>{message.type.toUpperCase()}</AlertTitle>
              {message.message}
            </Alert>
          </Dialog>
        ) : null}
        <div className={classes2.paperRoot}>
          <Paper
            elevation={3}
            className={classes.backgroundColor}
          >
            <Typography
              color="primary"
              variant="h4"
              className={classes2.title}
            >
              TASKS
            </Typography>
            <Divider variant="middle" />
            <div
              className={classes2.tasks}
            >
              {currentTasks}
            </div>
            <PaginationPage
              tasksPerPage={tasksPerPage}
              totalTasks={renderTasks.length}
              currentPage={currentPage}
              setPage={setcurrentPage}
            />
          </Paper>
        </div>
      </div >
    );
  }
  return (
    <div>
      <Alert
        severity="info"
        className={classes2.alert}
      >
        There are currently no tasks created by other users. Please check
        Later!!!!!
      </Alert>
    </div>
  );
};
export default ListTasksCreated;
