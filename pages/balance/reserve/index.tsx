import React from "react";
import Dashboard from "@/layouts/dashboard";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import BalanceReserveTable from "@/components/balance/balanceReserveTable";

export default function Index() {
  return (
    <Dashboard title="Dashboard">
      <Stack px="30px" mt="20px">
        <Typography fontSize="16px" color="#2E3192">
          Rolling Reserve
        </Typography>
      </Stack>
      <Box mt="20px" px="30px">
        <BalanceReserveTable />
      </Box>
    </Dashboard>
  );
}
