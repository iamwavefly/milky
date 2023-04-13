import { Box } from "@mui/material";
import React from "react";

export default function ColorBop({ color }: { color: string }) {
  return (
    <Box width="10px" height="10px" borderRadius="100px" bgcolor={color}></Box>
  );
}
