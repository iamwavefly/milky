import React, { useEffect, useState } from "react";
import "@/styles/global.scss";
import theme from "@/theme/mui";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { wrapper } from "../store/store";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import ProtectRoutes from "@/middleware/protectRoutes";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUserState } from "@/store/authSlice";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/colors.scss";
import { Toaster } from "react-hot-toast";

function App({ Component, pageProps }: AppProps) {
  const token = Cookies.get("token");
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

  useEffect(() => {
    const fetchUserProfile = () => {
      handleSubmit();
    };
    token && fetchUserProfile();
  }, [token]);

  useEffect(() => {
    if (data?.user) {
      dispatch(
        setUserState({
          user: data?.user,
          notifications: data?.notifications,
          subsidiaries: data?.subsidiary_details?.subsidiaries[0],
        })
      );
    }
  }, [data]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <ProtectRoutes>
          <Toaster />
          <Component {...pageProps} />
        </ProtectRoutes>
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(App);
