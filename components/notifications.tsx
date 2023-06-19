import { Box, Stack, Typography } from "@mui/material";
import React from "react";

export default function Notifications() {
  return (
    <Box width="344px" minHeight="462px">
      {/* header */}
      <Stack
        height="44px"
        boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)"
        borderBottom="1px solid #F3F3F9"
        padding="0 24px"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography fontWeight={500} fontSize="14px">
          Notifications
        </Typography>
        <Typography fontSize="10px" color="#2E3192" sx={{ cursor: "pointer" }}>
          Mark all as read
        </Typography>
      </Stack>
      {/* content */}
      <Stack padding="24px"></Stack>
    </Box>
  );
}
