import Header from "@/components/header";
import { Box, Stack, StackProps, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import Styles from "@/styles/layout.module.scss";
import Head from "next/head";

type LayoutProps = {
  children: ReactNode;
  title?: string;
} & StackProps;

export default function index({ children, title, ...others }: LayoutProps) {
  return (
    <Stack className={Styles.container} {...others}>
      <Head>
        <title>{title} | Milky</title>
        <meta name="description" content="Arca Merchant" />
      </Head>
      <Header />
      <Box>{children}</Box>
    </Stack>
  );
}
