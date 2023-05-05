import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { Box, Stack, Typography } from "@mui/material";
import React, { PureComponent, useEffect } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  Cell,
  Label,
  Pie,
  PieChart as RechartPieChart,
} from "recharts";
import ColorBop from "../colorBop";

// const data = [
//   { name: "Successful", value: 400 },
//   { name: "Failed", value: 300 },
// ];
const COLORS = ["#F7A4C2", "#CDD2FD", "#F8698B", "#6979F8"];

export default function PieChart() {
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/metric/piechart/transaction/status`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    console.log(data, "pie chart");
  }, [data]);

  return (
    <Stack justifyContent="center" width="100%">
      <Box mx="auto">
        <RechartPieChart width={200} height={200}>
          {data?.data && (
            <Pie
              data={data?.data}
              innerRadius={60}
              outerRadius={75}
              cornerRadius={40}
              fill="#8884d8"
              paddingAngle={-5}
              dataKey="value"
            >
              {data?.data?.map((entry: string, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          )}
        </RechartPieChart>
      </Box>
      <Stack mt="33px" direction="row" alignItems="center" spacing="32px">
        {data?.data?.map(
          ({ name, value }: { name: string; value: string }, index: number) => (
            <Stack
              key={value}
              direction="row"
              alignItems="center"
              spacing="10px"
            >
              <ColorBop color={COLORS[index % COLORS.length]} />
              <Typography color="#262B40" fontSize="12px">
                {name}
              </Typography>
            </Stack>
          )
        )}
      </Stack>
    </Stack>
  );
}
