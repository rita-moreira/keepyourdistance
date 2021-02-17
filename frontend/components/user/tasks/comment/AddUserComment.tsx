import React, { useState } from 'react';
import { createStyles, Input, makeStyles, Theme } from '@material-ui/core';
import { useStyles } from '../../../../theme/theme';
import { addComment } from '../../../../actions/userTasks';
import { getCookie } from '../../../../actions/cookies';
import { AddCommentProps } from '../../../../interface/index';

const useStylesPage = makeStyles((theme: Theme) => createStyles({
  input: {
    padding: '5px',
    fontFamily: 'GothamPro-Bold',
    fontSize: '12px',
  },
  button: {
    transform: 'scale(0.8)'
  }
}));


const AddComment: React.FC<AddCommentProps> = ({ id, mutate }: AddCommentProps) => {
  const classes = useStyles();
  const classes2 = useStylesPage();
  const [comment, setComment] = useState('');
  const token = getCookie('token');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await addComment({ comment, task_id: id }, token)
    if (response.error) {
      // console.log(data.error);
    } else {
      // console.log(data.message);
      setComment('');
    }
    mutate();

  };
  // handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  return (
    <>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Input
          className={classes2.input}
          onChange={handleChange}
          placeholder="Write a comment"
          inputProps={{ 'aria-label': 'description' }}
        />
        <button
          type="submit"
          className={`${classes.primaryButton} ${classes2.button}`}
          disabled={comment === ''}
        >
          ADD
        </button>
      </form>
    </>
  );
};

export default AddComment;
