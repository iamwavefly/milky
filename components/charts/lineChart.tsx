import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { Box } from "@mui/material";
import React, { PureComponent, useEffect } from "react";
import {
  LineChart as RechartLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const labelStyles = {
  color: "#9E9E9E",
  fontSize: 14,
};

const data = [
  {
    name: "Mon",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Tues",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Wed",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Thurs",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Thurs",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Thurs",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Thurs",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Thurs",
    uv: 2780,
    pv: 39208,
    amt: 2000,
  },
  {
    name: "Thurs",
    uv: 2780,
    pv: 3901,
    amt: 2000,
  },
];

interface Props {
  type?: "increase" | "decrease";
  themeColor?: string;
}

const LineChart = ({ type, themeColor }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <Tooltip />
        <defs>
          <linearGradient
            id={`colorUv${themeColor}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="10%"
              stopColor={themeColor ?? "#304FFD"}
              stopOpacity={0.3}
            />
            <stop offset="90%" stopColor="#fff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          fill={`url(#colorUv${themeColor})`}
          type="monotone"
          dataKey="pv"
          strokeWidth={2.2}
          stroke={themeColor ?? "#304FFD"}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
