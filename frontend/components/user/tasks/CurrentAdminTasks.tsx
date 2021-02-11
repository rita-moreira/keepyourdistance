import React, { useEffect, useState } from "react";

// material ui
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Modal from "@material-ui/core/Modal";
// theme
import { useStyles } from "../../../theme/theme";

// tasks
import { AdminTasks } from "../../../stores/adminTaks";

// components
import CompleteTaskModal from "./CompleteTaskModal";
import Loading from "../../individual/Loading";
const CurrentAdminTasks: React.FC<any> = ({ user, progressValue }: any) => {
  const classes = useStyles();
  const [currentTask, setCurrentTask] = useState(progressValue);
  const [openModalComplete, setOpenModelComplete] = useState(false);

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
    <div>
      <Modal open={openModalComplete} disableEnforceFocus disableAutoFocus>
        <React.Fragment>
          <CompleteTaskModal
            defaultTitle={AdminTasks[currentTask].title}
            defaultDescription={AdminTasks[currentTask].task}
            handleClose={handleClose}
            user={user}
            progressValue={progressValue}
          />
        </React.Fragment>
      </Modal>
      <Typography color="primary" variant="body2">
        Current Tasks
      </Typography>
      <div
        style={{
          display: "inline-block",
          width: "10%",
          verticalAlign: "middle",
        }}
      >
        <Button color="primary" onClick={handleCompleteAdminTask}>
          <CheckCircleOutlineIcon />
        </Button>
      </div>
      <div
        style={{
          display: "inline-block",
          width: "90%",
          verticalAlign: "middle",
        }}
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
              style={{
                fontFamily: "GothamPro-Bold",
                marginTop: "10px",
              }}
            >
              {AdminTasks[currentTask].title.toUpperCase()}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="primary" style={{ width: "100%" }}>
              {AdminTasks[currentTask].task}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default CurrentAdminTasks;
