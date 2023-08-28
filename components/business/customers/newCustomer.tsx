import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { bankDetails, newCustomer } from "@/schema";
import { setDrawalState } from "@/store/appSlice";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

interface Props {
  reload: () => void;
  close: () => void;
}

export default function NewCustomer({ reload, close }: Props) {
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/customer/create`
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const { status, message } = data;
    if (status === "success") {
      close();
      reload();
    }
  }, [data]);
  // form controller
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
    },
    validationSchema: newCustomer,
    onSubmit: ({ firstName, lastName, phoneNumber, emailAddress }) => {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email: emailAddress,
        mobile: phoneNumber,
      };
      handleSubmit(payload);
    },
  });

  return (
    <Box position="relative" height="100%">
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing="24px" pt="32px" px="40px">
          <Stack direction="row" alignItems="center" spacing="24px">
            <TextField
              label="First Name"
              variant="outlined"
              name="firstName"
              fullWidth
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              label="Last name"
              variant="outlined"
              name="lastName"
              fullWidth
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Stack>
          <TextField
            label="Email Address"
            variant="outlined"
            name="emailAddress"
            value={formik.values.emailAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.emailAddress && Boolean(formik.errors.emailAddress)
            }
            helperText={
              formik.touched.emailAddress && formik.errors.emailAddress
            }
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            name="phoneNumber"
            placeholder="+2348000000000"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
        </Stack>
        <Stack
          direction="row"
          spacing="28px"
          px="40px"
          py="16px"
          mt="44px"
          borderTop="1px solid #E8EAED"
          alignItems="center"
          justifyContent="flex-end"
        >
          <LoadingButton variant="text" onClick={close}>
            Cancel
          </LoadingButton>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={loading}
            disabled={!(formik.isValid && formik.dirty)}
          >
            Add Customer
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
}
