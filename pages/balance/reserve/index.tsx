import React from "react";
import Dashboard from "@/layouts/dashboard";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import BalanceReserveTable from "@/components/balance/balanceReserveTable";

export default function Index() {
  return (
    <Dashboard title="Dashboard">
      <BalanceReserveTable />
    </Dashboard>
  );
}
