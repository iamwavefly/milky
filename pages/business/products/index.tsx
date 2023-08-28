import React from "react";
import Dashboard from "@/layouts/dashboard";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import ProductsTable from "@/components/business/products/productTable";

export default function Index() {
  return (
    <Dashboard title="Products">
      <ProductsTable />
    </Dashboard>
  );
}
