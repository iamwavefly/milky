import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Styles from "./pageLoader.module.scss";
import { Box } from "@mui/material";
import Image from "next/image";
import Loader from "@/public/images/loader.gif";

const PageLoader = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return loading ? (
    <Box className={Styles.container}>
      {/* <Image src={Loader} alt="arca loader" width={200} height={200} /> */}
    </Box>
  ) : null;
};

export default PageLoader;
