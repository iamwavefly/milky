import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import React, { useEffect } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";

const colors = ["#F7A4C2", "#A4ADF7", "#D2A4F7", "#F8698B"];

// const data = [
//   {
//     name: "Card",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Bank",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "QR",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "USSD",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
// ];

export default function DataComposedChart() {
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/metric/piechart/transaction/method`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <BarChart width={350} height={250} data={data?.data}>
      <XAxis
        dataKey="name"
        axisLine={false}
        tick={{ color: "#9E9E9E", fontSize: "14px" }}
      />
      <Bar dataKey="value" fill="#8884d8" barSize={28} radius={[30, 30, 0, 0]}>
        {data?.data?.map((_: string, index: number) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
  );
}
