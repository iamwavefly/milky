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
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<any>({});
  const [isReady, setIsReady] = useState<undefined | boolean>(undefined);

  const { Form, id, subtitle, title } = onboardingForm[step - 1];

  const { percentage } = useSelector(selectAppState).reload;
  const { user, subsidiaries } = useSelector(selectUserState);
  const { is_email_verified } = user;
  const { business_type, verification_status } = subsidiaries;
  // percentage
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/onboarding/percentage`,
    "get"
  );

  // fetch business status
  useEffect(() => {
    handleSubmit();
  }, [percentage]);

  useEffect(() => {
    console.log({ data }, "stage");
  }, [data]);

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
