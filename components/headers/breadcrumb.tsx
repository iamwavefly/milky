import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import Router from "next/router";
import React from "react";
import ArrowLeftIcon from "../../public/assets/icons/arrow-left.svg";
import DownloadIcon from "../../public/assets/icons/download.svg";

export default function Breadcrumb({
  title,
  download,
}: {
  title?: string;
  download?: boolean;
}) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row" alignItems="center">
        <IconButton onClick={() => Router.back()}>
          <ArrowLeftIcon />
        </IconButton>
        <Typography fontSize="14px" ml="5px">
          {title}
        </Typography>
      </Stack>
      {download && (
        <Button variant="contained">
          Download all <DownloadIcon />
        </Button>
      )}
    </Stack>
  );
}
