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
import EyeIcon from "../public/icons/eye.svg";
import EyeCloseIcon from "../public/icons/eye-close.svg";
import Router from "next/router";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import {
  clearCacheHandler,
  loginHandler,
  logoutHandler,
  logoutWTokenHandler,
} from "@/middleware/auth";
import { LoadingButton } from "@mui/lab";
import { setLogout, setUserState } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import ReactCodeInput from "react-code-input";
import Cookies from "js-cookie";

const props = {
  inputStyle: {
    margin: "4px",
    borderRadius: "6px",
    fontSize: "14px",
    width: "48px",
    height: "48px",
    textAlign: "center",
    color: "#69696B",
    border: "1px solid rgba(150, 152, 200, 0.2)",
  },
  inputStyleInvalid: {
    fontFamily: "monospace",
    margin: "4px",
  },
};

export default function Index() {
  const [authReq, setAuthReq] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setotp] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const [subsidiaryId, setSubsidiaryId] = useState(0);
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}${authReq ? "/dashboard/complete/login" : "/dashboard/login"}`
  );

  const dispatch = useDispatch();

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
      email: form?.email,
      subsidiary_id: subsidiaryId,
      otp,
    };
    // check and remove token
    const tempToken = Cookies.get("token");
    if (tempToken) {
      clearCacheHandler();
      return logoutWTokenHandler();
    }

    // req
    if (!authReq) {
      return handleSubmit(form);
    }
    handleSubmit(payload);
  };

  useEffect(() => {
    const { message, token } = data ?? {};
    const defaultBusiness = data?.subsidiary_details?.subsidiaries?.find(
      (business: { is_default: boolean }) => business?.is_default
    );
    setSubsidiaryId(defaultBusiness?.id);
    if (token?.access_token) {
      dispatch(
        setUserState({
          user: data?.user,
          subsidiaries: defaultBusiness,
        })
      );
      loginHandler(data);
    } else if (message && message?.toLowerCase().includes("otp")) {
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
    <Onboarding title="LOGIN">
      <form onSubmit={handleLogin}>
        <Stack width="100%" gap="24px">
          <TextField
            label="Email address"
            variant="outlined"
            value={form.email}
            name="email"
            onChange={onChangeHandler}
          />
          <TextField
            type={showPassword ? "text" : "password"}
            label="Password"
            variant="outlined"
            value={form.password}
            name="password"
            onChange={onChangeHandler}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    sx={{ border: 0, padding: "5px", left: "3px" }}
                    edge="start"
                  >
                    {showPassword ? <EyeCloseIcon /> : <EyeIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Typography
          fontSize="14px"
          mt="8px"
          lineHeight="24px"
          textAlign="right"
          color="#162031"
        >
          Forgot password?
        </Typography>
        <Stack mt="36px" spacing="8px" width="100%">
          <LoadingButton
            variant="contained"
            fullWidth
            disabled={disabled}
            loading={loading as boolean}
            type="submit"
            onClick={handleLogin}
          >
            Log In
          </LoadingButton>
          <Typography
            fontSize="14px"
            color="#162031"
            letterSpacing="0.14px"
            textAlign="center"
            mx="auto"
          >
            Don’t have an account?{" "}
            <Typography
              color="#0048B1"
              fontWeight="600"
              fontSize="14px"
              component="span"
            >
              <Link href="/signup">Sign up</Link>
            </Typography>
          </Typography>
        </Stack>
      </form>
    </Onboarding>
  );
}
