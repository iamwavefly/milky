import React, { useEffect, useState } from "react";
import NewInvoice from "@/components/stepper/newInvoice";
import Dashboard from "@/layouts/dashboard";
import { Box, Stack, Typography } from "@mui/material";
import BusinessDetails from "@/components/form/newInvoice/businessDetails";
import InvoiceDetails from "@/components/form/newInvoice/invoiceDetails";
import NewProduct from "@/components/form/newInvoice/newProduct";

export default function Index() {
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState({});

  const formController = (newForm: {}) => {
    setForm((prev) => ({ ...prev, ...newForm }));
    setActiveStep((prev) => prev + 1);
  };

  const previousStep = () => setActiveStep((prev) => prev - 1);

  const forms = [
    <BusinessDetails onSubmit={formController} key={0} />,
    <InvoiceDetails
      onSubmit={formController}
      key={1}
      form={form}
      previous={previousStep}
    />,
  ];

  return (
    <Dashboard title="Create a new Product">
      <Stack mt="48px" mb="71px" mx="auto" alignItems="center">
        <Typography color="#2E3192" fontSize="20px" fontWeight={500}>
          Add a New Product
        </Typography>
        <Box mt="38px">
          <NewProduct />
        </Box>
      </Stack>
    </Dashboard>
  );
}
