import React, { useEffect, useState } from "react";
import AccountSetup from "@/layouts/setup";
import { formStepLabel, onboardingForm } from "@/utils/signup";
import { Box } from "@mui/material";
import Stepper from "@/components/WyrrStepper";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { useSelector } from "react-redux";
import { selectAppState } from "@/store/appSlice";
import { selectUserState } from "@/store/authSlice";

export default function Index() {
  const [step, setStep] = useState(2);
  const [status, setStatus] = useState<any>({});
  const [isReady, setIsReady] = useState<undefined | boolean>(undefined);
  const [stepLabel, setStepLabel] = useState<any>(null);

  const { Form, id, subtitle, title } = stepLabel?.[step - 1] ?? {};

  const { percentage } = useSelector(selectAppState).reload;
  const { user, subsidiaries } = useSelector(selectUserState);
  const { is_email_verified } = user;
  const { business_type, verification_status } = subsidiaries;
  // percentage
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/onboarding/percentage`,
    "get"
  );

  useEffect(() => {
    if (business_type) {
      if (business_type?.toLowerCase() === "company") {
        const newLabel = onboardingForm.filter(({ id }) => id !== 4);
        return setStepLabel(newLabel);
      }
      const newLabel = onboardingForm?.filter(({ id }) => id !== 1 && id !== 2);
      setStepLabel(newLabel);
    }
  }, [business_type, onboardingForm]);

  // fetch business status
  useEffect(() => {
    handleSubmit();
  }, [percentage]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <AccountSetup title={title} desc={subtitle} prevStep={prevStep} step={step}>
      {Form && <Form nextStep={nextStep} />}
    </AccountSetup>
  );
}
