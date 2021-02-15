import React, { useState } from "react";
import { useFetch } from "../../actions/userTasks";
import { API } from "../../config";

import { Divider, Paper, Typography } from "@material-ui/core";

// components
import CompletedUserTasks from "../user/tasks/CompletedUserTasks";
import PaginationPage from "./PaginationPage";

// theme
import { useStyles } from "../../theme/theme";
const ListCompletedUserTasks: React.FC = () => {
  const classes = useStyles();
  const { data, error, mutate } = useFetch(`${API}/api/userTasks`);
  const [currentPage, setcurrentPage] = useState(1);
  const [tasksPerPage] = useState(6);
  if (error) {
    return <div>failed to load</div>;
  }
  if (!data) {
    return null;
  }

  // mostrar so as que foram partilhadas e que estao completadas
  const showTasks = Object.values(data).filter((item: any) => {
    return item.share && item.completed;
  });

  // get current
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = showTasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <div>
      <Paper
        elevation={3}
        style={{
          padding: "10px",
          margin: "20px",
          minHeight: "calc(100vh - 300px )",
          textAlign: "center",
        }}
        className={classes.backgroundColor}
      >
        <Typography color="primary" variant="h4" style={{ padding: "20px" }}>
          COMPLETED CUSTOM TASKS
        </Typography>
        <Divider variant="middle" />
        <div
          style={{
            minHeight: "calc(100vh - 400px)",
            marginTop: "50px",
          }}
        >
          <CompletedUserTasks userTasks={currentTasks} mutate={mutate} />
        </div>
        <PaginationPage
          tasksPerPage={tasksPerPage}
          totalTasks={showTasks.length}
          currentPage={currentPage}
          setPage={setcurrentPage}
        />
      </Paper>
    </div>
  );
};

export default ListCompletedUserTasks;
