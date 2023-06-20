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
import { useDispatch, useSelector } from "react-redux";
import { selectUserState } from "@/store/authSlice";
import { CSVLink } from "react-csv";

export default function Index() {
  const [metric, setMetric] = useState<any>({});
  const [csvHeader, setCsvHeader] = useState<any>([]);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/metric/transaction/summary?FromDate=${dateRange.startDate}&ToDate=${dateRange.endDate}`,
    "get"
  );

  const inflowOutflowChart = useFetch(
    `${baseUrl}/metric/inflow/outflow?type=year&FromDate=${dateRange.startDate}&ToDate=${dateRange.endDate}`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, [dateRange]);

  useEffect(() => {
    inflowOutflowChart?.handleSubmit();
  }, [dateRange]);

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
              value={metric?.count ?? 0}
              change={metric?.count_change}
            />
          </Box>
          <Divider sx={{ border: "1px solid #E4E8F2" }} />
          <Box flex={1}>
            <CountChart
              title={"Transaction Volume"}
              themeColor="#EA5851"
              value={metric?.volume ?? 0}
              change={metric?.volume_change}
              withCurrency
            />
          </Box>
          <Divider sx={{ border: "1px solid #E4E8F2" }} />
          <Box flex={1}>
            <CountChart
              title={"Transaction Settlements"}
              value={metric?.settlements ?? 0}
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
              value={metric?.available_balance ?? 0}
              change={metric?.available_balance_change}
              withCurrency
            />
          </Box>
          <Divider sx={{ border: "1px solid #E4E8F2" }} />
          <Box flex={1}>
            <CountChart
              title={"Ledger Balance"}
              value={metric?.ledger_balance ?? 0}
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
        <BarChart
          data={inflowOutflowChart?.data?.data}
          dataKey="inflow"
          updateDate={setDateRange}
        />
        {/* chart box */}
        <BarChart
          data={inflowOutflowChart?.data?.data}
          dataKey="outflow"
          updateDate={setDateRange}
        />
      </Stack>
    </Dashboard>
  );
}
