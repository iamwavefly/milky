import React from "react";
import Dashboard from "@/layouts/dashboard";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import RefundTable from "@/components/refunds/refundTable";

export default function Index() {
  return (
    <Dashboard title="Refunds">
      <RefundTable />
    </Dashboard>
  );
}
