import React, { useEffect, useState } from "react";
import Dashboard from "@/layouts/dashboard";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import BalanceTable from "@/components/balance/balanceHistoryTable";
import CountChart from "@/components/CountChart";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import Chart from "@/components/chargeback/chart";
import PendingChargebackTable from "@/components/chargeback/pendingTable";
import AwaitingResponseTable from "@/components/chargeback/awaitingResponseTable";

export default function Index() {
  const [metric, setMetric] = useState<any>({});

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/get/wallet/balance`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <Dashboard title="Awaiting Response">
      <Chart />
      <Box>
        <AwaitingResponseTable />
      </Box>
    </Dashboard>
  );
}
