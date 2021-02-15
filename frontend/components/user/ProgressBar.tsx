import React, { useEffect, useState } from "react";

// material ui
import LinearProgress from "@material-ui/core/LinearProgress";
import { Typography } from "@material-ui/core";

const ProgressBar: React.FC<any> = ({ progressValue }: any) => {
  const [value, setvalue] = useState(progressValue);

  useEffect(() => {
    setvalue(progressValue);
  }, [progressValue]);
  // progress 0 a 17
  // 17 tasks
  return (
    <div>
      <Typography color="primary" variant="body2">
        Progress Bar ({Math.round((value * 100) / 16)}%)
      </Typography>
      <LinearProgress
        color="secondary"
        variant="determinate"
        value={Math.round((value * 100) / 16)}
      />
    </div>
  );
};

export default ProgressBar;
