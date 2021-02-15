import { Divider, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useFetch } from "../../actions/adminTask";
import { API } from "../../config";

// components
import CompletedAdminTasks from "../user/tasks/CompletedAdminTasks";
import PaginationPage from "./PaginationPage";

// theme
import { useStyles } from "../../theme/theme";
const ListCompletedTasks: React.FC = () => {
  const classes = useStyles();
  const { data, error, mutate } = useFetch(`${API}/api/adminTasks`);
  const [currentPage, setcurrentPage] = useState(1);
  const [tasksPerPage] = useState(6);

  if (error) {
    return <div>failed to load</div>;
  }
  if (!data) {
    return null;
  }

  // mostrar so as que foram partilhadas
  const showTasks = Object.values(data).filter((item: any) => {
    return item.share;
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
          COMPLETED TASKS
        </Typography>
        <Divider variant="middle" />
        <div
          style={{
            minHeight: "calc(100vh - 400px)",
            marginTop: "50px",
          }}
        >
          <CompletedAdminTasks admintasks={currentTasks} mutate={mutate} />
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

export default ListCompletedTasks;
