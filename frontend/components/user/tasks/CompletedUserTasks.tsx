import React, { memo } from 'react';
import {
  Avatar, Card, CardContent, CardHeader, createStyles, Link, makeStyles, Theme,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Loading from '../../individual/Loading';
import AddUserComment from './comment/AddUserComment';
import Comments from './comment/Comments';
import { CompletedUserTasksProps } from "../../../interface/index"


const useStylesPage = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: '10px',
    width: '45%',
    display: 'inline-block',
    textAlign: 'left',
  },
  card: {
    float: 'left'
  },
  avatar: {
    width: '40px', height: '40px'
  },
  root2: {
    textAlign: 'center', padding: '10px'
  },
  alert: {
    color: 'white', backgroundColor: '#EF7D1D'
  },
}));


const CompletedUserTasks: React.FC<{ userTasks: CompletedUserTasksProps, mutate: () => void }> = ({
  userTasks,
  mutate,
}: { userTasks: CompletedUserTasksProps, mutate: () => void }) => {
  const classes = useStylesPage();
  if (!userTasks) {
    return <Loading />;
  }
  const completedUserTasks = userTasks.filter((item: CompletedUserTasksProps) => item.completed);
  const currentTime = Date.now();
  const tasks = completedUserTasks.map((task: CompletedUserTasksProps) => {
    const diff: number = currentTime - Date.parse(task.createdAt);
    let date: string;
    if (diff > 86400e3) {
      date = `${Math.floor(diff / 86400e3)} days ago`;
    } else if (diff > 3600e3 && diff < 86400e3) {
      date = `${Math.floor(diff / 3600e3)} hours ago`;
    } else if (diff > 60e3 && diff < 3600e3) {
      date = `${Math.floor(diff / 60e3)} minutes ago`;
    } else {
      date = `${Math.floor(diff / 1e3)} seconds ago`;
    }
    return (
      <div
        key={task._id}
        className={classes.root}
      >
        <Card>
          <div className={classes.card}>
            <CardHeader
              avatar={(
                <Avatar
                  sizes="small"
                  aria-label="recipe"
                  src={task.acceptedBy.photo}
                  alt="profile photo"
                />
              )}
              title={`TASK: ${task.title}`}
              subheader={date}
            />
          </div>
          <div>
            <CardHeader
              title={(
                <Link
                  href={`/user/${task.postedBy.username}`}
                  underline="always"
                  variant="body2"
                  color="textSecondary"
                >
                  {`Created by: ${task.postedBy.username}`}
                </Link>
              )}
              avatar={(
                <Avatar
                  className={classes.avatar}
                  aria-label="recipe"
                  src={task.postedBy.photo}
                  alt="profile photo"
                />
              )}
            />
          </div>

          <CardContent>
            <Link
              href={`/user/${task.acceptedBy.username}`}
              underline="always"
              variant="body2"
              color="textSecondary"
            >
              {task.acceptedBy.username}
              :
              {task.comment}
            </Link>
          </CardContent>
          <AddUserComment id={task._id} mutate={mutate} />
          <Comments comments={task.comments} mutate={mutate} />
        </Card>
      </div>
    );
  });
  return (

    <div className={classes.root2}>
      {tasks.length > 0 ? (
        tasks
      ) : (
          <Alert
            variant="filled"
            severity="info"
            className={classes.alert}
          >
            There are currently no tasks completed from other users.
          </Alert>
        )}
    </div>

  );
};

export default memo(CompletedUserTasks);
