import React, { useEffect, useState } from "react";
import { accountTypes } from "@/utils/signup";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountTypePanel from "../accountTypePanel";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import AddIcon from "@/public/icons/add.svg";
import { useFormik } from "formik";
import { contactInformation } from "@/schema";
import { reload, setDrawalState } from "@/store/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { selectUserState } from "@/store/authSlice";

interface Props {
  nextStep: () => void;
}

export default function ContactInformation({ nextStep }: Props) {
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/onboarding/contact/information`
  );

  const userDetails = useSelector(selectUserState).user;

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
      nextStep();
    }
  }, [data]);

  useEffect(() => {
    const { first_name, last_name, mobile_number } = userDetails;
    formik.setValues({
      firstName: first_name,
      lastName: last_name,
      phoneNumber: mobile_number,
    });
  }, [userDetails]);

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Box bgcolor="#FFF">
          <Box px="40px" pt="29px" pb="40px">
            <Stack spacing="24px" mt="16px">
              <Stack direction="row" spacing="24px">
                <TextField
                  label="First name"
                  variant="outlined"
                  fullWidth
                  name="firstName"
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
                  variant="outlined"
                  fullWidth
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Stack>
              <TextField
                label="Phone number"
                variant="outlined"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="+23480000000"
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </Stack>
          </Box>
          <Stack
            spacing="28px"
            justifyContent="flex-end"
            alignItems="center"
            direction="row"
            px="40px"
            py="16px"
            borderTop="1px solid #E8EAED"
          >
            <Button
              variant="text"
              sx={{ p: 0, fontWeight: 600, bgcolor: "transparent !important" }}
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={loading}
              disabled={!(formik.isValid && formik.dirty)}
            >
              Save & Continue
            </LoadingButton>
          </Stack>
        </Box>
        {/* <Stack
          direction="row"
          mt="23px"
          spacing="6px"
          alignItems="center"
          sx={{ cursor: "pointer" }}
        >
          <AddIcon width="18px" height="18px" fill="#0048B1" />
          <Typography
            color="#0048B1"
            fontSize="14px"
            fontWeight={600}
            lineHeight="22px"
          >
            Add another contact
          </Typography>
        </Stack> */}
      </form>
    </Box>
  );
}
