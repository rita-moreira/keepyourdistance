import React, { memo } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStylesPage = makeStyles((theme: Theme) => createStyles({
  AccordionDetails: {
    width: '100%'
  },
  AccordionDetailsDiv1: {
    float: 'left'
  },
  Avatar: {
    width: '40px', height: '40px'
  },
  AccordionDetailsDiv2: {
    float: 'right', width: '100%', marginLeft: '5px'
  },
  Typography: {
    color: "black"
  },
  root: {
    marginTop: '10px'
  }
}));

interface CommentsProps {
  _id?: string;
  postedBy?: {
    _id: string;
    username: string;
    photo: string;
  }
  addedBy?: {
    _id: string;
    username: string;
    photo: string;
  }
  text?: string;
  [keys: string]: any;

}

const Comments: React.FC<CommentsProps> = ({ comments }: CommentsProps) => {
  const classes = useStylesPage();
  const renderComments = comments.map((comment: CommentsProps) => (
    <AccordionDetails key={comment._id} className={classes.AccordionDetails}>
      <div className={classes.AccordionDetailsDiv1}>
        <Avatar
          className={classes.Avatar}
          src={
            comment.postedBy?.photo
              ? comment.postedBy?.photo
              : comment.addedBy?.photo
          }
        />
      </div>
      <div className={classes.AccordionDetailsDiv2}>
        <Typography variant="body2">
          {comment.postedBy?.username
            ? comment.postedBy?.username
            : comment.addedBy?.username}
        </Typography>
        <Typography variant="body1" className={classes.Typography}>
          {comment.text}
        </Typography>
      </div>
    </AccordionDetails>
  ));
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography color="secondary" variant="body2">
            Show comments (
            {renderComments.length}
            )
          </Typography>
        </AccordionSummary>
        {renderComments}
      </Accordion>
    </div>
  );
};

export default memo(Comments);
