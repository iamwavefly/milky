import React, { useEffect, useState } from "react";
import Dashboard from "@/layouts/dashboard";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
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
import Header from "@/components/Header";
import LandscapeCard from "@/components/cards/LandscapeCard";
import DataIcon from "@/public/icons/data.svg";
import DropIcon from "@/public/icons/drop.svg";
import ReportIcon from "@/public/icons/report.svg";
import ArrowIcon from "@/public/icons/arrow-down.svg";
import ColorBop from "@/components/colorBop";
import LineChart from "@/components/charts/lineChart";

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
      <Header title="Overview">
        <Stack direction="row" gap="10px">
          <DropdownMenu title="Filter currency" />
        </Stack>
      </Header>
      {/* group charts */}
      <Grid container spacing="16px" mt="20px">
        <Grid xs>
          <LandscapeCard
            title="12,500"
            subtitle={"Total Transaction count"}
            icon={<DataIcon />}
          />
        </Grid>
        <Grid xs>
          <LandscapeCard
            title="1,500,000"
            subtitle={"Total Transaction Volume"}
            variant="error"
            currency="NGN"
            icon={<DropIcon />}
          />
        </Grid>
        <Grid xs>
          <LandscapeCard
            title="1,000,000"
            subtitle={"Total Transaction Settlements"}
            currency="NGN"
            icon={<ReportIcon />}
          />
        </Grid>
      </Grid>
      <Grid container spacing="16px" mt="24px">
        <Grid xs={8}>
          <Box
            bgcolor="#fff"
            height="456px"
            borderRadius="8px"
            border="1px solid #E8EAED"
            padding="24px"
          >
            {/* header */}
            <Stack direction="row" justifyContent="space-between">
              <Box>
                <Typography
                  color="#162031"
                  fontSize="15px"
                  fontWeight={600}
                  lineHeight="26px"
                >
                  Analytics
                </Typography>
                <Typography color="#586379" fontSize="13px" lineHeight="21px">
                  Track inflow and outflow of money overtime
                </Typography>
              </Box>
              <Stack direction="row" spacing="16px">
                <Button variant="outlinedSmall">
                  This week{" "}
                  <ArrowIcon width="18px" height="18px" fill="#0048B1" />
                </Button>
                <Button variant="containedSmall">
                  This week <ArrowIcon width="18px" height="18px" fill="#fff" />
                </Button>
              </Stack>
            </Stack>
            {/* chart */}
            <Box height="310px" mt="19px">
              <LineChart />
            </Box>
            {/* footer */}
            <Stack
              direction="row"
              justifyContent="center"
              mb="24px"
              mt="13px"
              height="21px"
              spacing="32px"
            >
              <Stack direction="row" alignItems="center" spacing="8px">
                <ColorBop color="#0069D0" />
                <Typography color="#162031" fontSize="13px" lineHeight="21px">
                  Inflow
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing="8px">
                <ColorBop color="#FF4F79" />
                <Typography color="#162031" fontSize="13px" lineHeight="21px">
                  Outflow
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Grid>
        <Grid xs>
          <Stack spacing="24px">
            <LandscapeCard
              title="2,500,000"
              subtitle={"Available Balance"}
              currency="NGN"
              variant="error"
              icon={<ReportIcon />}
              linkTo="/balance"
            />
            <LandscapeCard
              title="2,000,000"
              subtitle={"Ledger Balance"}
              currency="NGN"
              icon={<ReportIcon />}
              linkTo="/balance"
            />
          </Stack>
        </Grid>
      </Grid>
    </Dashboard>
  );
}
