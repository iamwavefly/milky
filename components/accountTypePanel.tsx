import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Styles from "./accountType.module.scss";

export default function AccountTypePanel({
  title,
  subtitle,
  icon,
  clickHandler,
  active,
}: {
  title: string;
  subtitle: string;
  icon: any;
  clickHandler: any;
  active: boolean;
}) {
  return (
    <Stack
      className={`${Styles.container} ${active ? Styles.active : ""}`}
      height="79px"
      padding="16px"
      alignItems="center"
      direction="row"
      gap="12px"
      onClick={clickHandler}
    >
      <Box
        className={Styles.icon}
        width="30px"
        height="35px"
        display="flex"
        alignItems="center"
      >
        {icon}
      </Box>
      <Stack>
        <Typography
          color="#070F1C"
          fontWeight={500}
          fontSize="15px"
          component="h2"
          lineHeight="26px"
        >
          {title}
        </Typography>
        <Typography
          color="#3C4453"
          fontSize="13px"
          lineHeight="21px"
          letterSpacing="0.195px"
          component="p"
          whiteSpace="nowrap"
        >
          {subtitle}
        </Typography>
      </Stack>
    </Stack>
  );
}
