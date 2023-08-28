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
  { name: "Mar 01", inflow: 90, outflow: 80 },
  { name: "Mar 01", inflow: 82, outflow: 38 },
  { name: "Mar 03", inflow: 78, outflow: 80 },
  { name: "Mar 04", inflow: 95, outflow: 20 },
  { name: "Mar 05", inflow: 30, outflow: 60 },
  { name: "Mar 06", inflow: 30, outflow: 10 },
  { name: "Mar 07", inflow: 30, outflow: 0 },
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
        margin={{ top: 5, right: 5, left: -28, bottom: 5 }}
      >
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="rgba(65, 105, 225, 0.12)" />
            <stop offset="95%" stopColor="rgba(65, 105, 225, 0.01)" />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#AFB4C1" strokeWidth={0.5} />
        <XAxis dataKey="name" axisLine={false} fontSize={12} color="#3C4453" />
        <YAxis tickCount={10} axisLine={false} fontSize={12} color="#3C4453" />
        <Tooltip />
        <Area
          type="natural"
          dataKey="inflow"
          stroke="#0069D0"
          fill="url(#areaGradient)"
          strokeWidth={1.8}
        />
        <Area
          type="natural"
          dataKey="outflow"
          stroke="#FF4F79"
          fill="transparent"
          strokeWidth={1.8}
          strokeDasharray="3 3"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
