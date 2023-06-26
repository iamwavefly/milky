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
import BackArrow from "remixicon-react/ArrowDropLeftLineIcon";
import Dashboard from "./dashboard";
import Router from "next/router";
import { LoadingButton } from "@mui/lab";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import { toast } from "react-hot-toast";

interface Props {
  children?: ReactNode;
  activePanel?: boolean;
  isReady?: boolean;
  title?: string;
  desc?: string;
}

const AccountSetup = ({
  children,
  title,
  desc,
  activePanel,
  isReady,
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
      <Dashboard title="Get Started">
        <Stack
          mb="85px"
          mt="88px"
          px="32px"
          direction="row"
          justifyContent="center"
          spacing="67px"
        >
          <Stack spacing="8px" maxWidth="415px">
            {title && (
              <Stack
                mb="30px"
                direction="row"
                alignItems="center"
                spacing="4px"
                onClick={() => Router.push("/onboarding")}
              >
                <IconButton
                  sx={{
                    width: "22px",
                    height: "22px",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  <BackArrow size={28} />
                </IconButton>
                <Typography color="#69696B" fontSize="10px">
                  Back
                </Typography>
              </Stack>
            )}
            <Typography
              fontSize="24px"
              fontWeight={500}
              color="#2E3192"
              lineHeight="32px"
              mt="69px"
            >
              {title ?? "Tell us about your business"}
            </Typography>
            <Collapse in={activePanel || Boolean(desc)}>
              <Typography fontSize="14px" color="rgba(38, 43, 64, 0.8)">
                {desc ?? "A few more things to help us set up your dashboard"}
              </Typography>
            </Collapse>
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
          <Divider sx={{ height: "auto" }} orientation="vertical" />
          <Stack width="546px">{children}</Stack>
        </Stack>
      </Dashboard>
    </>
  );
};

export default AccountSetup;
