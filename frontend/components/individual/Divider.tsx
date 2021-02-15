import React from "react";

// material ui
import { Paper, Typography } from "@material-ui/core";

interface DividerProps {
  title: string;
}
const Divider: React.FC<DividerProps> = ({ title }: { title: string }) => {
  return (
    <div>
      <Paper elevation={3}>ola</Paper>
    </div>
  );
};

export default Divider;
