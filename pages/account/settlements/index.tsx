import React from "react";
import Dashboard from "@/layouts/dashboard";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import SettlementTable from "@/components/accounts/settlement/Settlement";

export default function Index() {
  return (
    <Dashboard title="Settlements">
      <SettlementTable />
    </Dashboard>
  );
}
