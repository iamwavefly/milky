import React from "react";
import Dashboard from "@/layouts/dashboard";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import DropdownMenu from "@/components/DropdownMenu";
import CountChart from "@/components/CountChart";
import Header from "@/components/table/header";
import InvoiceTable from "@/components/business/invoices/InvoiceTable";

export default function Index() {
  return (
    <Dashboard title="Invoice">
      <Stack px="30px" mt="20px">
        <Typography fontSize="16px" color="#2E3192">
          Invoice
        </Typography>
      </Stack>
      <Box mt="20px" px="30px">
        <InvoiceTable />
      </Box>
    </Dashboard>
  );
}
