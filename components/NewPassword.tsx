import useFetch from "@/hooks/useFetch";
import Onboarding from "@/layouts/onboarding";
import baseUrl from "@/middleware/baseUrl";
import { forgotPassword } from "@/schema";
import { LoadingButton } from "@mui/lab";
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EyeIcon from "@/public/icons/eye.svg";
import EyeCloseIcon from "@/public/icons/eye-close.svg";
import Router from "next/router";

export default function NewPassword() {
  const [showPassword, setShowPassword] = useState(false);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/forgot-password`
  );

  // form controller
  const formik = useFormik({
    initialValues: {
      otp: "",
      password: "",
      password2: "",
    },
    validationSchema: forgotPassword,
    onSubmit: ({ otp }) => {
      const payload = {
        identifier: "richard@techdev.work",
        otp: "057901",
        new_password: "Qwert123$",
      };
      handleSubmit(payload);
    },
  });

  useEffect(() => {
    if (data?.status === "success") {
      Router.push("/");
    }
  }, [data]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Onboarding
      title="PASSWORD RESET"
      subtitle="Kindly set up a new password for your account"
    >
      <form onSubmit={formik.handleSubmit}>
        <Stack mt="24px" width="100%" spacing="24px">
          <TextField
            type="number"
            label="OTP"
            variant="outlined"
            name="otp"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.otp && Boolean(formik.errors.otp)}
            helperText={formik.touched.otp && formik.errors.otp}
          />
          <TextField
            type={showPassword ? "text" : "password"}
            label="New password"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    sx={{ border: 0 }}
                    edge="end"
                  >
                    {!showPassword ? <EyeCloseIcon /> : <EyeIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            type={showPassword ? "text" : "password"}
            label="Confirm new password"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    sx={{ border: 0 }}
                    edge="end"
                  >
                    {!showPassword ? <EyeCloseIcon /> : <EyeIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            name="password2"
            value={formik.values.password2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password2 && Boolean(formik.errors.password2)}
            helperText={formik.touched.password2 && formik.errors.password2}
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
            Reset password
          </LoadingButton>
        </Stack>
      </form>
    </Onboarding>
  );
}
