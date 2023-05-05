import React, { PureComponent } from "react";
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

const BarChart = ({ data, dataKey }: any) => {
  console.log(dataKey, data);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReBarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey={"name_date"} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={dataKey} fill="#2E3192" barSize={11} />
      </ReBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
