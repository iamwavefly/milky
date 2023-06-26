import React, { ReactNode, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Head from "next/head";
import Logo from "../public/images/logo.svg";

interface Props {
  children?: ReactNode;
  title: string;
}

const Onboarding = ({ children, title, ...props }: any) => {
  return (
    <>
      <Head>
        <title>{title} | alliancepay</title>
        <meta name="description" content="Alliancepay Merchant" />
      </Head>
      <Stack
        px="106px"
        direction="row"
        height="100vh"
        justifyContent="space-between"
        bgcolor="#F7F9FC"
      >
        <Box height="100vh">
          <Box mt="71px" maxWidth="140px" height="45px">
            <Logo />
          </Box>
          <Box my="252px">
            <Typography fontWeight={700} fontSize="40px" lineHeight="48px">
              Welcome to Alliance Pay
            </Typography>
            <Typography
              fontSize="16px"
              lineHeight="24px"
              mt="9px"
              color="#92959F"
            >
              The future of payments
            </Typography>
          </Box>
        </Box>
        <Box height="100vh" overflow="auto" className="noscroll-indicator">
          <Stack
            bgcolor="#fff"
            width="513px"
            maxWidth="513px"
            height="auto"
            my="auto"
            {...props}
          >
            <Stack
              flex={1}
              padding="45px 36px"
              alignItems="center"
              width="-webkit-fill-available"
            >
              {children}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default Onboarding;
