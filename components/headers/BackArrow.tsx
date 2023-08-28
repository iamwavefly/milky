import {
  Box,
  Button,
  IconButton,
  Stack,
  StackProps,
  StyledComponentProps,
  Typography,
} from "@mui/material";
import Router from "next/router";
import React from "react";
import ArrowLeftIcon from "../../public/icons/arrow-left.svg";

type BackArrowProps = {
  title?: boolean;
} & StackProps;

export default function BackArrow({ title, ...others }: BackArrowProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing="12px"
      mb="18px"
      {...others}
    >
      <IconButton
        onClick={() => Router.back()}
        sx={{
          width: "28px",
          height: "28px",
          bgcolor: "#fff",
          border: "1px solid #E8EAED",
          padding: "5px",
        }}
      >
        <ArrowLeftIcon width="18px" height="18px" />
      </IconButton>
      <Typography
        fontSize="18px"
        mb="18px"
        color="#162031"
        lineHeight="26px"
        fontWeight={600}
      >
        {title}
      </Typography>
    </Stack>
  );
}
