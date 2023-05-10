import React from "react";
import Dashboard from "@/layouts/dashboard";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import RefundTable from "@/components/refunds/refundTable";

export default function Index() {
  return (
    <Dashboard title="Refunds">
      <Stack px="30px" mt="20px">
        <Typography fontSize="16px" color="#2E3192">
          Refunds
        </Typography>
      </Stack>
      <Box mt="20px" px="30px">
        <RefundTable />
      </Box>
    </Dashboard>
  );
}
