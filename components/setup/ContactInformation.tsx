import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { contactInformation, getStarted } from "@/schema";
import { reloadPercentage, setDrawalState } from "@/store/appSlice";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function ContactInformation() {
  const dispatch = useDispatch();

  const close = () => dispatch(setDrawalState({ active: false }));

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/onboarding/contact/information`
  );

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    validationSchema: contactInformation,
    onSubmit: ({ firstName, lastName, phoneNumber }) => {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        mobile_number: phoneNumber,
      };
      handleSubmit(payload);
    },
  });

  useEffect(() => {
    const { status, message } = data;
    if (status === "success") {
      dispatch(reloadPercentage());
      close();
    }
  }, [data]);

  return (
    <Box>
      <Typography
        fontSize="14px"
        color="rgba(38, 43, 64, 0.8)"
        lineHeight="20px"
      >
        Besides your business information, we need contact details of one person
        at the company. This can be the owner or anyone else we can contact when
        we need to.
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack mt="60px" spacing="13px">
          <TextField
            label="First Name"
            variant="standard"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            label="Last Name"
            variant="standard"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            label="Phone number"
            variant="standard"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
        </Stack>
        <LoadingButton
          loading={loading}
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: "60px" }}
        >
          Save Changes
        </LoadingButton>
      </form>
      <Button onClick={close} variant="outlined" fullWidth sx={{ mt: "25px" }}>
        Cancel
      </Button>
    </Box>
  );
}
