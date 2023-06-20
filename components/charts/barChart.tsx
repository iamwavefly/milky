import { Box, capitalize, Stack, Typography } from "@mui/material";
import React, { PureComponent, useEffect, useState } from "react";
import {
  BarChart as ReBarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CalendarIcon from "remixicon-react/Calendar2LineIcon";
import UploadIcon from "remixicon-react/Upload2LineIcon";
import { DateRangePicker, DateRange } from "materialui-daterange-picker";
import moment from "moment";
import { CSVLink } from "react-csv";

// const data = [
//   {
//     name: "Mar 01",
//     uv: 4000,
//     pv: 2400,
//     amt: 200,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 220,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 200,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 281,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 200,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

// const colors = ["#F7A4C2", "#A4ADF7", "#D2A4F7", "#F8698B"];

const headers = [
  { label: "First Name", key: "firstname" },
  { label: "Last Name", key: "lastname" },
  { label: "Email", key: "email" },
];

const test = [
  { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
  { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
  { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" },
];

const BarChart = ({ data, dataKey, updateDate }: any) => {
  const [csvHeader, setCsvHeader] = useState<any>([]);
  const [openDateRange, setOpenDateRange] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [dateRange, setDateRange] = React.useState<DateRange>({});

  const toggle = () => setOpenDateRange(!openDateRange);

  useEffect(() => {
    const startDate = moment(dateRange?.startDate).format("l");
    const endDate = moment(dateRange?.endDate).format("l");

    updateDate({ startDate, endDate });
  }, [dateRange]);

  useEffect(() => {
    if (dateRange.startDate) {
      setSelectedDate(
        `${moment(dateRange.startDate).format("ll").split(",")[0]} - ${
          moment(dateRange.endDate).format("ll").split(",")[0]
        }`
      );
    }
  }, [dateRange]);

  useEffect(() => {
    const startDate = moment(dateRange.startDate)
      .subtract(1, "year")
      .format("ll")
      .split(",")[0];
    const endDate = moment().format("ll").split(",")[0];
    setSelectedDate(`${startDate} - ${endDate}`);
    // update comp date filter
    updateDate({
      startDate: moment(dateRange.startDate).subtract(1, "year").format("l"),
      endDate: moment().format("l"),
    });
  }, []);

  useEffect(() => {
    const newArray =
      data &&
      Object.entries(data).map?.((item, index) => {
        console.log(item);
        // return { label: item[1], key: item?.replaceAll?.(" ", "") };
      });
  }, [data]);

  return (
    <Box p="24px 36px" bgcolor="#FFFFFF" flex={1}>
      {/* date range */}
      <Stack
        position="fixed"
        left={0}
        top={0}
        bgcolor="#1A1A1A"
        width="100%"
        height="100%"
        visibility={openDateRange ? "visible" : "hidden"}
        sx={{ zIndex: 999 }}
        alignItems="center"
        justifyContent="center"
      >
        <Box width="auto" height="auto">
          <DateRangePicker
            open={openDateRange}
            toggle={toggle}
            onChange={(range) => setDateRange(range)}
            closeOnClickOutside
          />
        </Box>
      </Stack>
      {/* header group */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/* title */}
        <Typography fontSize="14px" fontWeight="500">
          Transactions ({capitalize(dataKey)})
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
            onClick={toggle}
          >
            <CalendarIcon size="16px" />
            <Typography fontSize="12px" color="#4A4E60">
              {selectedDate}
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
              <CSVLink data={[]}>Export</CSVLink>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      {/* chart */}
      <Box height="385px" mt="45px">
        {/* <BarChart data={inflowOutflowChart?.data?.data} dataKey="inflow" /> */}
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey={"name_date"} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={dataKey} fill="#2E3192" barSize={11} />
          </ReBarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default BarChart;
