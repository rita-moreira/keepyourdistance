import React, { memo } from 'react';
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
import { useStyles } from '../../../theme/theme';
import { removeTask } from '../../../actions/userTasks';
import { getCookie } from '../../../actions/cookies';


const useStylesPage = makeStyles((theme: Theme) => createStyles({
  title: {
    fontFamily: 'GothamPro-Bold',
    marginTop: '10px',
    textAlign: 'left',
  },
  created: {
    fontFamily: 'GothamPro-Bold',
    marginTop: '10px',
  },
  description: {
    width: '100%', textAlign: 'left'
  },
  button: {
    textAlign: 'right'
  },

}));


interface TaskProps {
  title: string;
  description: string;
  postedBy: string;
  _id: string;
  mutate: () => void;
}
const CurrentAcceptedTasks: React.FC<TaskProps> = ({
  title,
  description,
  postedBy,
  _id,
  mutate,
}: TaskProps) => {
  const classes = useStyles();
  const classes2 = useStylesPage();

  const handleUserTaskRemove = async (title: string) => {
    const token = getCookie('token');
    const response = await removeTask(title, token)
    if (response.error) {
      console.log(response.error);
    } else {
      console.log(response.message);
    }
    mutate();
  };

  return (
    <>
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
            {title.toUpperCase()}
          </Typography>
          <Typography
            color="primary"
            className={classes2.created}
          >
            Created by:
            {' '}
            {postedBy.toUpperCase()}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            color="primary"
            className={classes2.description}
          >
            {description}
          </Typography>
          <Button
            className={`${classes.primaryButton} ${classes2.button}`}
            onClick={() => handleUserTaskRemove(title)}
          >
            Remove
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default memo(CurrentAcceptedTasks);
