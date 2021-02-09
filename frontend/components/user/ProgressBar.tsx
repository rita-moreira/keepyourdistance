import React, { useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Typography } from "@material-ui/core";

const ProgressBar: React.FC = () => {
  const [value, setValue] = useState(40);
  return (
    <div>
      <Typography color="primary" variant="body2">
        Progress Bar ({value}%)
      </Typography>
      <LinearProgress color="primary" variant="determinate" value={value} />
    </div>
  );
};

export default ProgressBar;
