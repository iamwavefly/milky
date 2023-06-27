import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import {
  bankDetails,
  newCustomer,
  newPaymentLink,
  newVirtualAccount,
} from "@/schema";
import { setDrawalState } from "@/store/appSlice";
import { LoadingButton } from "@mui/lab";
import { Box, MenuItem, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function NewVirtualAccount({ reload }: any) {
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/create/static/account`
  );

  const fetchPersonalInformation = useFetch(
    `${baseUrl}/dashboard/onboarding/personal/information/view`,
    "get"
  );
  useEffect(() => {
    fetchPersonalInformation.handleSubmit();
  }, []);

  const dispatch = useDispatch();
  const close = () => dispatch(setDrawalState({ active: false }));

  useEffect(() => {
    const { status, message } = data;
    if (status === "success") {
      reload();
      close();
    }
  }, [data]);
  // form controller
  const formik = useFormik({
    initialValues: {
      bvn: "",
    },
    validationSchema: newVirtualAccount,
    onSubmit: ({ bvn }) => {
      const payload = {
        bvn,
      };
      handleSubmit(payload);
    },
  });

  useEffect(() => {
    if (fetchPersonalInformation?.data?.data) {
      const { bvn } = fetchPersonalInformation?.data?.data;
      formik.setValues({
        bvn,
      });
    }
  }, [fetchPersonalInformation?.data]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing="13px">
        <TextField
          label="BVN*"
          variant="standard"
          name="bvn"
          value={formik.values.bvn}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bvn && Boolean(formik.errors.bvn)}
          helperText={formik.touched.bvn && formik.errors.bvn}
          inputProps={{ maxLength: 11 }}
        />
      </Stack>
      <Stack spacing="25px" mt="60px">
        <LoadingButton
          variant="contained"
          fullWidth
          type="submit"
          loading={loading}
          disabled={!(formik.isValid && formik.dirty)}
        >
          Create Virtual Account
        </LoadingButton>
        <LoadingButton
          variant="outlined"
          fullWidth
          onClick={close}
          disabled={!(formik.isValid && formik.dirty)}
        >
          Cancel
        </LoadingButton>
      </Stack>
    </form>
  );
}
