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
    <Onboarding title="Create an Account">
      <Typography fontWeight={500} fontSize="20px" lineHeight="28px">
        Create an Account
      </Typography>
      <Typography fontSize="14px" lineHeight="20px" color="#92959F" mt="5px">
        Enter your personal details to get started
      </Typography>
      <Stack mt="34px" width="100%" spacing="14px">
        <Stack spacing="20px" direction="row">
          <TextField label="First Name" variant="standard" sx={{ flex: 1 }} />
          <TextField label="Last Name" variant="standard" sx={{ flex: 1 }} />
        </Stack>
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
        />
      </Stack>
      <Stack mt="36px" spacing="25px" width="100%">
        <Button variant="contained" fullWidth>
          Next
        </Button>
        <Stack width="100%" direction="row" spacing="28px" alignItems="center">
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
    </Onboarding>
  );
}
