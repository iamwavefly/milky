import React, { ReactNode, useEffect } from "react";
import {
  Box,
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

interface Props {
  children?: ReactNode;
  activePanel?: boolean;
  title?: string;
  desc?: string;
}

const AccountSetup = ({ children, title, desc, activePanel }: Props) => {
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
          direction="row"
          justifyContent="center"
          spacing="67px"
        >
          <Stack spacing="8px" maxWidth="415px">
            {title && (
              <Stack
                onClick={() => Router.back()}
                mb="30px"
                direction="row"
                alignItems="center"
                spacing="4px"
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
          </Stack>
          <Divider sx={{ height: "auto" }} orientation="vertical" />
          <Stack width="546px">{children}</Stack>
        </Stack>
      </Dashboard>
    </>
  );
};

export default AccountSetup;
