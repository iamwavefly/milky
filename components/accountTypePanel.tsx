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
      height="87px"
      padding="19px 16px 19px 21px"
      alignItems="center"
      direction="row"
      gap="10px"
      onClick={clickHandler}
      sx={{ cursor: "pointer" }}
    >
      <Box width="30px" height="35px" display="flex" alignItems="center">
        {icon}
      </Box>
      <Stack spacing="5px">
        <Typography
          color="#262B40"
          fontWeight={500}
          fontSize="16px"
          component="h2"
        >
          {title}
        </Typography>
        <Typography
          color="rgba(38, 43, 64, 0.8)"
          fontSize="14px"
          lineHeight="20px"
          component="p"
        >
          {subtitle}
        </Typography>
      </Stack>
    </Stack>
  );
}
