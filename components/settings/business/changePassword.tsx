import useFetch from "@/hooks/useFetch";
import { MenuProps } from "@/interfaces";
import baseUrl from "@/middleware/baseUrl";
import { ChangePassword, settingBusiness } from "@/schema";
import { selectUserState } from "@/store/authSlice";
import { LoadingButton } from "@mui/lab";
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
import { useFormik } from "formik";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import EyeIcon from "../../../public/images/eye.svg";
import EyeCloseIcon from "../../../public/images/eye-close.svg";

export default function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { subsidiaries } = useSelector(selectUserState);

  // update business information endpoint
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/change-password`
  );

  useEffect(() => {
    const { status, message } = data;
    if (status === "success") {
      toast.success(message);
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      password2: "",
    },
    validationSchema: ChangePassword,
    onSubmit: ({ oldPassword, password, password2 }) => {
      const payload = {
        old_password: oldPassword,
        new_password: password,
      };
      handleSubmit(payload);
    },
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        {/* form fields */}
        <Stack spacing="16px">
          <TextField
            type={showPassword ? "text" : "password"}
            label="Current Password"
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
            name="oldPassword"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
            }
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
          />
          <TextField
            type={showPassword ? "text" : "password"}
            label="New password"
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
            name="password2"
            value={formik.values.password2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password2 && Boolean(formik.errors.password2)}
            helperText={formik.touched.password2 && formik.errors.password2}
          />
        </Stack>
        <Divider sx={{ mt: "60px" }} />
        <Stack
          direction="row"
          spacing="10px"
          mt="16px"
          ml="auto"
          justifyContent="flex-end"
        >
          <Button
            sx={{
              height: "40px",
              fontSize: "12px",
            }}
            variant="outlined"
          >
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={loading}
            sx={{
              height: "40px",
              fontSize: "12px",
            }}
            disabled={!(formik.isValid && formik.dirty)}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
}
