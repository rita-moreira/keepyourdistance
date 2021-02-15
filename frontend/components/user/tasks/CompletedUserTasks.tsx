import React from "react";
import { Avatar, Card, CardContent, CardHeader, Link } from "@material-ui/core";

// components
import Loading from "../../individual/Loading";
import { Alert } from "@material-ui/lab";
import AddUserComment from "./comment/AddUserComment";
import Comments from "./comment/Comments";

interface CompletedUserTasksProps {
  userTasks: any;
  mutate: () => void;
}
const CompletedUserTasks: React.FC<CompletedUserTasksProps> = ({
  userTasks,
  mutate,
}: CompletedUserTasksProps) => {
  if (!userTasks) {
    return <Loading />;
  }
  const completedUserTasks = userTasks.filter((item: any) => {
    return item.completed;
  });
  const currentTime = Date.now();
  const tasks = completedUserTasks.map((task: any) => {
    const diff: number = currentTime - Date.parse(task.updatedAt);
    let date: string;
    if (diff > 86400e3) {
      date = Math.floor(diff / 86400e3) + " days ago";
    } else if (diff > 3600e3 && diff < 86400e3) {
      date = Math.floor(diff / 3600e3) + " hours ago";
    } else if (diff > 60e3 && diff < 3600e3) {
      date = Math.floor(diff / 60e3) + " minutes ago";
    } else {
      date = Math.floor(diff / 1e3) + " seconds ago";
    }
    return (
      <div
        key={task._id}
        style={{
          padding: "10px",
          width: "45%",
          display: "inline-block",
          textAlign: "left",
        }}
      >
        <Card>
          <div style={{ float: "left" }}>
            <CardHeader
              avatar={
                <Avatar
                  sizes="small"
                  aria-label="recipe"
                  src={task.acceptedBy.photo}
                  alt="profile photo"
                />
              }
              title={"TASK: " + task.title}
              subheader={date}
            />
          </div>
          <div>
            <CardHeader
              title={
                <Link
                  href={`/user/${task.postedBy.username}`}
                  underline="always"
                  variant="body2"
                  color="textSecondary"
                >{`Created by: ${task.postedBy.username}`}</Link>
              }
              avatar={
                <Avatar
                  style={{ width: "40px", height: "40px" }}
                  aria-label="recipe"
                  src={task.postedBy.photo}
                  alt="profile photo"
                />
              }
            />
          </div>

          <CardContent>
            <Link
              href={`/user/${task.acceptedBy.username}`}
              underline="always"
              variant="body2"
              color="textSecondary"
            >
              {task.acceptedBy.username}: {task.comment}
            </Link>
          </CardContent>
          <AddUserComment id={task._id} mutate={mutate} />
          <Comments comments={task.comments} mutate={mutate} />
        </Card>
      </div>
    );
  });
  return (
    <div>
      <div style={{ textAlign: "center", padding: "10px" }}>
        {tasks.length > 0 ? (
          tasks
        ) : (
          <Alert
            variant="filled"
            severity="info"
            style={{ color: "white", backgroundColor: "#EF7D1D" }}
          >
            There are currently no tasks completed from other users.
          </Alert>
        )}
      </div>
    </div>
  );
};

export default CompletedUserTasks;
