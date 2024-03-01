import React, { useEffect } from "react";
import "@/styles/global.scss";
import theme from "@/theme/mui";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { wrapper } from "../store/store";
import ProtectRoutes from "@/middleware/protectRoutes";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/colors.scss";
import { Toaster } from "react-hot-toast";

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      once: false,
      mirror: false,
    });
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <ProtectRoutes>
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
