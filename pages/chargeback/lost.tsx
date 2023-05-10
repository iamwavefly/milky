import React, { useEffect, useState } from "react";
import Dashboard from "@/layouts/dashboard";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import BalanceTable from "@/components/balance/balanceHistoryTable";
import CountChart from "@/components/CountChart";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import Chart from "@/components/chargeback/chart";
import PendingChargebackTable from "@/components/chargeback/pendingTable";

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
    <Dashboard title="Lost">
      <Box px="30px" mt="20px">
        <Chart title="Lost" />
        <Box mt="39px">
          <PendingChargebackTable />
        </Box>
      </Box>
    </Dashboard>
  );
}
