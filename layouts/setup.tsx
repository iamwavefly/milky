import React, { ReactNode, useEffect } from "react";
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

interface Props {
  children?: ReactNode;
  activePanel?: boolean;
  isReady?: boolean;
  title?: string;
  desc?: string;
  step: number;
  prevStep: () => void;
}

const AccountSetup = ({
  children,
  title,
  desc,
  step,
  isReady,
  prevStep,
}: Props) => {
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/onboarding/complete`,
    "get"
  );

  if (data?.status?.toLowerCase() === "success") {
    toast.success(data?.message);
    Router.push("/dashboard");
  }

  const requestLiveHandler = () => {
    handleSubmit();
  };

  return (
    <>
      <Head>
        <title>{title} | alliancepay</title>
        <meta name="description" content="Alliancepay Merchant" />
      </Head>
      <Dashboard title="Get Started" onboarding>
        <Box
          padding="32px"
          position="sticky"
          top={0}
          left={0}
          bgcolor="#F6F6F9"
          zIndex={2}
        >
          <Stepper activeStep={step} steps={formStepLabel} />
        </Box>
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
            {isReady && (
              <LoadingButton
                onClick={requestLiveHandler}
                sx={{ mt: "49px !important", width: "max-content" }}
                variant="contained"
                loading={loading}
              >
                Request to go live
              </LoadingButton>
            )}
          </Stack>
          <Stack width="515px" mt="48px" overflow="auto">
            {children}
          </Stack>
        </Stack>
      </Dashboard>
    </>
  );
};

export default AccountSetup;
