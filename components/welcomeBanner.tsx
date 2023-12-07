import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Banner from "../public/assets/images/money-phone-hand.svg";

export default function WelcomeBanner({ name }: { name: string }) {
  return (
    <Stack
      bgcolor="#5153A4"
      height="98px"
      width="100%"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box my="auto" ml="24px">
        <Typography variant="h3" color="#fff">
          Hello, {name}!
        </Typography>
        <Typography variant="h5" color="#fff">
          Welcome back to Arca
        </Typography>
      </Box>
      <Box marginRight="-42px">
        <Banner />
      </Box>
    </Stack>
  );
}
