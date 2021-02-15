import React from "react";
import { Avatar, Card, CardContent, CardHeader, Link } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

// components
import AddComment from "./comment/AddComment";
import Comments from "./comment/Comments";

const CompletedAdminTasks: React.FC<any> = ({ admintasks, mutate }: any) => {
  const currentTime = Date.now();
  const completedAdminTasks = admintasks.map((task: any) => {
    const diff: number = currentTime - Date.parse(task.createdAt);
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
          <CardHeader
            avatar={
              <Avatar
                style={{ width: "40px", height: "40px" }}
                src={task.completedBy.photo}
                alt="profile photo"
              />
            }
            title={"TASK: " + task.title}
            subheader={date}
          />

          <CardContent>
            <Link
              href={`/user/${task.completedBy.username}`}
              underline="always"
              variant="body2"
              color="textSecondary"
            >
              {task.completedBy.username}: {task.comment}
            </Link>
          </CardContent>
          <AddComment id={task._id} mutate={mutate} />
          <Comments comments={task.comments} mutate={mutate} />
        </Card>
      </div>
    );
  });
  return (
    <div style={{ textAlign: "center", padding: "10px" }}>
      {completedAdminTasks.length > 0 ? (
        completedAdminTasks
      ) : (
        <Alert
          variant="filled"
          severity="info"
          style={{ color: "white", backgroundColor: "#EF7D1D" }}
        >
          There are currently no mandatory tasks completed.
        </Alert>
      )}
    </div>
  );
};

export default CompletedAdminTasks;
