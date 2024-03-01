import { Box } from "@mui/material";
import React, { ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import Router, { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import useFetch from "@/hooks/useFetch";
import baseUrl from "./baseUrl";

const authRoutes = ["/", "/reset-password"];

interface Props {
  children: ReactNode;
}

export default function ProtectRoutes({ children }: Props) {
  const token = Cookies.get("token");
  const { pathname } = useRouter();
  const dispatch = useDispatch();

  return <Box>{children}</Box>;
}
