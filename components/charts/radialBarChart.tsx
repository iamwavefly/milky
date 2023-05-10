import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import React, { PureComponent, useEffect, useState } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#D4D5D9", "#9BA6FA", "#9769F8", "#F8698B"];

export default function RadialChart() {
  const [charts, setCharts] = useState([]);
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/metric/piechart/customer/devices`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    const newData = data?.data?.map((res: any, index: number) => {
      const deviceName =
        res?.name?.length > 10 ? res?.name?.substring(0, 10) : res?.name;
      return { ...res, name: deviceName, fill: COLORS[index] };
    });
    setCharts(newData);
  }, [data]);

  useEffect(() => {
    let ans = charts?.reduce((agg: any, curr: any) => {
      let found = agg.find((x: any) => x.name === curr.name);
      if (found) {
        found.colors.push(curr.value);
      } else {
        agg.push({
          name: curr.name,
          colors: [curr.value],
        });
      }
      return agg;
    }, []);
    console.log({ ans });
  }, [charts]);

  return (
    data?.data && (
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="53%"
          outerRadius="100%"
          // barSize={10}
          barCategoryGap={1.5}
          data={charts}
          //
        >
          <RadialBar dataKey="value" cornerRadius={10} />
        </RadialBarChart>
      </ResponsiveContainer>
    )
  );
}
