import React from "react";
import Dashboard from "@/layouts/dashboard";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import DropdownMenu from "@/components/DropdownMenu";
import CountChart from "@/components/CountChart";
import Header from "@/components/table/header";
import InvoiceTable from "@/components/business/invoices/InvoiceTable";
import CustomersTable from "@/components/business/customers/customersTable";
import ProductsTable from "@/components/business/products/productTable";
import VirtualAccountTable from "@/components/accounts/virtual/virtualAccountTable";

export default function Index() {
  return (
    <Dashboard title="Virtual account">
      <VirtualAccountTable />
    </Dashboard>
  );
}
