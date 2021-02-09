import React, { useState } from "react";

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
// theme
import { useStyles } from "../../../theme/theme";

// tasks
import { AdminTasks } from "../../../stores/adminTaks";
const CurrentAdminTasks: React.FC = () => {
  const classes = useStyles();
  const [currentTask, setCurrentTask] = useState(0);

  return (
    <div>
      <Typography color="primary" variant="body2">
        Current Tasks
      </Typography>

      <Accordion className={classes.backgroundColor}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <Button color="primary">
            <CheckCircleOutlineIcon />
          </Button>

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
  );
};

export default CurrentAdminTasks;