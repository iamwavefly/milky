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
import { loginHandler } from "@/middleware/auth";
import { LoadingButton } from "@mui/lab";

export default function Index() {
  const [authReq, setAuthReq] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setotp] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}${authReq ? "/login/complete" : "/login"}`
  );

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    // otp payload
    const payload = {
      email: form.email,
      otp,
    };
    // req
    if (!authReq) {
      return handleSubmit(form);
    }
    handleSubmit(payload);
  };

  useEffect(() => {
    const { message, token } = data ?? {};
    if (token?.access_token) {
      loginHandler(data);
    } else if (message && message.includes("otp")) {
      setAuthReq(true);
    } else {
      setAuthReq(false);
    }
  }, [data]);

  useEffect(() => {
    const { email, password } = form;
    if (email.length > 5 && password.length > 5) {
      return setDisabled(false);
    }
    setDisabled(true);
  }, [form]);

  return (
    <Onboarding title="Welcome back">
      <Typography fontWeight={500} fontSize="20px" lineHeight="28px">
        {authReq ? "Two factor authentication" : " Welcome back to AlliancePay"}
      </Typography>
      <Typography fontSize="14px" lineHeight="20px" color="#92959F" mt="5px">
        {authReq
          ? `A 6-digit PIN has been sent to your registered AlliancePay email address (${form.email?.substring(
              0,
              3
            )}*****${form.email?.substring(form.email.length - 5)})`
          : "Log in to your account to continue"}
      </Typography>
      <Stack mt="34px" width="100%" spacing="14px">
        <TextField
          label="Email Address"
          variant="standard"
          value={form.email}
          name="email"
          onChange={onChangeHandler}
        />
        <TextField
          type={showPassword ? "text" : "password"}
          label="Password"
          variant="standard"
          value={form.password}
          name="password"
          onChange={onChangeHandler}
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
        />
      </Stack>
      <Typography fontSize="12px" mr="auto" mt="15px" lineHeight="18px">
        Forgot Password? <Link href="/forgot-password">Reset here</Link>
      </Typography>
      <Stack mt="36px" spacing="25px" width="100%">
        <LoadingButton
          variant="contained"
          fullWidth
          disabled={disabled}
          loading={loading as boolean}
          onClick={handleLogin}
        >
          Log In
        </LoadingButton>
        <Stack width="100%" direction="row" spacing="28px" alignItems="center">
          <Divider sx={{ flex: 1 }} />
          <Typography fontSize="14px" fontWeight={500} lineHeight="20px">
            or
          </Typography>
          <Divider sx={{ flex: 1 }} />
        </Stack>
        <Button
          onClick={() => Router.push("/signup")}
          variant="outlined"
          fullWidth
        >
          Create an Account
        </Button>
      </Stack>
    </Onboarding>
  );
}
