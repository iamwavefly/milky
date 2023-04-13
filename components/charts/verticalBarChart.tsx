import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, LabelList, Cell } from "recharts";

// const data = [
//   {
//     name: "GT Bank",
//     uv: 4000,
//     pv: 20,
//     color: "#A4ADF7",
//     amt: 2400,
//   },
//   {
//     name: "UBA Bank",
//     uv: 3000,
//     pv: 80,
//     color: "#F8698B",
//     amt: 2210,
//   },
//   {
//     name: "Zenith Bank",
//     uv: 2000,
//     pv: 40,
//     color: "#D2A4F7",
//     amt: 2290,
//   },
//   {
//     name: "Kuda Bank",
//     uv: 2780,
//     pv: 60,
//     color: "#F7A4C2",
//     amt: 2000,
//   },
// ];

const colors = ["#F7A4C2", "#A4ADF7", "#D2A4F7", "#F8698B"];

const VerticalBarChart = () => {
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/metric/piechart/customer/banks`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <Stack gap="16px" width="100%" maxWidth="374px">
      {data?.data &&
        data?.data?.map(({ name, value }: any, index: number) => (
          <Stack gap="6px">
            <Stack direction="row" justifyContent="space-between">
              <Typography color="#262B40" fontSize="14px">
                {name}
              </Typography>
              <Typography color="#92959F" fontSize="14px">
                {value}%
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Box
                bgcolor="#F3F3F9"
                color={colors[index]}
                height="8px"
                width="100%"
              >
                <LinearProgress
                  variant="determinate"
                  value={value}
                  color="inherit"
                />
              </Box>
            </Stack>
          </Stack>
        ))}
    </Stack>
  );
};

export default VerticalBarChart;
