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

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { storeConfig, persistor } from "@/store/store";

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      once: false,
      mirror: false,
    });
  }, []);

  return (
    <>
      <Provider store={storeConfig}>
        <PersistGate loading={null} persistor={persistor}></PersistGate>
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
      </Provider>
    </>
  );
}

export default App;
