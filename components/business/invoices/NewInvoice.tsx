import Stepper from "@/components/WyrrStepper";
import useFetch from "@/hooks/useFetch";
import { InvoiceTypes } from "@/interfaces";
import baseUrl from "@/middleware/baseUrl";
import { formStepLabel } from "@/utils/invoice";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

type NewInvoiceProps = {
  invoice: InvoiceTypes;
};

export default function NewInvoice({ invoice }: NewInvoiceProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({});

  const { Form } = formStepLabel[step];

  const nextStepHandler = (data: {}) => {
    setForm(data);
    setStep((prev) => prev + 1);
  };

  return (
    <Box>
      <Box padding="24px 40px">
        <Stepper activeStep={step} steps={formStepLabel} alternativeLabel />
      </Box>
      <Box>
        <Form nextStep={nextStepHandler} form={form} invoice={invoice} />
      </Box>
    </Box>
  );
}
