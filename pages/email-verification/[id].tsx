import React, { useEffect, useLayoutEffect } from "react";
import useFetch from "@/hooks/useFetch";
import Onboarding from "@/layouts/onboarding";
import baseUrl from "@/middleware/baseUrl";
import { Box, Button, Stack, Typography } from "@mui/material";
import Router, { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-hot-toast";

export default function EmailVerification() {
  const { asPath } = useRouter();
  const emailId = asPath.split("/")?.pop();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/resend/verification/email?email=${emailId}`,
    "get"
  );

  useEffect(() => {
    if (data?.status?.toLowerCase() === "success") {
      toast.success(data?.message);
    }
  }, [data]);

  const resendHandler = () => handleSubmit();

  return (
    <Onboarding>
      <Stack alignItems="center">
        <Typography fontSize="15px" fontWeight={500} letterSpacing="0.3px">
          VERIFY YOUR EMAIL ADDRESS
        </Typography>
        <Typography
          fontSize="14px"
          letterSpacing="0.14px"
          lineHeight="24px"
          mt="12px"
          color="#3C4453"
          textAlign="center"
        >
          Click on the verification link we sent to your email address. You can
          resend the link if you didn’t get it.
        </Typography>
        <Box mt="40px" width={"100%"}>
          <LoadingButton
            loading={loading}
            variant="contained"
            fullWidth
            onClick={resendHandler}
          >
            Send link
          </LoadingButton>
        </Box>
      </Stack>
    </Onboarding>
  );
}
