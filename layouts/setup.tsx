import React, { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Logo from "../public/images/logo.svg";
import BackArrow from "@/public/icons/arrow-left.svg";
import Dashboard from "./dashboard";
import Router from "next/router";
import { LoadingButton } from "@mui/lab";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import { toast } from "react-hot-toast";
import Stepper from "@/components/WyrrStepper";
import { formStepLabel } from "@/utils/signup";
import { useSelector } from "react-redux";
import { selectUserState } from "@/store/authSlice";

interface Props {
  children?: ReactNode;
  activePanel?: boolean;
  complete?: boolean;
  isReady?: boolean;
  title?: string;
  desc?: string;
  step: number;
  prevStep?: () => void;
}

const AccountSetup = ({
  children,
  title,
  desc,
  step,
  complete,
  isReady,
  prevStep,
}: Props) => {
  const [stepLabel, setStepLabel] = useState<typeof formStepLabel | null>(null);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/onboarding/complete`,
    "get"
  );

  const { business_type } = useSelector(selectUserState).subsidiaries;
  // redirect user to dashboard if request to go live is successful
  if (data?.status?.toLowerCase() === "success") {
    Router.push("/dashboard");
  }

  useEffect(() => {
    if (business_type) {
      if (business_type?.toLowerCase() === "company") {
        // remove personal information
        const newStepLabel = formStepLabel?.filter(({ id }) => id !== 6);
        return setStepLabel(newStepLabel);
      }
      // remove business registration, contact and business information
      const newStepLabel = formStepLabel?.filter(
        ({ id }) => id !== 2 && id !== 4
      );
      setStepLabel(newStepLabel);
    }
  }, [business_type]);

  const requestLiveHandler = () => {
    handleSubmit();
  };

  return (
    <>
      <Head>
        <title>{title} | Arca</title>
        <meta name="description" content="Arca Merchant" />
      </Head>
      <Dashboard title="Get Started" onboarding>
        <Box
          padding="32px 26px"
          position="sticky"
          top={0}
          left={0}
          bgcolor="#F6F6F9"
          zIndex={2}
        >
          <Stepper activeStep={step} steps={stepLabel as any} />
        </Box>
        {complete ? (
          <Stack
            alignItems="center"
            bgcolor="#fff"
            width={"400px"}
            overflow="auto"
            borderRadius="8px"
            mt="48px"
            mx="auto"
            padding="40px"
          >
            <Typography
              fontSize="15px"
              fontWeight={500}
              letterSpacing="0.3px"
              textTransform="uppercase"
            >
              Request to Go Live
            </Typography>
            <Typography
              fontSize="14px"
              letterSpacing="0.14px"
              lineHeight="24px"
              mt="12px"
              color="#3C4453"
              textAlign="center"
            >
              Congratulations on completing the compliance process! Your
              business is now ready to go live. Please submit your request below
            </Typography>
            <Box mt="40px" width={"100%"}>
              <LoadingButton
                loading={loading}
                variant="contained"
                fullWidth
                onClick={requestLiveHandler}
              >
                Submit Request
              </LoadingButton>
            </Box>
          </Stack>
        ) : (
          <Stack
            mb="85px"
            direction="row"
            justifyContent="space-between"
            pl="32px"
            pr="36px"
          >
            <Stack
              spacing="16px"
              maxWidth="435px"
              position="sticky"
              top={90}
              left={0}
              height="max-content"
            >
              {/* back arrow */}
              <IconButton
                onClick={prevStep}
                sx={{
                  width: "28px",
                  height: "28px",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "#FFF",
                  border: "1px solid #E8EAED",
                  padding: 0,
                  mt: "8px",
                  opacity: step < 2 ? 0 : 1,
                }}
              >
                <BackArrow width="18px" height="18px" />
              </IconButton>
              {/* title */}
              <Typography
                fontSize="18px"
                fontWeight={600}
                color="#070F1C"
                lineHeight="24px"
                mt="16px"
              >
                {title ?? "Tell us about your business"}
              </Typography>
              {/* subtitle */}
              <Typography fontSize="14px" color="#3C4453">
                {desc ?? "A few more things to help us set up your dashboard"}
              </Typography>
            </Stack>
            <Stack width="515px" mt="48px" overflow="auto">
              {children}
            </Stack>
          </Stack>
        )}
      </Dashboard>
    </>
  );
};

export default AccountSetup;
