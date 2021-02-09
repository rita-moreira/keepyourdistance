import React from "react";
import { useRouter } from "next/router";
import cx from "clsx";
// material ui
import Alert from "@material-ui/lab/Alert";
// mui treasury
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import BrandCardHeader from "@mui-treasury/components/cardHeader/brand";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useLightTopShadowStyles } from "@mui-treasury/styles/shadow/lightTop";

// actions
import { useFetch } from "../../../actions/task";
import { API } from "../../../config";

interface Task {
  _id: string;
  title: string;
  description: string;
  date: string;
  postedBy: { _id: string; username: string; photo: string; country: string };
}

const UserTasksCreated: React.FC = () => {
  const shadowStyles = useLightTopShadowStyles();
  const router = useRouter();
  const { data, error, mutate } = useFetch<Task[]>(`${API}/api/tasks`);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  mutate();
  const renderTasks = data
    ?.filter((user: Task) => {
      return user.postedBy.username === router.query.username;
    })
    .map((task: Task) => {
      return (
        <React.Fragment key={task._id}>
          <Card
            className={cx(shadowStyles.root)}
            style={{
              display: "inline-block",
              width: "25%",
              margin: "5px",
              minHeight: "100px",
            }}
          >
            <BrandCardHeader image={task.postedBy.photo} extra={task.title} />
            <CardContent style={{ textAlign: "left", width: "100%" }}>
              <TextInfoContent
                overline={
                  task.postedBy.username +
                  " • " +
                  task.postedBy.country +
                  " • " +
                  task.date
                }
                heading={task.date}
                body={task.description}
              />
            </CardContent>
          </Card>
        </React.Fragment>
      );
    });

  if (renderTasks.length > 0) {
    return (
      <div
        style={{
          width: "100%",
          textAlign: "center",
        }}
      >
        {renderTasks}
      </div>
    );
  } else {
    return (
      <div>
        <Alert severity="info">
          There are currently no tasks created. Start creating!!!!!
        </Alert>
      </div>
    );
  }
};
export default UserTasksCreated;