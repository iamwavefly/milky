import React, { useEffect, useRef, useState } from "react";
import Dashboard from "@/layouts/dashboard";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
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
import LandscapeCard from "@/components/cards/LandscapeCard";
import DataIcon from "@/public/icons/data.svg";
import DropIcon from "@/public/icons/drop.svg";
import ReportIcon from "@/public/icons/report.svg";
import ArrowIcon from "@/public/icons/arrow-down.svg";
import ColorBop from "@/components/colorBop";
import LineChart from "@/components/charts/lineChart";
import Navbar from "@/components/Navbar";
import Export from "@/components/Export";
import FilterCurrencyMenu from "@/components/FiltterCurrencyMenu";

const options = ["week", "year"];

export default function Index() {
  const [summary, setSummary] = useState<any>({});
  const [csvHeader, setCsvHeader] = useState<any>([]);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [selectedFilter, setSelectedFilter] = useState(1);
  // filter menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openFilterMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeFilterModal = () => {
    setAnchorEl(null);
  };

  const containerRef = useRef();

  // filter menu ends
  const txnSummaryReq = useFetch(
    `${baseUrl}/metric/transaction/summary?FromDate=${dateRange.startDate}&ToDate=${dateRange.endDate}`,
    "get"
  );

  const inflowOutflowChart = useFetch(
    `${baseUrl}/metric/inflow/outflow?type=${options[selectedFilter]}&FromDate=${dateRange.startDate}&ToDate=${dateRange.endDate}`,
    "get"
  );

  useEffect(() => {
    txnSummaryReq?.handleSubmit();
  }, [dateRange]);

  useEffect(() => {
    inflowOutflowChart?.handleSubmit();
  }, [dateRange, selectedFilter]);

  useEffect(() => {
    setSummary(txnSummaryReq?.data?.data);
  }, [txnSummaryReq?.data]);

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedFilter(index);
    setAnchorEl(null);
  };

  return (
    <Dashboard title="Dashboard">
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeFilterModal}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            sx={{ width: "100%" }}
            key={option}
            selected={index === selectedFilter}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      <Navbar title="Overview">
        <Stack direction="row" gap="10px">
          <FilterCurrencyMenu title="Filter currency" />
        </Stack>
      </Navbar>
      {/* group charts */}
      <Grid container spacing="16px" mt="20px">
        <Grid xs>
          <LandscapeCard
            title={summary?.count}
            change={summary?.count_change}
            subtitle={"Total Transaction count"}
            icon={<DataIcon />}
          />
        </Grid>
        <Grid xs>
          <LandscapeCard
            title={summary?.volume}
            change={summary?.volume_change}
            subtitle={"Total Transaction Volume"}
            currency="NGN"
            icon={<DropIcon />}
          />
        </Grid>
        <Grid xs>
          <LandscapeCard
            title={summary?.settlements}
            change={summary?.settlement_change}
            subtitle={"Total Transaction Settlements"}
            currency="NGN"
            icon={<ReportIcon />}
          />
        </Grid>
      </Grid>
      <Grid container spacing="16px" mt="24px">
        <Grid xs={8}>
          <Box
            ref={containerRef}
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
                <Button variant="outlinedSmall" onClick={openFilterMenu}>
                  This {options[selectedFilter]}
                  <ArrowIcon width="18px" height="18px" fill="#0048B1" />
                </Button>
                <Export
                  variant="containedSmall"
                  sx={{ height: "36px" }}
                  title={"dashboard"}
                  data={inflowOutflowChart?.data?.data}
                  columns={undefined}
                  containerRef={containerRef}
                  loading={inflowOutflowChart?.loading}
                />
              </Stack>
            </Stack>
            {/* chart */}
            <Box height="310px" mt="19px">
              <LineChart data={inflowOutflowChart?.data?.data} />
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
              title={summary?.available_balance}
              change={summary?.available_balance_change}
              subtitle={"Available Balance"}
              currency="NGN"
              icon={<ReportIcon />}
              linkTo="/balance/main"
            />
            <LandscapeCard
              title={summary?.ledger_balance}
              change={summary?.ledger_balance_change}
              subtitle={"Ledger Balance"}
              currency="NGN"
              icon={<ReportIcon />}
              linkTo="/balance/main"
            />
          </Stack>
        </Grid>
      </Grid>
    </Dashboard>
  );
}
