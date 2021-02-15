import React, { useState } from "react";

// material ui
import { Input } from "@material-ui/core";

// theme
import { useStyles } from "../../../../theme/theme";

// actions
import { addComment } from "../../../../actions/adminTask";
import { getCookie } from "../../../../actions/cookies";
const AddComment: React.FC<any> = ({ id, mutate }: any) => {
  const classes = useStyles();
  const [comment, setComment] = useState("");
  const token = getCookie("token");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addComment({ comment: comment, task_id: id }, token).then((data: any) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data.message);
        setComment("");
      }
      mutate();
    });
  };
  // handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  return (
    <div>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Input
          style={{
            padding: "5px",
            fontFamily: "GothamPro-Bold",
            fontSize: "12px",
          }}
          onChange={handleChange}
          placeholder="Write a comment"
          inputProps={{ "aria-label": "description" }}
        />
        <button
          type="submit"
          className={classes.primaryButton}
          style={{ transform: "scale(0.8)" }}
          disabled={comment === ""}
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddComment;
