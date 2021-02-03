import React from "react";

// material ui
import { Link } from "@material-ui/core";

const Logo: React.FC = () => {
  return (
    <Link
      color="primary"
      underline="none"
      href="/"
      style={{ fontFamily: "GothamPro-Bold" }}
    >
      KEEP YOUR DISTANCE
    </Link>
  );
};

export default Logo;
