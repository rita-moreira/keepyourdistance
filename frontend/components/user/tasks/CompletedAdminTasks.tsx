import React, { memo } from 'react';
import { Avatar, Card, CardContent, CardHeader, createStyles, Link, makeStyles, Theme } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import AddComment from './comment/AddComment';
import Comments from './comment/Comments';
import { CompletedAdminTasksProps } from '../../../interface/index';

const useStylesPage = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: '10px',
    width: '45%',
    display: 'inline-block',
    textAlign: 'left',
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

interface CompletedAdminTasksState {
  admintasks: CompletedAdminTasksProps;
  mutate: () => void;
}

const CompletedAdminTasks: React.FC<CompletedAdminTasksState> = ({ admintasks, mutate }: CompletedAdminTasksState) => {
  const classes = useStylesPage();
  const currentTime = Date.now();
  const completedAdminTasks = admintasks.map((task: CompletedAdminTasksProps) => {
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
          <CardHeader
            avatar={(
              <Avatar
                className={classes.avatar}
                src={task.completedBy.photo}
                alt="profile photo"
              />
            )}
            title={`TASK: ${task.title}`}
            subheader={date}
          />

          <CardContent>
            <Link
              href={`/user/${task.completedBy.username}`}
              underline="always"
              variant="body2"
              color="textSecondary"
            >
              {task.completedBy.username}
              :
              {task.comment}
            </Link>
          </CardContent>
          <AddComment id={task._id} mutate={mutate} />
          <Comments comments={task.comments} mutate={mutate} />
        </Card>
      </div>
    );
  });
  return (
    <div className={classes.root2}>
      {completedAdminTasks.length > 0 ? (
        completedAdminTasks
      ) : (
          <Alert
            variant="filled"
            severity="info"
            className={classes.alert}
          >
            There are currently no mandatory tasks completed.
          </Alert>
        )}
    </div>
  );
};

export default memo(CompletedAdminTasks);
