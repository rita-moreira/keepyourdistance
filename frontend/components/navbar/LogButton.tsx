import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useStyles } from '../../theme/theme';
import { signout } from '../../actions/cookies';
import { AuthContext } from '../../contexts/AuthContext';

interface StateAuthenticate {
  _id: string;
  username: string;
  email: string;
  [key: string]: string;
}
const initialValues = {
  _id: "",
  username: "",
  email: "",
}

const LogButton: React.FC = () => {
  const { auth } = useContext(AuthContext);
  const [authenticate, setAuthenticate] = useState<StateAuthenticate>(initialValues);
  const router = useRouter();
  const classes = useStyles();

  useEffect(() => {
    setAuthenticate(auth);
  }, [auth]);

  return (
    <>
      {authenticate ? (
        <Button
          className={classes.primaryButton}
          href="/"
          onClick={() => signout(() => router.replace('/'))}
        >
          LOGOUT
        </Button>
      ) : (
          <Button className={classes.primaryButton} href="/login">
            LOGIN
          </Button>
        )}
    </>
  );
};



export default LogButton;
