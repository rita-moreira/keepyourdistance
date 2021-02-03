import React, { useContext } from "react";

// ------------ context
import { AuthContext } from "../../contexts/AuthContext";

// ------------ material ui
import { Button } from "@material-ui/core";

// custom style
import { useStyles } from "../../theme/theme";

// actions
import { signout } from "../../actions/cookies";

import Router from "next/router";

const LogButton: React.FC = () => {
  const { auth } = useContext(AuthContext);

  // custom style
  const classes = useStyles();

  // onclick={() => signout(() => Router.replace("/"))}
  return (
    <React.Fragment>
      {auth ? (
        <Button
          className={classes.primaryButton}
          onClick={() => signout(() => Router.replace("/"))}
        >
          LOGOUT
        </Button>
      ) : (
        <Button className={classes.primaryButton} href="/login">
          LOGIN
        </Button>
      )}
    </React.Fragment>
  );
};

export default LogButton;
