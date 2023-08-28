import React from "react";
import Dashboard from "@/layouts/dashboard";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import DropdownMenu from "@/components/DropdownMenu";
import CountChart from "@/components/CountChart";
import Header from "@/components/table/header";
import PaymentLinksTable from "@/components/business/paymentLinks/paymentLinksTable";

export default function Index() {
  return (
    <Dashboard title="Dashboard">
      <PaymentLinksTable />
    </Dashboard>
  );
}
