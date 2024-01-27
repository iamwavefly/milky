import { IconButton, Stack } from "@mui/material";
import React from "react";
import Logo from "@/public/images/arca.png";
import CloseIcon from "@/public/icons/close.svg";
import Router from "next/router";
import Link from "next/link";
import Image from "next/image";

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
      <Link href="/">
        <Image src={Logo} width={88} height={40} alt="Arca Logo" />
      </Link>
      <Link href="https://arca.network/">
        <IconButton>
          <CloseIcon width="24px" height="24px" fill="#070F1C" />
        </IconButton>
      </Link>
    </Stack>
  );
}
