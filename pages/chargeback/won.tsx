import React, { useEffect, useState } from "react";
import Dashboard from "@/layouts/dashboard";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import BalanceTable from "@/components/balance/balanceHistoryTable";
import CountChart from "@/components/CountChart";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import Chart from "@/components/chargeback/chart";
import PendingChargebackTable from "@/components/chargeback/pendingTable";
import WonChargebackTable from "@/components/chargeback/wonChargebackTable";

export default function Index() {
  const [metric, setMetric] = useState<any>({});

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/get/wallet/balance`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    console.log({ data });
  }, [data]);

  return (
    <Dashboard title="Won">
      <Box px="30px" mt="20px">
        <Chart title="Won" />
        <Box mt="39px">
          <WonChargebackTable />
        </Box>
      </Box>
    </Dashboard>
  );
}
