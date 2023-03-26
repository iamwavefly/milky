import Dashboard from "@/layouts/dashboard";
import { Divider, Stack, Typography } from "@mui/material";
import React from "react";

export default function Index() {
  return (
    <Dashboard title="Get Started">
      <Stack mt="88px" direction="row" justifyContent="center" spacing="67px">
        <Stack spacing="8px">
          <Typography
            fontSize="24px"
            fontWeight={500}
            color="#2E3192"
            lineHeight="32px"
          >
            Tell us about your business
          </Typography>
          <Typography fontSize="14px" color="rgba(38, 43, 64, 0.8)">
            A few more things to help us set up your dashboard
          </Typography>
        </Stack>
        <Divider orientation="vertical" />
      </Stack>
    </Dashboard>
  );
}
