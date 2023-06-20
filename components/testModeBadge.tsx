import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import ArrowRight from "remixicon-react/ArrowRightSLineIcon";

export default function TestModeBadge() {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      bgcolor="#E15C56"
      height="40px"
      spacing="6px"
    >
      <Typography color="#FFFFFF" fontSize="12px" fontWeight={500}>
        You are currently in test mode, please submit your business information
        to start accepting payments.
      </Typography>
      <Stack direction="row" alignItems="center">
        <Link
          href={"/"}
          style={{ fontWeight: 500, color: "#fff", fontSize: "12px" }}
        >
          Get started
        </Link>
        <ArrowRight size={18} color="#fff" />
      </Stack>
    </Stack>
  );
}
