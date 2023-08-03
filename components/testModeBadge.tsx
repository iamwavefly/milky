import { selectUserState } from "@/store/authSlice";
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ArrowRight from "remixicon-react/ArrowRightSLineIcon";

export default function TestModeBadge() {
  const [url, setUrl] = useState("/onboarding");
  const { business_type } = useSelector(selectUserState)?.subsidiaries ?? {};

  useEffect(() => {
    if (business_type) {
      const newUrl = `/onboarding/setup?type=${
        business_type?.toLowerCase() === "company"
          ? "registered"
          : "unregistered"
      }`;
      setUrl(newUrl);
    }
  }, [business_type]);

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
          href={url}
          style={{ fontWeight: 500, color: "#fff", fontSize: "12px" }}
        >
          Get started
        </Link>
        <ArrowRight size={18} color="#fff" />
      </Stack>
    </Stack>
  );
}
