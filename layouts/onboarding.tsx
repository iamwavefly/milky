import React, { ReactNode, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Head from "next/head";
import Logo from "../public/images/logo.svg";
import Header from "@/components/onboarding/Header";

interface Props {
  children?: ReactNode;
  title: string;
  fullWidth?: boolean;
  subtitle?: string;
}

const Onboarding = ({
  children,
  title,
  subtitle,
  fullWidth,
  ...props
}: any) => {
  return (
    <>
      <Head>
        <title>{title} | ARCA</title>
        <meta name="description" content="Alliancepay Merchant" />
      </Head>
      <Stack height="100vh" overflow="auto" bgcolor="rgba(246, 246, 249, 1)">
        <Header />
        {fullWidth ? (
          <Box pb="136px">{children}</Box>
        ) : (
          <Box
            bgcolor="#fff"
            width={"400px"}
            overflow="auto"
            borderRadius="8px"
            mt="48px"
            mx="auto"
            padding="40px"
            className="noscroll-indicator"
          >
            {title && (
              <Typography
                fontSize="15px"
                textTransform="uppercase"
                mx="auto"
                fontWeight={500}
                textAlign="center"
                color="#070F1C"
                letterSpacing="0.3px"
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                fontSize="13px"
                mx="auto"
                mt="4px"
                textAlign="center"
                color="#586379"
                lineHeight="21px"
                letterSpacing="0.195px"
              >
                {subtitle}
              </Typography>
            )}
            <Box mt={!title ? 0 : "24px"}>{children}</Box>
          </Box>
        )}
      </Stack>
    </>
  );
};

export default Onboarding;
