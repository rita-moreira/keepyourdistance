import { createStyles, Divider, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useFetch } from "../../actions/global";
import { API_BASE_URL } from "../../config";

import CompletedAdminTasks from "../user/tasks/CompletedAdminTasks";
import PaginationPage from "./PaginationPage";

import { useStyles } from "../../theme/theme";
import { StateShowCompletedTasks } from '../../interface/index';

const useStylesPage = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: "10px",
    margin: "20px",
    minHeight: "calc(100vh - 300px )",
    textAlign: "center",
  },
  title: {
    padding: "20px"
  },
  completedTasks: {
    minHeight: "calc(100vh - 400px)",
    marginTop: "50px",
  }

}));


const ListCompletedTasks: React.FC = () => {
  const classes = useStyles();
  const classes2 = useStylesPage();
  const { data, error, mutate } = useFetch(`${API_BASE_URL}/api/adminTasks`);
  const [currentPage, setcurrentPage] = useState(1);
  const [tasksPerPage] = useState(6);

  if (error) {
    return <div>failed to load</div>;
  }
  if (!data) {
    return null;
  }


  const showTasks = data.filter((item: StateShowCompletedTasks) => {
    return item.share
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = showTasks.slice(indexOfFirstTask, indexOfLastTask);
  return (
    <div className={classes2.root}>
      <Paper
        elevation={3}
        className={classes.backgroundColor}
      >
        <Typography color="primary" variant="h4" className={classes2.title}>
          COMPLETED TASKS
        </Typography>
        <Divider variant="middle" />
        <div
          className={classes2.completedTasks}
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
