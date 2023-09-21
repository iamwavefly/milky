import { IconButton, Stack } from "@mui/material";
import React from "react";
import Logo from "@/public/icons/logo.svg";
import CloseIcon from "@/public/icons/close.svg";
import Router from "next/router";
import Link from "next/link";

export default function Header() {
  return (
    <Stack
      position="sticky"
      top={0}
      left={0}
      borderBottom="2px solid #E8EAED"
      padding="20px 120px"
      height="84px"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="#F6F6F9"
      zIndex={2}
    >
      <Logo />
      <Link href="https://arca.network/">
        <IconButton>
          <CloseIcon width="24px" height="24px" fill="#070F1C" />
        </IconButton>
      </Link>
    </Stack>
  );
}
