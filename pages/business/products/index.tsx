import React from "react";
import Dashboard from "@/layouts/dashboard";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import ProductsTable from "@/components/business/products/settlementTable";

export default function Index() {
  return (
    <Dashboard title="Products">
      <Stack px="30px" mt="20px">
        <Typography fontSize="16px" color="#2E3192">
          Products
        </Typography>
      </Stack>
      <Box mt="20px" px="30px">
        <ProductsTable />
      </Box>
    </Dashboard>
  );
}
