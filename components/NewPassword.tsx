import useFetch from "@/hooks/useFetch";
import Onboarding from "@/layouts/onboarding";
import baseUrl from "@/middleware/baseUrl";
import { forgotPassword, newPassword } from "@/schema";
import { LoadingButton } from "@mui/lab";
import {
  Collapse,
  Divider,
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
import InputCode from "./input/InputCode";

type NewPasswordProps = {
  identifier: string;
};

export default function NewPassword({ identifier }: NewPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/complete/forgot-password`
  );

  // form controller
  const formik = useFormik({
    initialValues: {
      otp: "",
      password: "",
      password2: "",
    },
    validationSchema: newPassword,
    onSubmit: ({ otp, password }) => {
      const payload = {
        identifier,
        otp: +otp?.replace(/[\s-]/g, ""),
        new_password: password,
      };
      handleSubmit(payload);
    },
  });

  useEffect(() => {
    if (data?.status === "success") {
      Router.push("/");
    }
  }, [data]);

  useEffect(() => {
    console.log(formik.values.otp);
  }, [formik.values.otp]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Onboarding
      title="Password Reset"
      subtitle="Kindly set up a new password for your account"
    >
      <form onSubmit={formik.handleSubmit}>
        <Stack mt="24px" width="100%">
          <InputCode
            label="Enter OTP"
            variant="outlined"
            name="otp"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.otp && Boolean(formik.errors.otp)}
            helperText={formik.touched.otp && formik.errors.otp}
            inputProps={{ maxLength: 9 }}
          />
          <Collapse in={formik.values.otp.replace(/[\s-]/g, "").length === 6}>
            <Stack width="100%" gap="24px" mt="24px">
              <Divider />
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
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
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
                error={
                  formik.touched.password2 && Boolean(formik.errors.password2)
                }
                helperText={formik.touched.password2 && formik.errors.password2}
              />
            </Stack>
          </Collapse>
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
