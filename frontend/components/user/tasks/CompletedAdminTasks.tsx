import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const CompletedAdminTasks: React.FC<any> = ({ admintasks }: any) => {
  console.log(admintasks);
  const currentTime = Date.now();
  const completedAdminTasks = admintasks.map((task: any) => {
    const diff: number = currentTime - Date.parse(task.createdAt);
    let date: string;
    if (diff > 60e3) {
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
            avatar={<Avatar aria-label="recipe" src={task.completedBy.photo} />}
            title={"TASK: " + task.title}
            subheader={date}
          />

          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {task.completedBy.username}: {task.comment}
            </Typography>
          </CardContent>
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
          style={{ color: "white", backgroundColor: "#D58643" }}
        >
          There are currently no tasks completed.
        </Alert>
      )}
    </div>
  );
};

export default CompletedAdminTasks;
