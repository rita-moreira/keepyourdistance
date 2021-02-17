import React from "react";

import { createStyles, Link, makeStyles } from "@material-ui/core";


const useStylesPage = makeStyles((theme) => createStyles({
  font: {
    fontFamily: "GothamPro-Bold"
  },

}));
const Logo: React.FC = () => {
  const classes = useStylesPage()
  return (
    <React.Fragment>
      <Link
        color="primary"
        underline="none"
        href="/"
        className={classes.font}
      >
        KEEP YOUR DISTANCE
      </Link>
    </React.Fragment>
  );
};

export default Logo;
