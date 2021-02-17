import React, { memo } from 'react';
import { useRouter } from 'next/router';
import cx from 'clsx';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import BrandCardHeader from '@mui-treasury/components/cardHeader/brand';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { removeTask } from '../../../actions/task';
import { useFetch } from '../../../actions/global';
import { API_BASE_URL } from '../../../config';
import { getCookie } from '../../../actions/cookies';

const useStylesPage = makeStyles((theme: Theme) => createStyles({
  card: {
    display: 'inline-block',
    width: '25%',
    margin: '5px',
    minHeight: '100px',
  },
  cardContent: {
    textAlign: 'left', width: '100%'
  },
  root: {
    width: '100%',
    textAlign: 'center',
  },
  alertRoot: {
    padding: '10px'
  },
  alert: {
    color: 'white', backgroundColor: '#EF7D1D'
  }

}));

interface Task {
  _id: string;
  title: string;
  description: string;
  date: string;
  postedBy: { _id: string; username: string; photo: string; country: string };
}

const UserTasksCreated: React.FC = () => {
  const classes2 = useStylesPage();
  const shadowStyles = useLightTopShadowStyles();
  const router = useRouter();
  const { data, error, mutate } = useFetch<Task[]>(`${API_BASE_URL}/api/tasks`);
  if (error) return <>failed to load</>;
  if (!data) return <>loading...</>;
  mutate();

  const handleUserTaskRemove = async (title: string) => {
    const token = getCookie('token');
    const response = await removeTask(title, token)
    if (response.error) {
      console.log(response.error);
    } else {
      console.log(response.message);
      mutate();
    }
  };

  const renderTasks = data
    ?.filter((user: Task) => user.postedBy.username === router.query.username)
    .map((task: Task) => (
      <React.Fragment key={task._id}>
        <Card
          className={`${cx(shadowStyles.root)} ${classes2.card}`}

        >
          <BrandCardHeader image={task.postedBy.photo} extra={task.title} />
          <CardContent className={classes2.cardContent}>
            <TextInfoContent
              overline={
                `${task.postedBy.username
                } • ${task.postedBy.country
                } • ${task.date}`
              }
              heading={task.date}
              body={task.description}
            />
          </CardContent>
          <Button
            onClick={() => handleUserTaskRemove(task.title)}
            color="secondary"
          >
            Delete
          </Button>
        </Card>
      </React.Fragment>
    ));

  if (renderTasks.length > 0) {
    return (
      <div
        className={classes2.root}
      >
        {renderTasks}
      </div>
    );
  }
  return (
    <div className={classes2.alertRoot}>
      <Alert
        variant="filled"
        severity="info"
        className={classes2.alert}
      >
        There are currently no tasks created. Start creating!!!!!
      </Alert>
    </div>
  );
};
export default memo(UserTasksCreated);
