import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

const ScaledBar = ({ value }) => {
  return (
    <LinearProgress
      variant="determinate"
      value={value}
      sx={{
        height: 4, // Adapt to your theme
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    />
  );
};

export default ScaledBar;
