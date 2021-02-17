import { Paper, Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';

import { useStyles } from '../../../theme/theme';

interface TasksNavigationProps {
  handleShowTasks: (value: number) => void
}

const TasksNavigation: React.FC<TasksNavigationProps> = ({ handleShowTasks }: TasksNavigationProps) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    handleShowTasks(newValue);
  };

  return (
    <>
      <Paper
        square
        elevation={3}
        className={classes.backgroundColor}
        style={{
          width: '50%',
          margin: 'auto',
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
    </>
  );
};

export default TasksNavigation;
