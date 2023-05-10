import React, { useEffect, useState } from "react";
import Dashboard from "@/layouts/dashboard";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import BalanceTable from "@/components/balance/balanceHistoryTable";
import CountChart from "@/components/CountChart";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";

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
    <Dashboard title="Balance">
      <Stack px="30px" mt="20px">
        <Typography fontSize="16px" color="#2E3192">
          Balance
        </Typography>
      </Stack>
      {/* balance charts */}
      <Box mt="20px" px="30px">
        <Stack
          direction="row"
          bgcolor="#F3F3F9"
          padding="25px 39px 25px 32px"
          gap="45px"
          minHeight="105px"
        >
          <Box flex={1}>
            <CountChart
              title={"Dispute/Chargeback"}
              value={metric?.count ?? 100}
              change={metric?.count_change}
              withCurrency
            />
          </Box>
          <Divider sx={{ border: "1px solid #E4E8F2" }} />
          <Box flex={1}>
            <CountChart
              title={"Refunds"}
              themeColor="#EA5851"
              value={metric?.volume ?? 1000}
              change={metric?.volume_change}
              withCurrency
            />
          </Box>
          <Divider sx={{ border: "1px solid #E4E8F2" }} />
          <Box flex={1}>
            <CountChart
              title={"Non-Compliance Assessment"}
              value={metric?.settlements ?? 2300}
              change={metric?.settlement_change}
              withCurrency
            />
          </Box>
        </Stack>
      </Box>
    </Dashboard>
  );
}
