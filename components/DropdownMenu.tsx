import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import CarretIcon from "../public/icons/carret-down.svg";

export default function DropdownMenu({ title }: { title: string }) {
  return (
    <Stack
      minWidth="103px"
      height="40px"
      bgcolor="#fff"
      border="1px solid #E4E8F2"
      direction="row"
    >
      <Box
        width="67px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRight="1px solid #E4E8F2"
      >
        <Typography fontSize="12px" color="#262B40">
          {title}
        </Typography>
      </Box>
      <IconButton sx={{ flex: 1 }}>
        <CarretIcon />
      </IconButton>
    </Stack>
  );
}
