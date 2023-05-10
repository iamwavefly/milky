import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Styles from "./styles.module.scss";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import accumulator, { DataFormatter } from "@/helper/format";

const data1 = [
  {
    name: "Jan",
    uv: 400,
    pv: 240,
    amt: 24,
  },
  {
    name: "Feb",
    uv: 300,
    pv: 139,
    amt: 22,
  },
  {
    name: "Mar",
    uv: 200,
    pv: 980,
    amt: 22,
  },
  {
    name: "Apr",
    uv: 270,
    pv: 390,
    amt: 20,
  },
  {
    name: "May",
    uv: 180,
    pv: 480,
    amt: 21,
  },
  {
    name: "Jun",
    uv: 230,
    pv: 380,
    amt: 25,
  },
  {
    name: "Jul",
    uv: 340,
    pv: 430,
    amt: 21,
  },
  {
    name: "Aug",
    uv: 340,
    pv: 430,
    amt: 21,
  },
  {
    name: "Sep",
    uv: 340,
    pv: 430,
    amt: 21,
  },
  {
    name: "Oct",
    uv: 340,
    pv: 430,
    amt: 21,
  },
  {
    name: "Nov",
    uv: 340,
    pv: 430,
    amt: 21,
  },
  {
    name: "Dec",
    uv: 340,
    pv: 430,
    amt: 21,
  },
];

const labelStyles = {
  color: "#9E9E9E",
  fontSize: 14,
};

const CustomizedDot = (props: any) => {
  const { cx, cy, stroke, payload, value } = props;

  return (
    <svg
      x={cx - 10}
      y={cy - 10}
      width={20}
      height={20}
      fill="red"
      viewBox="0 0 1024 1024"
    >
      <circle cx="4" cy="4" r="3.5" fill="white" stroke="#6939FF" />
      <circle cx="4" cy="4" r="2" fill="#6939FF" />
    </svg>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    // const { amount, cent } = FormatToCurrency(payload[0].value);
    return (
      <Typography
        fontSize="8px"
        color="#262B40"
        sx={{ outline: "none" }}
        component="p"
        bgcolor="#CDD2FD"
        p="5px"
        borderRadius={2}
      >
        {/* ${amount}.{cent} */}
        {payload[0].value}
      </Typography>
    );
  }

  return null;
};

const StackAreaChart = () => {
  const [yAxisMaxDomain, setYAxisMaxDomain] = useState(0);
  const [totalCurrentBalance, setTotalCurrentBalance] = useState(0);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/metric/inflow/outflow?fromdate=2020-10-10&todate=2023-10-10&type=year`,
    "get"
  );

  useEffect(() => {
    const inflowAcc = accumulator(data?.data, "inflow");
    const outflowAcc = accumulator(data?.data, "outflow");
    setTotalCurrentBalance(inflowAcc > outflowAcc ? inflowAcc : outflowAcc);
  }, [data]);

  useEffect(() => {
    let YAxisMax;
    if (totalCurrentBalance >= 500) {
      YAxisMax = Math.round(totalCurrentBalance / 1000) * 1000;
    }
    if (totalCurrentBalance < 500) {
      YAxisMax = totalCurrentBalance + 100;
    }
    if (totalCurrentBalance < 100) {
      YAxisMax = 100;
    }
    setYAxisMaxDomain(YAxisMax as number);
  }, [totalCurrentBalance]);

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Box className={Styles.chartWrapper}>
      <Box
        style={{
          position: "absolute",
          marginLeft: "-10px",
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            height={250}
            data={data?.data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="3.26%" stopColor="#E0E6FE" />
                <stop offset="100%" stopColor="#9769F8" />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="3.26%" stopColor="#F1F2FF" />
                <stop offset="100%" stopColor="#939EF5" />
              </linearGradient>
            </defs>
            <XAxis dataKey="name_date" tick={labelStyles} axisLine={false} />
            <YAxis
              tick={labelStyles}
              axisLine={false}
              tickFormatter={DataFormatter}
              domain={[0, totalCurrentBalance]}
            />
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <Tooltip
              content={({ active, payload, label }) => (
                <CustomTooltip
                  active={active}
                  payload={payload}
                  label={label}
                />
              )}
            />
            <Area
              dot={false}
              type="natural"
              strokeWidth={0}
              fill="url(#colorUv)"
              dataKey="inflow"
            />
            <Area
              dataKey="outflow"
              dot={false}
              type="natural"
              strokeWidth={0}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default StackAreaChart;
