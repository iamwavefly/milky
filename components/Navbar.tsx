import { Box, Stack, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
}

const Navbar = ({ children, title }: Props) => {
  return (
    <Stack
      height="40px"
      direction="row"
      justifyContent="space-between"
      alignItems="flex-end"
    >
      <Typography
        variant="h4"
        fontSize="18px"
        color="#070F1C"
        fontWeight={600}
        lineHeight="26px"
      >
        {title}
      </Typography>
      <Box>{children}</Box>
    </Stack>
  );
};

export default Navbar;
