import React from "react";
import Dashboard from "@/layouts/dashboard";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import DropdownMenu from "@/components/DropdownMenu";

export default function Index() {
  return (
    <Dashboard title="Dashboard">
      <Stack
        px="30px"
        mt="20px"
        height="40px"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography fontSize="16px" color="#2E3192">
          Dashboard
        </Typography>
        <Stack direction="row" gap="10px">
          <DropdownMenu title="NGN" />
          <DropdownMenu title="7days" />
        </Stack>
      </Stack>
      <Box mt="20px" px="30px">
        <Stack
          direction="row"
          bgcolor="#F3F3F9"
          padding="25px 39px 25px 32px"
          gap="45px"
          minHeight="105px"
        ></Stack>
      </Box>
    </Dashboard>
  );
}
