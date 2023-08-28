import Stepper from "@/components/WyrrStepper";
import { formStepLabel } from "@/utils/invoice";
import { Box } from "@mui/material";
import React, { useState } from "react";

export default function NewInvoice() {
  const [step, setStep] = useState(0);

  const { name, Form } = formStepLabel[step];

  const nextStepHandler = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <Box>
      <Box padding="24px 40px">
        <Stepper activeStep={step} steps={formStepLabel} alternativeLabel />
      </Box>
      <Box>
        <Form nextStep={nextStepHandler} />
      </Box>
    </Box>
  );
}
