import Onboarding from "@/layouts/onboarding";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import Logo from "../public/images/logo.svg";
import EyeIcon from "../public/images/eye.svg";
import EyeCloseIcon from "../public/images/eye-close.svg";

export default function Index() {
  const [showStatus, setShowStatus] = useState(false);

  return showStatus ? (
    <Stack height="100vh">
      <Stack
        width="513px"
        height="100%"
        maxHeight="170px"
        bgcolor="#fff"
        mx="auto"
        my="auto"
        py="45px"
        alignItems="center"
      >
        <Typography fontWeight={500} fontSize="20px" lineHeight="28px">
          We sent an email 📤
        </Typography>
        <Typography
          fontSize="14px"
          lineHeight="20px"
          color="#92959F"
          mt="5px"
          textAlign="center"
          maxWidth="285px"
          mx="auto"
          mb="45px"
        >
          Check your email for a recovery link and reset your password
        </Typography>
        <Link href="/">
          <Button variant="outlined" fullWidth>
            Remember your password? Log in
          </Button>
        </Link>
      </Stack>
    </Stack>
  ) : (
    <Onboarding title="Forgot Password">
      <Typography fontWeight={500} fontSize="20px" lineHeight="28px">
        Forgot Password 🔐
      </Typography>
      <Typography
        fontSize="14px"
        lineHeight="20px"
        color="#92959F"
        mt="5px"
        textAlign="center"
        maxWidth="324px"
        mx="auto"
      >
        Enter your email address and we’ll send you a link to reset your
        password
      </Typography>
      <Stack mt="34px" width="100%" spacing="14px">
        <TextField label="Email Address" variant="standard" />
      </Stack>
      <Stack mt="36px" spacing="25px" width="100%">
        <Button
          onClick={() => setShowStatus(true)}
          variant="contained"
          fullWidth
        >
          Send recovery link
        </Button>
        <Link href="/">
          <Button variant="outlined" fullWidth>
            Remember your password? Log in
          </Button>
        </Link>
      </Stack>
    </Onboarding>
  );
}
