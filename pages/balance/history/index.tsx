import React from "react";
import Dashboard from "@/layouts/dashboard";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import BalanceHistoryTable from "@/components/balance/balanceHistoryTable";

export default function Index() {
  return (
    <Dashboard title="Balance History">
      <BalanceHistoryTable />
    </Dashboard>
  );
}
