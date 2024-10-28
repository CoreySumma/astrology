import React from "react";
import { LinearProgress, Stack } from "@mui/material";
import "./LoadingState.css";

function LoadingState() {
  return (
    <div
      className="loading-background"
      style={{
        backgroundImage: "url('/images/static_space.png')",
      }}
    >
      <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
        <LinearProgress color="inherit" />
      </Stack>
    </div>
  );
}

export default LoadingState;
