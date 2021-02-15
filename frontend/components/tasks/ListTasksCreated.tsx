import React, { useState } from "react";
// https://mui-treasury.com/components/card/
// material ui
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
} from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

// actions
import { useFetch } from "../../actions/task";
import { isAuth, getCookie } from "../../actions/cookies";
import { API } from "../../config";
import { acceptTask } from "../../actions/userTasks";

// components
import Loading from "../individual/Loading";
import { TransitionProps } from "@material-ui/core/transitions";
import { AlertTitle } from "@material-ui/lab";
import PaginationPage from "./PaginationPage";

// theme
import { useStyles } from "../../theme/theme";

interface Task {
  _id: string;
  title: string;
  description: string;

  date: string;
  postedBy: { _id: string; username: string; photo: string; country: string };
}

const StyledTooltip = withStyles({
  tooltip: {
    backgroundColor: "rgba(0,0,0,0.72)",
    color: "#fff",
  },
})(Tooltip);

const useBasicProfileStyles = makeStyles(({ palette }) => ({
  avatar: {
    backgroundColor: "#495869",
  },
  overline: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "black",
    textAlign: "left",
    width: "100%",
    marginTop: "2px",
  },
  name: {
    fontSize: 14,
    fontWeight: 500,
    color: "#495869",
    textAlign: "left",
    width: "100%",
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
    <div style={{ padding: "10px" }}>
      <div style={{ float: "left", marginRight: "10px" }}>
        <Avatar
          className={styles.avatar}
          src={photo}
          alt="profile photo"
          style={{ width: "40px", height: "40px" }}
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
    fontSize: "1.25rem",
    color: "#122740",
    textAlign: "left",
    width: "100%",
  },
  subheader: {
    fontSize: "14px",
    color: "#495869",
    textAlign: "left",
    width: "80%",
    marginTop: "10px",
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
  handleAcceptTask: any;
  _id: string;
}) => {
  const styles = useCardHeaderStyles();

  return (
    <div style={{ padding: "10px", width: "90%" }}>
      <div style={{ float: "left" }}>
        <Typography className={styles.title}>
          <b>{title}</b>
        </Typography>
        <Typography className={styles.subheader}>{description}</Typography>
      </div>
      <div style={{ float: "right", width: "10%" }}>
        <StyledTooltip title={"Accept task"}>
          <IconButton onClick={() => handleAcceptTask(_id)}>
            <AddIcon />
          </IconButton>
        </StyledTooltip>
      </div>
    </div>
  );
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ListTasksCreated: React.FC = () => {
  const classes = useStyles();
  const { data, error } = useFetch<Task[]>(`${API}/api/tasks`);
  const [message, setMessage] = useState(null);
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

  const handleAcceptTask = (id: string) => {
    const token = getCookie("token");

    acceptTask({ _id: id }, token).then((data: any) => {
      if (data.error) {
        setMessage({ type: "error", message: data.error });
        handleClickOpen();
      } else {
        setMessage({ type: "success", message: data.message });
        handleClickOpen();
      }
    });
  };

  const renderTasks = data
    ?.filter((user: Task) => {
      return user.postedBy.username !== isAuth().username;
    })
    .map((task: Task) => {
      return (
        <div
          key={task._id}
          style={{
            display: "inline-block",
            width: "25%",
            padding: "10px",
          }}
        >
          <Paper>
            <Grid container spacing={4} justify={"center"} key={task._id}>
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
      );
    });

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
            <Alert severity={message.type}>
              <AlertTitle>{message.type.toUpperCase()}</AlertTitle>
              {message.message}
            </Alert>
          </Dialog>
        ) : null}
        <div style={{ width: "100%", textAlign: "center" }}>
          <Paper
            elevation={3}
            style={{
              padding: "10px",
              margin: "20px",
              minHeight: "100px",
              textAlign: "center",
            }}
            className={classes.backgroundColor}
          >
            <Typography
              color="primary"
              variant="h4"
              style={{ padding: "20px" }}
            >
              TASKS
            </Typography>
            <Divider variant="middle" />
            <div
              style={{
                minHeight: "calc(100vh - 500px)",
                marginTop: "50px",
                width: "100%",
              }}
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
      </div>
    );
  } else {
    return (
      <div>
        <Alert
          severity="info"
          style={{ color: "white", backgroundColor: "#EF7D1D" }}
        >
          There are currently no tasks created by other users. Please check
          Later!!!!!
        </Alert>
      </div>
    );
  }
};
export default ListTasksCreated;
