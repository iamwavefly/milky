import React, { useEffect, useState } from "react";
import AccountSetup from "@/layouts/setup";
import { formStepLabel, onboardingForm } from "@/utils/signup";
import { Box } from "@mui/material";
import Stepper from "@/components/stepper";

export default function Index() {
  const [step, setStep] = useState(1);
  const { Form, id, subtitle, title } = onboardingForm[step - 1];

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <AccountSetup title={title} desc={subtitle} prevStep={prevStep} step={step}>
      <Form nextStep={nextStep} />
    </AccountSetup>
  );
}
