import React, { useEffect, useState } from "react";
import Dashboard from "@/layouts/dashboard";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import DropdownMenu from "@/components/DropdownMenu";
import CountChart from "@/components/CountChart";
import useFetch from "@/hooks/useFetch";
import CalendarIcon from "remixicon-react/Calendar2LineIcon";
import UploadIcon from "remixicon-react/Upload2LineIcon";
import baseUrl from "@/middleware/baseUrl";
import BarChart from "@/components/charts/barChart";

export default function Index() {
  const [metric, setMetric] = useState<any>({});

  const { loading, data, error, handleSubmit } = useFetch(
    `https://subsidiary-dashboard-api-service-dev.eks-alliancepay.com/subsidiary/metric/transaction/summary`,
    "get"
  );

  const inflowOutflowChart = useFetch(
    `https://subsidiary-dashboard-api-service-dev.eks-alliancepay.com/subsidiary/metric/inflow/outflow?type=year`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    inflowOutflowChart?.handleSubmit();
  }, []);

  useEffect(() => {
    console.log(inflowOutflowChart?.data?.data);
  }, [inflowOutflowChart?.data?.data]);

  useEffect(() => {
    setMetric(data?.data);
  }, [data]);

  return (
    <Dashboard title="Dashboard">
      <Stack
        px="30px"
        mt="20px"
        height="40px"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography fontSize="16px" color="#2E3192">
          Dashboard
        </Typography>
        <Stack direction="row" gap="10px">
          <DropdownMenu title="NGN" />
          <DropdownMenu title="7days" />
        </Stack>
      </Stack>
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
              title={"Transaction Count"}
              value={metric?.count}
              change={metric?.count_change}
            />
          </Box>
          <Divider sx={{ border: "1px solid #E4E8F2" }} />
          <Box flex={1}>
            <CountChart
              title={"Transaction Volume"}
              themeColor="#EA5851"
              value={metric?.volume}
              change={metric?.volume_change}
              withCurrency
            />
          </Box>
          <Divider sx={{ border: "1px solid #E4E8F2" }} />
          <Box flex={1}>
            <CountChart
              title={"Transaction Settlements"}
              value={metric?.settlements}
              change={metric?.settlement_change}
              withCurrency
            />
          </Box>
        </Stack>
        <Stack
          direction="row"
          bgcolor="#F3F3F9"
          padding="25px 39px 25px 32px"
          gap="45px"
          minHeight="105px"
          borderTop="1px solid #E4E8F2"
        >
          <Box flex={1}>
            <CountChart
              title={"Available Balance"}
              value={metric?.available_balance}
              change={metric?.available_balance_change}
              withCurrency
            />
          </Box>
          <Divider sx={{ border: "1px solid #E4E8F2" }} />
          <Box flex={1}>
            <CountChart
              title={"Ledger Balance"}
              value={metric?.ledger_balance}
              change={metric?.ledger_balance_change}
              withCurrency
            />
          </Box>
          <Box flex={1}></Box>
        </Stack>
      </Box>
      {/* group charts */}
      <Stack direction="row" spacing="30px" px="30px" mt="30px">
        {/* chart box */}
        <Box p="24px 36px" bgcolor="#FFFFFF" flex={1}>
          {/* header group */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* title */}
            <Typography fontSize="14px" fontWeight="500">
              Transactions (Inflow)
            </Typography>
            {/* filter and export button */}
            <Stack height="40px" direction="row" spacing="7px">
              {/* charts filter */}
              <Stack
                minWidth="146px"
                height="100%"
                direction="row"
                border="1px solid #E4E8F2"
                alignItems="center"
                px="13px"
                spacing="12px"
                sx={{ cursor: "pointer" }}
              >
                <CalendarIcon size="16px" />
                <Typography fontSize="12px" color="#4A4E60">
                  Mar 01 - Mar 07
                </Typography>
              </Stack>
              {/* export button */}
              <Stack
                width="107px"
                height="100%"
                direction="row"
                border="1px solid #2E3192"
                alignItems="center"
                justifyContent="center"
                px="13px"
                spacing="8px"
                sx={{ cursor: "pointer" }}
              >
                <UploadIcon size="16px" color="#2E3192" />
                <Typography fontSize="12px" color="#2E3192">
                  Export
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          {/* chart */}
          <Box height="385px" mt="45px">
            <BarChart data={inflowOutflowChart?.data?.data} dataKey="inflow" />
          </Box>
        </Box>
        {/* chart box */}
        <Box p="24px 36px" bgcolor="#FFFFFF" flex={1}>
          {/* header group */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* title */}
            <Typography fontSize="14px" fontWeight="500">
              Transactions (Inflow)
            </Typography>
            {/* filter and export button */}
            <Stack height="40px" direction="row" spacing="7px">
              {/* charts filter */}
              <Stack
                minWidth="146px"
                height="100%"
                direction="row"
                border="1px solid #E4E8F2"
                alignItems="center"
                px="13px"
                spacing="12px"
                sx={{ cursor: "pointer" }}
              >
                <CalendarIcon size="16px" />
                <Typography fontSize="12px" color="#4A4E60">
                  Mar 01 - Mar 07
                </Typography>
              </Stack>
              {/* export button */}
              <Stack
                width="107px"
                height="100%"
                direction="row"
                border="1px solid #2E3192"
                alignItems="center"
                justifyContent="center"
                px="13px"
                spacing="8px"
                sx={{ cursor: "pointer" }}
              >
                <UploadIcon size="16px" color="#2E3192" />
                <Typography fontSize="12px" color="#2E3192">
                  Export
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          {/* chart */}
          <Box height="385px" mt="45px">
            <BarChart data={inflowOutflowChart?.data?.data} dataKey="outflow" />
          </Box>
        </Box>
      </Stack>
    </Dashboard>
  );
}
