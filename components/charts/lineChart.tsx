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
];

const LineChart = () => {
  // const { loading, data, error, handleSubmit } = useFetch(
  //   `${baseUrl}/metric/barchart/customer/payment/days`,
  //   "get"
  // );

  // useEffect(() => {
  //   handleSubmit();
  // }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartLineChart
        width={800}
        height={500}
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <Tooltip />
        <Line
          type="monotone"
          dataKey="pv"
          strokeWidth={2}
          stroke="#6979F8"
          activeDot={{ r: 8 }}
        />
      </RechartLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
