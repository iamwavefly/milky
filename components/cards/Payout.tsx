import { Box, Typography } from "@mui/material";
import React from "react";

interface props {
  title: string;
  amount: string;
}

export default function PayoutCard({ title, amount }: props) {
  return (
    <Box
      width="100%"
      height="auto"
      maxHeight="105px"
      border="1px solid #E4E8F2"
      sx={{ filter: "drop-shadow(0px 1px 2px rgba(0, 43, 18, 0.08))" }}
      padding="15px 20px"
    >
      <Typography color="#4B5563" fontSize="10px" fontWeight="500">
        {title}
      </Typography>
      <Typography
        color="#0A0903"
        fontSize="16px"
        mt="16px"
        fontWeight="500"
        display="flex"
        gap="3px"
      >
        <Typography fontWeight={500} color="#0A090380">
          NGN
        </Typography>
        {amount}
      </Typography>
      <Typography mt="2px" color="#2E3192" fontSize="12px" fontWeight="500">
        See breakdown
      </Typography>
    </Box>
  );
}
