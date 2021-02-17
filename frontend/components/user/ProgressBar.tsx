import React, { useEffect, useState, memo } from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';

const ProgressBar: React.FC<any> = ({ progressValue }: any) => {
  const [value, setvalue] = useState<number>(progressValue);

  useEffect(() => {
    setvalue(progressValue);
  }, [progressValue]);
  // progress 0 a 17
  // 17 tasks
  return (
    <>
      <Typography color="primary" variant="body2">
        Progress Bar (
        {Math.round((value * 100) / 16)}
        %)
      </Typography>
      <LinearProgress
        color="secondary"
        variant="determinate"
        value={Math.round((value * 100) / 16)}
      />
    </>
  );
};

export default memo(ProgressBar);
