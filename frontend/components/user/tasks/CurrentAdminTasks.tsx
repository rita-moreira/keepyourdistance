import React, { useEffect, useState, memo } from 'react';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Modal from '@material-ui/core/Modal';
import { useStyles } from '../../../theme/theme';
import { AdminTasks } from '../../../fixtures/adminTaks';
import CompleteTaskModal from './CompleteTaskModal';
import Loading from '../../individual/Loading';
import { CompleteTaskUser } from "../../../interface/index"



const useStylesPage = makeStyles((theme: Theme) => createStyles({
  progress: {
    display: 'inline-block',
    width: '10%',
    verticalAlign: 'middle',
  },
  accordionRoot: {
    display: 'inline-block',
    width: '90%',
    verticalAlign: 'middle',
  },
  title: {
    fontFamily: 'GothamPro-Bold',
    marginTop: '10px',
  },
  task: {
    width: '100%'
  },

}));

interface CurrentAdminTasksState {
  progressValue: number;
  mutate: () => void;
  user: CompleteTaskUser;
}
const CurrentAdminTasks: React.FC<CurrentAdminTasksState> = ({
  user,
  progressValue,
  mutate,
}: CurrentAdminTasksState) => {

  const classes = useStyles();
  const classes2 = useStylesPage();
  const [currentTask, setCurrentTask] = useState(progressValue);
  const [openModalComplete, setOpenModelComplete] = useState(false);
  useEffect(() => {
    setCurrentTask(progressValue);
  }, [progressValue]);
  const handleClose = () => {
    setOpenModelComplete(false);
  };
  // Complete Admin Task
  const handleCompleteAdminTask = () => {
    setOpenModelComplete(true);
  };

  if (!AdminTasks) {
    return <Loading />;
  }

  return (
    <>
      <Modal open={openModalComplete} disableEnforceFocus disableAutoFocus>
        <>
          <CompleteTaskModal
            defaultTitle={AdminTasks[currentTask].title}
            defaultDescription={AdminTasks[currentTask].task}
            handleClose={handleClose}
            user={user}
            progressValue={progressValue}
            mutate={mutate}
          />
        </>
      </Modal>
      <Typography color="primary" variant="body2">
        Current Tasks
      </Typography>
      <div
        className={classes2.progress}
      >
        {progressValue <= 15 ? (
          <Button color="primary" onClick={handleCompleteAdminTask}>
            <CheckCircleOutlineIcon />
          </Button>
        ) : null}
      </div>
      <div
        className={classes2.accordionRoot}
      >
        <Accordion className={classes.backgroundColor}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <Typography
              color="primary"
              className={classes2.title}
            >
              {AdminTasks[currentTask].title.toUpperCase()}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="primary" className={classes2.task}>
              {AdminTasks[currentTask].task}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default memo(CurrentAdminTasks);
