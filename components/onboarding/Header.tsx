import { IconButton, Stack } from "@mui/material";
import React from "react";
import Logo from "@/public/icons/logo.svg";
import CloseIcon from "@/public/icons/close.svg";

export default function Header() {
  return (
    <Stack
      borderBottom="2px solid #E8EAED"
      padding="20px 120px"
      height="84px"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Logo />
      <IconButton>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
}
