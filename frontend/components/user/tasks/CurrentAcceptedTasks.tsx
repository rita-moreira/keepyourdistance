import React from "react";

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

interface TaskProps {
  title: string;
  description: string;
  postedBy: string;
}
const CurrentAcceptedTasks: React.FC<TaskProps> = ({
  title,
  description,
  postedBy,
}: {
  title: string;
  description: string;
  postedBy: string;
}) => {
  const classes = useStyles();

  return (
    <div>
      <Typography color="primary" variant="body2">
        Accepted Tasks
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
            {title.toUpperCase()}
          </Typography>
          <Typography
            color="primary"
            style={{
              fontFamily: "GothamPro-Bold",
              marginTop: "10px",
            }}
          >
            Created by: {postedBy.toUpperCase()}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="primary" style={{ width: "100%" }}>
            {description}
          </Typography>
          <Button
            className={classes.primaryButton}
            style={{ textAlign: "right" }}
          >
            Remove
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CurrentAcceptedTasks;
