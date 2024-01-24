import NewPassword from "@/components/NewPassword";
import useFetch from "@/hooks/useFetch";
import Onboarding from "@/layouts/onboarding";
import baseUrl from "@/middleware/baseUrl";
import { forgotPassword } from "@/schema";
import { LoadingButton } from "@mui/lab";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Index() {
  const [showStatus, setShowStatus] = useState(false);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/forgot-password`
  );

  // form controller
  const formik = useFormik({
    initialValues: {
      emailAddress: "",
    },
    validationSchema: forgotPassword,
    onSubmit: ({ emailAddress }) => {
      const payload = {
        identifier: emailAddress,
      };
      handleSubmit(payload);
    },
  });

  useEffect(() => {
    if (data?.status === "success") {
      setShowStatus(true);
    }
  }, [data]);

  return !showStatus ? (
    <Onboarding
      title="Forgot Password"
      subtitle="Enter your email address, we’ll send you a link to reset your password"
    >
      <form onSubmit={formik.handleSubmit}>
        <Stack mt="24px" width="100%" spacing="14px">
          <TextField
            label="Email Address"
            variant="outlined"
            type="email"
            name="emailAddress"
            value={formik.values.emailAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.emailAddress && Boolean(formik.errors.emailAddress)
            }
            helperText={
              formik.touched.emailAddress && formik.errors.emailAddress
            }
          />
        </Stack>
        <Stack mt="40px" spacing="14px" width="100%">
          <LoadingButton
            variant="contained"
            fullWidth
            loading={loading}
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
          >
            Send link
          </LoadingButton>
          <Typography
            fontSize="14px"
            color="#162031"
            letterSpacing="0.14px"
            textAlign="center"
            mx="auto"
          >
            Rememeber your password?{" "}
            <Typography
              color="#0048B1"
              fontWeight="600"
              fontSize="14px"
              component="span"
            >
              <Link href="/">Login</Link>
            </Typography>
          </Typography>
        </Stack>
      </form>
    </Onboarding>
  ) : (
    <NewPassword identifier={formik.values.emailAddress} />
  );
}
