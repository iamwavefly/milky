import React from "react";
import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
// icons
import CopyIcon from "../public/icons/copy.svg";
import DownloadIcon from "../public/icons/download-color.svg";

interface props {
  title: string;
  variant?: "copy" | "download" | "img" | "status" | string;
  value: string;
  full?: boolean;
}

export default function Detail({ title, full, variant, value }: props) {
  return (
    <Box width={full ? "100%" : "max-content"}>
      <Typography
        color="#6E7280"
        fontSize="10px"
        fontWeight={600}
        lineHeight="16px"
      >
        {title}
      </Typography>
      <Box mt="2px">
        {variant === "copy" ? (
          <Stack direction="row" spacing="4px" alignItems="center">
            <Typography color="#262B40" fontWeight={500} fontSize="14px">
              {value}
            </Typography>
            <IconButton>
              <CopyIcon />
            </IconButton>
          </Stack>
        ) : variant === "download" ? (
          <Stack direction="row" spacing="4px" alignItems="center">
            <Typography color="#262B40" fontWeight={500} fontSize="14px">
              {value}
            </Typography>
            <IconButton>
              <DownloadIcon />
            </IconButton>
          </Stack>
        ) : variant === "img" ? (
          <Stack direction="row" spacing="4px" alignItems="center">
            {value}
            <IconButton>
              <DownloadIcon />
            </IconButton>
          </Stack>
        ) : variant === "status" ? (
          <Chip
            className={`chip ${value?.toLowerCase()?.replaceAll(" ", "-")}`}
            label={value}
          />
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}
