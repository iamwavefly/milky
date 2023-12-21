import React, { useEffect, useLayoutEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import Onboarding from "@/layouts/onboarding";
import baseUrl from "@/middleware/baseUrl";
import { Box, Button, Stack, Typography } from "@mui/material";
import Router, { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-hot-toast";
import routes from "@/configs/routes";

export default function EmailVerification() {
  const [emailVerified, setEmailVerified] = useState(false);
  // Initialize the router
  const router = useRouter();
  // Extract the token from the URL path
  const { id } = router.query;

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/verify/business/email?token=${id}`,
    "get"
  );

  useEffect(() => {
    id && handleSubmit();
  }, [id]);

  useEffect(() => {
    if (data?.status?.toLowerCase() === "success") {
      toast.success(data?.message);
      setEmailVerified(true);
    }
  }, [data]);

  const LoginRoute = () => Router.push(routes.login);

  return (
    <Onboarding>
      <Stack alignItems="center">
        <Typography fontSize="15px" fontWeight={500} letterSpacing="0.3px">
          {emailVerified
            ? "EMAIL VERIFIED SUCCESSFULLY"
            : "EMAIL VERIFICATION IN PROGRESS"}
        </Typography>
        <Typography
          fontSize="14px"
          letterSpacing="0.14px"
          lineHeight="24px"
          mt="12px"
          color="#3C4453"
          textAlign="center"
        >
          {emailVerified
            ? "Your Email Address Has Been Successfully Verified"
            : "Please Wait While We Verify Your Email Address"}
        </Typography>
        <Box mt="40px" width={"100%"}>
          <LoadingButton
            loading={loading}
            variant="contained"
            fullWidth
            onClick={LoginRoute}
          >
            Login
          </LoadingButton>
        </Box>
      </Stack>
    </Onboarding>
  );
}
