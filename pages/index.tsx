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
import { useState } from "react";
import Logo from "../public/images/logo.svg";
import EyeIcon from "../public/images/eye.svg";
import EyeCloseIcon from "../public/images/eye-close.svg";
import Router from "next/router";

export default function Index() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Onboarding title="Welcome back">
      <Typography fontWeight={500} fontSize="20px" lineHeight="28px">
        Welcome back to AlliancePay
      </Typography>
      <Typography fontSize="14px" lineHeight="20px" color="#92959F" mt="5px">
        Log in to your account to continue
      </Typography>
      <Stack mt="34px" width="100%" spacing="14px">
        <TextField label="Email Address" variant="standard" />
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
        />
      </Stack>
      <Typography fontSize="12px" mr="auto" mt="15px" lineHeight="18px">
        Forgot Password? <Link href="/forgot-password">Reset here</Link>
      </Typography>
      <Stack mt="36px" spacing="25px" width="100%">
        <Button variant="contained" fullWidth>
          Log In
        </Button>
        <Stack width="100%" direction="row" spacing="28px" alignItems="center">
          <Divider />
          <Typography fontSize="14px" fontWeight={500} lineHeight="20px">
            or
          </Typography>
          <Divider />
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
