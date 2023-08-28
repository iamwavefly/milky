import React, { useEffect, useState } from "react";
import Dashboard from "@/layouts/dashboard";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import BalanceTable from "@/components/balance/balanceHistoryTable";
import CountChart from "@/components/CountChart";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import Chart from "@/components/chargeback/chart";
import ChargebackTable from "@/components/chargeback/chargebackTable";
import Tabs from "@/components/Tabs";
import OverviewCard from "@/components/cards/OverviewCard";

export default function Index() {
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/get/wallet/balance`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <Dashboard title="All Chargebacks">
      <Chart />
      <Box>
        <ChargebackTable />
      </Box>
    </Dashboard>
  );
}
