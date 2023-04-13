import React, { CSSProperties, ReactNode } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import FilterIcon from "../../public/assets/icons/filter.svg";

interface props {
  children: ReactNode;
  header?: string | ReactNode;
  size?: string | number;
  alignHeader?: string;
  height?: string;
  filter?: boolean;
  width?: string | CSSProperties;
}

export default function OnlyHeader({
  children,
  header,
  size,
  alignHeader,
  filter,
  ...props
}: any) {
  return (
    <Box
      bgcolor="#fff"
      minHeight="171px"
      height="auto"
      display="grid"
      gridTemplateRows="56px 1fr"
      {...props}
    >
      <Box
        height="56px"
        display="flex"
        justifyContent={filter ? "space-between" : alignHeader ?? "center"}
        alignItems="center"
        borderBottom="1px solid #E9EBF2"
        px="24px"
      >
        <Typography fontWeight={500} fontSize={size ?? "14px"}>
          {header}
        </Typography>
        {filter && (
          <IconButton sx={{ mr: "-5px" }}>
            <FilterIcon />
          </IconButton>
        )}
      </Box>
      <Box px="24px" py="33px" alignItems="center" height="auto" display="flex">
        {children}
      </Box>
    </Box>
  );
}
