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
        Set a New Password 🔐
      </Typography>
      <Typography fontSize="14px" lineHeight="20px" color="#92959F" mt="5px">
        Kindly enter and set up a new password for your account.
      </Typography>
      <Stack mt="34px" width="100%" spacing="14px">
        <TextField
          type={showPassword ? "text" : "password"}
          label="New Password"
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
          label="Confirm new password"
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
      <Link href="/" style={{ width: "100%" }}>
        <Button
          sx={{ mt: "36px", width: "100%" }}
          variant="contained"
          fullWidth
        >
          Reset Password
        </Button>
      </Link>
    </Onboarding>
  );
}
