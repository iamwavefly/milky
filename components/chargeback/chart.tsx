import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CountChart from "../CountChart";

export default function Chart({ title }: { title: string }) {
  const [metric, setMetric] = useState<any>({});
  const [activeChart, setActiveChart] = useState<string | null>("overview");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setActiveChart(newAlignment);
  };

  return (
    <Box>
      <Stack>
        <Typography fontSize="16px" color="#2E3192">
          {title}
        </Typography>
      </Stack>
      {/* button group */}
      <ToggleButtonGroup
        sx={{ mt: "32px" }}
        value={activeChart}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value="overview">Overview</ToggleButton>
        <ToggleButton value="balance">Holding Balance</ToggleButton>
      </ToggleButtonGroup>
      {/*  */}
      <Typography mt="20px" fontSize="12px" color="rgba(38, 43, 64, 0.8)">
        This is the chargeback overview information
      </Typography>
      {/* balance charts */}
      <Box mt="20px">
        <Stack
          direction="row"
          bgcolor="#F3F3F9"
          padding="25px 39px 25px 32px"
          gap="45px"
          minHeight="105px"
        >
          <Box flex={1}>
            <CountChart
              title={"Remaining of your threshold"}
              value={metric?.count ?? 3000}
              change={metric?.count_change}
              withCurrency
            />
          </Box>
          <Divider sx={{ border: "1px solid #E4E8F2" }} />
          <Box flex={1}>
            <CountChart
              title={"Chargeback Value"}
              themeColor="#EA5851"
              value={metric?.volume ?? 5000}
              change={metric?.volume_change}
              withCurrency
            />
          </Box>
          <Divider sx={{ border: "1px solid #E4E8F2" }} />
          <Box flex={1}>
            <CountChart
              title={"Chargeback Count"}
              value={metric?.settlements ?? 4500}
              change={metric?.settlement_change}
              withCurrency
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
