import { Paper, Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";

// theme
import { useStyles } from "../../../theme/theme";
const TasksNavigation: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>
      <Paper
        square
        elevation={3}
        className={classes.backgroundColor}
        style={{
          width: "50%",
          margin: "auto",
        }}
      >
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
          centered
        >
          <Tab color="primary" label="ALL" />
          <Tab color="primary" label="COMPLETED TASKS" />
          <Tab color="primary" label="TASKS CREATED" />
        </Tabs>
      </Paper>
    </React.Fragment>
  );
};

export default TasksNavigation;
