import React, { useState } from "react";

// material ui
import LinearProgress from "@material-ui/core/LinearProgress";
import { Typography } from "@material-ui/core";

const ProgressBar: React.FC<any> = ({ progressValue }: any) => {
  const [value] = useState(progressValue);
  // progress 0 a 17
  // 17 tasks
  return (
    <div>
      <Typography color="primary" variant="body2">
        Progress Bar ({Math.round((value * 100) / 17)}%)
      </Typography>
      <LinearProgress
        color="primary"
        variant="determinate"
        value={Math.round((value * 100) / 17)}
      />
    </div>
  );
};

export default ProgressBar;
