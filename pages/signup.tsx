import Onboarding from "@/layouts/onboarding";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Stepper from "@/components/WyrrStepper";
import { formComponents, formStepLabel } from "@/utils/signup";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import Router from "next/router";
import EyeIcon from "@/public/icons/eye.svg";
import EyeCloseIcon from "@/public/icons/eye-close.svg";
import routes from "@/configs/routes";
import { newVirtualAccount, signup } from "@/schema";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { setUserState } from "@/store/authSlice";
import { loginHandler } from "@/middleware/auth";

export default function Index() {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/signup`
  );

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // form controller
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      businessName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signup,
    onSubmit: ({
      businessName,
      firstName,
      lastName,
      emailAddress,
      password,
    }) => {
      const payload = {
        name: businessName,
        first_name: firstName,
        last_name: lastName,
        user_email: emailAddress,
        password,
      };
      handleSubmit(payload);
    },
  });

  // save user details
  useEffect(() => {
    const { token } = data ?? {};
    if (token?.access_token) {
      dispatch(
        setUserState({
          user: data?.user,
          subsidiaries: data?.subsidiary_details?.subsidiaries[0],
        })
      );
      loginHandler(data);
    }
  }, [data]);

  // go to next page if submission successful
  useEffect(() => {
    if (data?.status === "success") {
      Router.push(`/email-verification/${formik.values.emailAddress}`);
    }
  }, [data]);

  return (
    <Onboarding title="Create an Account" my="72px" fullWidth>
      <Box>
        <Box
          width="515px"
          mx="auto"
          mt="48px"
          bgcolor="#FFF"
          border="1px solid #E8EAED"
          borderRadius="8px"
          pb="40px"
        >
          <Stack textAlign="center" justifyContent="center" px="40px" mt="40px">
            <Typography
              variant="subtitle1"
              fontWeight={500}
              fontSize="15px"
              letterSpacing="0.3px"
            >
              CREATE YOUR ACCOUNT
            </Typography>
          </Stack>
          <form onSubmit={formik.handleSubmit}>
            <Box px="40px">
              <Stack spacing="24px" mt="24px">
                <TextField
                  label="First name"
                  name="firstName"
                  variant="outlined"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
                <TextField
                  label="Last name"
                  name="lastName"
                  variant="outlined"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
                <TextField
                  label="Business / Company name"
                  name="businessName"
                  variant="outlined"
                  value={formik.values.businessName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.businessName &&
                    Boolean(formik.errors.businessName)
                  }
                  helperText={
                    formik.touched.businessName && formik.errors.businessName
                  }
                />
                <TextField
                  label="Email address"
                  type="email"
                  variant="outlined"
                  name="emailAddress"
                  value={formik.values.emailAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.emailAddress &&
                    Boolean(formik.errors.emailAddress)
                  }
                  helperText={
                    formik.touched.emailAddress && formik.errors.emailAddress
                  }
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          sx={{ right: "-13px" }}
                          edge="start"
                        >
                          {showPassword ? <EyeCloseIcon /> : <EyeIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Confirm password"
                  variant="outlined"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          sx={{ right: "-13px" }}
                          edge="start"
                        >
                          {showPassword ? <EyeCloseIcon /> : <EyeIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <Stack spacing="8px" mt="40px">
                <LoadingButton
                  fullWidth
                  variant="contained"
                  loading={loading}
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                >
                  Sign up
                </LoadingButton>
                <Button
                  variant="text"
                  sx={{ height: "32px" }}
                  onClick={() => Router.push(routes.login)}
                >
                  <Typography fontSize="14px" color="#162031">
                    Have an account
                  </Typography>
                  Login
                </Button>
              </Stack>
            </Box>
          </form>
        </Box>
      </Box>
    </Onboarding>
  );
}
