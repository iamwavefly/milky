import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { newRefund } from "@/schema";
import { setDrawalState } from "@/store/appSlice";
import { LoadingButton } from "@mui/lab";
import { Box, MenuItem, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import Footer from "../form/Footer";

export default function NewRefund({ reload, close }: any) {
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/refund`
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const { status, message } = data;
    if (status === "Success") {
      toast.success(message);
      reload();
      close();
    }
  }, [data]);
  // form controller
  const formik = useFormik({
    initialValues: {
      amount: "",
      reference: "",
      reason: "",
    },
    validationSchema: newRefund,
    onSubmit: ({ amount, reason, reference }) => {
      const payload = [
        {
          transaction_reference: reference,
          amount,
          reason,
        },
      ];
      handleSubmit(payload);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing="24px" px="40px" mt="32px">
        <TextField
          label="Amount"
          variant="outlined"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          helperText={formik.touched.amount && formik.errors.amount}
        />
        <TextField
          label="Transaction reference"
          variant="outlined"
          name="reference"
          value={formik.values.reference}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.reference && Boolean(formik.errors.reference)}
          helperText={formik.touched.reference && formik.errors.reference}
        />
        <TextField
          label="Reason for refund"
          variant="outlined"
          name="reason"
          value={formik.values.reason}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.reason && Boolean(formik.errors.reason)}
          helperText={formik.touched.reason && formik.errors.reason}
        />
      </Stack>
      <Footer disabled={!(formik.isValid && formik.dirty)} loading={loading}>
        Confirm refund
      </Footer>
    </form>
  );
}
