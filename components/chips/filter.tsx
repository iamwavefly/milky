import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "../../public/icons/close.svg";
import React from "react";

export default function ChipFilter({
  title,
  placeholder,
  onClick,
}: {
  title: string;
  placeholder: string;
  onClick: (e: any) => void;
}) {
  return (
    <Stack
      direction="row"
      width="max-width"
      alignItems="center"
      spacing="max-width"
      height="34px"
      border="1px solid #E4E8F2"
      pl="12px"
    >
      <Stack direction="row" spacing="4px">
        <Typography variant="h6" color="#B9BADB">
          {placeholder}:
        </Typography>
        <Typography color="#262B40" variant="h6">
          {title}
        </Typography>
      </Stack>
      <IconButton onClick={onClick}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
}
