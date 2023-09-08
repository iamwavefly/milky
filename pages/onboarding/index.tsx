import Onboarding from "@/layouts/onboarding";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Stepper from "@/components/WyrrStepper";
import { formComponents, formStepLabel } from "@/utils/signup";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";

export default function Index() {
  const [activeStep, setActiveStep] = useState(0);

  // percentage
  const onboardingStatus = useFetch(
    `${baseUrl}/dashboard/onboarding/percentage`,
    "get"
  );

  // fetch business status
  useEffect(() => {
    onboardingStatus.handleSubmit();
  }, []);

  const { Form } = formComponents[activeStep];

  const nextStepHandler = () => setActiveStep((prev) => prev + 1);

  return (
    <Onboarding title="Create an Account" my="72px" fullWidth>
      {/* stepper */}
      <Box
        padding="32px 120px"
        position="sticky"
        top={0}
        left={0}
        bgcolor="#F6F6F9"
      >
        <Stepper activeStep={activeStep} steps={formStepLabel} />
      </Box>
      <Box mx="auto" overflow="auto">
        {Form && <Form nextStep={nextStepHandler} />}
      </Box>
    </Onboarding>
  );
}
