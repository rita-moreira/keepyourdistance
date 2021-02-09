import React from "react";
// https://mui-treasury.com/components/card/
// material ui
import {
  Avatar,
  Typography,
  makeStyles,
  withStyles,
  Link,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { Row, Column, Item } from "@mui-treasury/components/flex";
import { useSizedIconButtonStyles } from "@mui-treasury/styles/iconButton/sized";

// actions
import { useFetch } from "../../actions/task";
import { isAuth, getCookie } from "../../actions/cookies";
import { API } from "../../config";
import { acceptTask } from "../../actions/userTasks";

interface Task {
  _id: string;
  title: string;
  description: string;

  date: string;
  postedBy: { _id: string; username: string; photo: string; country: string };
}

const StyledTooltip = withStyles({
  tooltip: {
    marginTop: "0.2rem",
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
    color: "#8D9CAD",
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
    <Row>
      <Item>
        <Avatar className={styles.avatar} src={photo} />
      </Item>
      <Item position={"middle"} pl={{ sm: 0.5, lg: 0.5 }}>
        <Link underline="always" href={`profile/${username}`}>
          <Typography className={styles.name}>{username}</Typography>
        </Link>
        <Typography className={styles.overline}>{date}</Typography>
      </Item>
    </Row>
  );
};

const useCardHeaderStyles = makeStyles(() => ({
  root: { paddingBottom: 0 },
  title: {
    fontSize: "1.25rem",
    color: "#122740",
    textAlign: "left",
    width: "100%",
  },
  subheader: {
    fontSize: "0.875rem",
    color: "#495869",
    textAlign: "left",
    width: "100%",
    marginTop: "20px",
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
  const iconBtnStyles = useSizedIconButtonStyles({ padding: 8, childSize: 20 });
  return (
    <Row>
      <Item position={"middle"}>
        <Typography className={styles.title}>
          <b>{title}</b>
        </Typography>
        <Typography className={styles.subheader}>{description}</Typography>
      </Item>
      <Item position={"right"} mr={-0.5}>
        <StyledTooltip title={"Accept task"}>
          <IconButton
            classes={iconBtnStyles}
            onClick={() => handleAcceptTask(_id)}
          >
            <AddIcon />
          </IconButton>
        </StyledTooltip>
      </Item>
    </Row>
  );
};

const useStyles = makeStyles(() => ({
  card: {
    border: "2px solid",
    borderColor: "#E7EDF3",
    borderRadius: 16,
    minWidth: "250px",
    transition: "0.4s",
    backgroundColor: "white",
    "&:hover": {
      borderColor: "#5B9FED",
    },
  },
}));

const ListTasksCreated: React.FC = () => {
  const styles = useStyles();
  const gap = { xs: 1, sm: 1.5, lg: 2 };
  const { data, error } = useFetch<Task[]>(`${API}/api/tasks`);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const handleAcceptTask = (id: string) => {
    const token = getCookie("token");
    acceptTask({ _id: id }, token).then((data: any) => {
      if (data.error) {
        alert(data.error);
      }
      alert(data.message);
    });
  };

  const renderTasks = data
    ?.filter((user: Task) => {
      return user.postedBy.username !== isAuth().username;
    })
    .map((task: Task) => {
      return (
        <Grid
          container
          spacing={4}
          justify={"center"}
          key={task._id}
          style={{ display: "inline-block", width: "25%", padding: "5px" }}
        >
          <Grid item xs={12} sm={4} md={3}>
            <Column
              className={styles.card}
              p={{ xs: 0.5, sm: 0.75, lg: 1 }}
              gap={gap}
            >
              <CardHeader
                title={task.title}
                description={task.description}
                handleAcceptTask={handleAcceptTask}
                _id={task._id}
              />
              <BasicProfile
                username={task.postedBy.username}
                photo={task.postedBy.photo}
                date={task.date}
              />
            </Column>
          </Grid>
        </Grid>
      );
    });

  if (renderTasks.length > 0) {
    return (
      <div style={{ width: "100%", textAlign: "center" }}>{renderTasks}</div>
    );
  } else {
    return (
      <div>
        <Alert severity="info">
          There are currently no tasks created by other users. Please check
          Later!!!!!
        </Alert>
      </div>
    );
  }
};
export default ListTasksCreated;
