import React from "react";
import Dashboard from "@/layouts/dashboard";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import BalanceHistoryTable from "@/components/balance/balanceHistoryTable";

export default function Index() {
  return (
    <Dashboard title="Balance History">
      <Stack px="30px" mt="20px">
        <Typography fontSize="16px" color="#2E3192">
          Balance History
        </Typography>
      </Stack>
      <Box mt="20px" px="30px">
        <BalanceHistoryTable />
      </Box>
    </Dashboard>
  );
}
