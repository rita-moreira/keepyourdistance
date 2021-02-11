import React from "react";

// components
import NavBar from "../components/navbar/NavBar";
import MainContent from "../components/MainContent";
import ListTasksCreated from "../components/tasks/ListTasksCreated";
import ListCompletedTasks from "../components/tasks/ListCompletedTasks";
// custom style
import { useStyles } from "../theme/theme";

import { isAuth } from "../actions/cookies";

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.backgroundColor}>
      <NavBar />
      {!isAuth() ? (
        <div>
          <MainContent />
        </div>
      ) : (
        <div>
          <ListTasksCreated />
          <ListCompletedTasks />
        </div>
      )}
    </div>
  );
};
export default Home;
