import React, { useEffect, useLayoutEffect, useState } from "react";
import "@/styles/global.scss";
import theme from "@/theme/mui";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { wrapper } from "../store/store";
import ProtectRoutes from "@/middleware/protectRoutes";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUserState } from "@/store/authSlice";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/colors.scss";
import { Toaster } from "react-hot-toast";
import Router from "next/router";
import PageLoader from "@/components/PageLoader";
import { selectAppState } from "@/store/appSlice";

function App({ Component, pageProps }: AppProps) {
  const token = Cookies.get("token");

  const { reload } = useSelector(selectAppState);
  // user profile req
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/me`,
    "get"
  );

  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({
      once: false,
      mirror: false,
    });
  }, []);

  useLayoutEffect(() => {
    if ((Router?.pathname === "/" || Router?.pathname === "/signup") && token) {
      Router?.push("/dashboard");
    }
  }, [token]);

  useLayoutEffect(() => {
    const fetchUserProfile = () => {
      handleSubmit();
    };
    token && fetchUserProfile();
  }, [token, reload]);

  useEffect(() => {
    if (data?.user) {
      const defaultBusiness = data?.subsidiary_details?.subsidiaries?.find(
        (business: { is_default: boolean }) => business
      );
      dispatch(
        setUserState({
          user: data?.user,
          notifications: data?.notifications,
          subsidiaries: defaultBusiness,
        })
      );
    }
  }, [data]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <ProtectRoutes>
          <PageLoader />
          <Toaster
            toastOptions={{
              duration: 3000,
            }}
          />
          <Component {...pageProps} />
        </ProtectRoutes>
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(App);
