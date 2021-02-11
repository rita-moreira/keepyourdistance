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
// theme
import { useStyles } from "../../../theme/theme";

// actions
import { removeTask } from "../../../actions/userTasks";
import { getCookie } from "../../../actions/cookies";

interface TaskProps {
  title: string;
  description: string;
  postedBy: string;
  _id: string;
}
const CurrentAcceptedTasks: React.FC<TaskProps> = ({
  title,
  description,
  postedBy,
  _id,
}: {
  title: string;
  description: string;
  postedBy: string;
  _id: string;
}) => {
  const classes = useStyles();

  const handleUserTaskRemove = (title: string) => {
    const token = getCookie("token");
    removeTask(title, token).then((data: any) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data.message);
      }
    });
  };

  return (
    <div>
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
              textAlign: "left",
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
          <Typography
            color="primary"
            style={{ width: "100%", textAlign: "left" }}
          >
            {description}
          </Typography>
          <Button
            className={classes.primaryButton}
            style={{ textAlign: "right" }}
            onClick={() => handleUserTaskRemove(title)}
          >
            Remove
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CurrentAcceptedTasks;
