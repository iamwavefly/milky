import Onboarding from "@/layouts/onboarding";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "../public/images/logo.svg";
import EyeIcon from "../public/images/eye.svg";
import EyeCloseIcon from "../public/images/eye-close.svg";
import Router from "next/router";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { useFormik } from "formik";
import { getStarted, signup } from "@/schema";
import { LoadingButton } from "@mui/lab";

export default function Index() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { loading, data, error, handleSubmit } = useFetch(`${baseUrl}/dashboard/signup`);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: signup,
    onSubmit: ({ firstName, lastName, email, password }) => {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        user_email: email,
        password,
      };
      handleSubmit(payload);
    },
  });

  // go to next page if submission successful
  useEffect(() => {
    data?.status === "success" && Router.push("/onboarding");
  }, [data]);

  return (
    <Onboarding title="Create an Account">
      <Typography fontWeight={500} fontSize="20px" lineHeight="28px">
        Create an Account
      </Typography>
      <Typography fontSize="14px" lineHeight="20px" color="#92959F" mt="5px">
        Enter your personal details to get started
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack mt="34px" width="100%" spacing="14px">
          <Stack spacing="20px" direction="row">
            <TextField
              label="First Name"
              variant="standard"
              sx={{ flex: 1 }}
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              label="Last Name"
              variant="standard"
              sx={{ flex: 1 }}
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Stack>
          <TextField
            label="Email Address"
            variant="standard"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            type={showPassword ? "text" : "password"}
            label="Password"
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    sx={{ border: 0 }}
                    edge="start"
                  >
                    {showPassword ? <EyeCloseIcon /> : <EyeIcon />}
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
            label="Confirm Password"
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    sx={{ border: 0 }}
                    edge="start"
                  >
                    {showPassword ? <EyeCloseIcon /> : <EyeIcon />}
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
        <Stack mt="36px" spacing="25px" width="100%">
          <LoadingButton
            loading={loading}
            type="submit"
            variant="contained"
            fullWidth
            disabled={!(formik.isValid && formik.dirty)}
          >
            Next
          </LoadingButton>
          <Stack
            width="100%"
            direction="row"
            spacing="28px"
            alignItems="center"
          >
            <Divider sx={{ flex: 1 }} />
            <Typography fontSize="14px" fontWeight={500} lineHeight="20px">
              or
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Stack>
          <Button onClick={() => Router.push("/")} variant="outlined" fullWidth>
            Log In to your account
          </Button>
        </Stack>
      </form>
    </Onboarding>
  );
}
