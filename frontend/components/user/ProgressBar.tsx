import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Typography } from "@material-ui/core";

const ProgressBar: React.FC = () => {
  return (
    <div>
      <Typography color="primary" variant="body2">
        Progress Bar
      </Typography>
      <LinearProgress color="primary" variant="determinate" value={40} />
    </div>
  );
};

export default ProgressBar;
