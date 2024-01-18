import React from "react";
import Dashboard from "@/layouts/dashboard";
import InvoiceTable from "@/components/business/invoices/InvoiceTable";

export default function Index() {
  return (
    <Dashboard title="Invoice">
      <InvoiceTable />
    </Dashboard>
  );
}
