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
  const [stepLabel, setStepLabel] = useState<any>(null);
  const [isComplete, setIsComplete] = useState(false);

  const { Form, id, subtitle, title } = stepLabel?.[step - 1] ?? {};

  const { reload } = useSelector(selectAppState);
  const { subsidiaries } = useSelector(selectUserState);
  const { business_type } = subsidiaries;
  // percentage
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/onboarding/percentage`,
    "get"
  );

  useEffect(() => {
    if (business_type?.toLowerCase() === "company" && step === 6) {
      return setIsComplete(true);
    }
    if (business_type?.toLowerCase() === "individual" && step === 5) {
      return setIsComplete(true);
    }
    setIsComplete(false);
  }, [step]);

  // set step to uncompleted page
  useEffect(() => {
    if (data?.data) {
      const {
        bank_information,
        personal_information,
        terms_and_condition,
        business_information,
        business_compliance,
      } = data?.data;
      if (business_type) {
        if (business_type?.toLowerCase() === "individual") {
          if (business_information !== 100) {
            setStep(1);
          } else if (bank_information !== 100) {
            setStep(2);
          } else if (personal_information !== 100) {
            setStep(3);
          } else if (terms_and_condition !== 100) {
            setStep(4);
          } else {
            setStep(5);
          }
        } else {
          if (personal_information !== 100) {
            setStep(1);
          } else if (business_information !== 100) {
            setStep(2);
          } else if (business_compliance !== 100) {
            setStep(3);
          } else if (bank_information !== 100) {
            setStep(4);
          } else if (terms_and_condition !== 100) {
            setStep(5);
          } else {
            setStep(6);
          }
        }
      }
    }
  }, [data?.data, business_type]);

  // remove form based on business type
  useEffect(() => {
    if (business_type) {
      if (business_type?.toLowerCase() === "company") {
        // remove personal information
        const newLabel = onboardingForm.filter(({ id }) => id !== 5);
        return setStepLabel(newLabel);
      }
      // remove business registration, contact and business information
      const newLabel = onboardingForm?.filter(({ id }) => id !== 1 && id !== 3);
      setStepLabel(newLabel);
    }
  }, [business_type, onboardingForm]);

  // fetch business status
  useEffect(() => {
    handleSubmit();
  }, [reload]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <AccountSetup
      title={title}
      desc={subtitle}
      prevStep={prevStep}
      step={step}
      complete={isComplete}
    >
      {Form && <Form nextStep={nextStep} />}
    </AccountSetup>
  );
}
