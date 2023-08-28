import Onboarding from "@/layouts/onboarding";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
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
import { setUserState } from "@/store/authSlice";
import { loginHandler } from "@/middleware/auth";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import Stepper from "@/components/stepper";
import { accountTypes, formComponents, formStepLabel } from "@/utils/signup";
import AccountTypePanel from "@/components/accountTypePanel";

export default function Index() {
  const [activeStep, setActiveStep] = useState(0);

  const { Form } = formComponents[activeStep];

  const nextStepHandler = () => setActiveStep((prev) => prev + 1);

  return (
    <Onboarding title="Create an Account" my="72px" fullWidth>
      {/* stepper */}
      <Box
        padding="32px 120px"
        position="sticky"
        top={0}
        left={0}
        bgcolor="#F6F6F9"
      >
        <Stepper activeStep={activeStep} steps={formStepLabel} />
      </Box>
      <Box mx="auto" overflow="auto">
        {Form && <Form nextStep={nextStepHandler} />}
      </Box>
    </Onboarding>
  );
}
