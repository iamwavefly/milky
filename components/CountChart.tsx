import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import ArrowDropLeftLineIcon from "remixicon-react/ArrowUpSFillIcon";
import LineChart from "./charts/lineChart";

export default function CountChart() {
  return (
    <Stack
      direction="row"
      border="1px solid #f00"
      width="100%"
      height="52px"
      gap="22px"
    >
      <Stack spacing="4px">
        <Typography color="#4A4E60" fontSize="10px">
          Transaction Count
        </Typography>
        <Stack direction="row" spacing="2px" alignItems="center">
          <Typography color="#262B40" fontSize="24px" fontWeight={500}>
            200
          </Typography>
          <Stack direction="row" alignItems="center">
            <ArrowDropLeftLineIcon color="#097122" size={20} />
            <Typography color="#097122" fontSize="10px" lineHeight="16px">
              +6%
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row" width="114px">
        <LineChart />
      </Stack>
    </Stack>
  );
}
