import React from "react";
import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
// icons
import CopyIcon from "../public/icons/copy.svg";
import DownloadIcon from "../public/icons/download-color.svg";
import clipboard from "@/helper/clipboard";
import truncate from "@/helper/truncate";

interface props {
  title: string;
  variant?: "copy" | "download" | "img" | "status" | string;
  value: string;
  full?: boolean;
}

export default function Detail({ title, full, variant, value }: props) {
  const copyTextHandler = (text: string) => {
    clipboard(text);
  };

  return (
    <Box width={full ? "100%" : "max-content"} minWidth="180px">
      <Typography
        color="#586379"
        fontSize="10px"
        fontWeight={600}
        lineHeight="18px"
        letterSpacing="0.3px"
        textTransform="uppercase"
      >
        {title}
      </Typography>
      <Box mt="4px">
        {variant === "copy" ? (
          <Stack direction="row" spacing="4px" alignItems="center">
            <Typography
              color="#070F1C"
              lineHeight="24px"
              fontWeight={500}
              fontSize="14px"
            >
              {typeof value === "string" ? truncate(value, 50) : value}
            </Typography>
            {/* <IconButton onClick={() => copyTextHandler(value)}>
              <CopyIcon />
            </IconButton> */}
          </Stack>
        ) : variant === "download" ? (
          <Stack direction="row" spacing="4px" alignItems="center">
            <Typography
              color="#070F1C"
              lineHeight="24px"
              fontWeight={500}
              fontSize="14px"
            >
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
