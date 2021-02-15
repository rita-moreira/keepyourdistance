import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// interface CommentsProps {
//   _id: string;
//   postedBy: string;
//   text: string;
// }
const Comments: React.FC<any> = ({ comments }: any) => {
  const renderComments = comments.map((comment: any) => {
    return (
      <AccordionDetails key={comment._id} style={{ width: "100%" }}>
        <div style={{ float: "left" }}>
          <Avatar
            style={{ width: "40px", height: "40px" }}
            src={
              comment.postedBy?.photo
                ? comment.postedBy.photo
                : comment.addedBy.photo
            }
          />
        </div>
        <div style={{ float: "right", width: "100%", marginLeft: "5px" }}>
          <Typography variant="body2">
            {comment.postedBy?.username
              ? comment.postedBy.username
              : comment.addedBy.username}
          </Typography>
          <Typography variant="body1" style={{ color: "black" }}>
            {comment.text}
          </Typography>
        </div>
      </AccordionDetails>
    );
  });
  return (
    <div style={{ marginTop: "10px" }}>
      <Accordion>
        <AccordionSummary
          // eslint-disable-next-line react/jsx-no-undef
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography color="secondary" variant="body2">
            Show comments ({renderComments.length})
          </Typography>
        </AccordionSummary>
        {renderComments}
      </Accordion>
    </div>
  );
};

export default Comments;
