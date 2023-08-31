import React, { CSSProperties, ReactNode } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import FilterIcon from "../../public/icons/filter.svg";

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
      border="1px solid #E8EAED"
      borderRadius="8px"
      {...props}
      overflow="hidden"
    >
      {header && (
        <Box
          height="56px"
          display="flex"
          justifyContent={filter ? "space-between" : alignHeader ?? "center"}
          alignItems="center"
          borderBottom="1px solid #E9EBF2"
          px="24px"
          bgcolor="#F9FAFB"
        >
          <Typography
            fontWeight={600}
            fontSize={"15px"}
            lineHeight="26px"
            color="#162031"
          >
            {header}
          </Typography>
          {filter && (
            <IconButton sx={{ mr: "-5px" }}>
              <FilterIcon />
            </IconButton>
          )}
        </Box>
      )}
      <Box
        px="24px"
        py="32px"
        alignItems="flex-start"
        justifyContent="start"
        height="auto"
        display="flex"
      >
        {children}
      </Box>
    </Box>
  );
}
