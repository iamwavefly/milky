import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { bankDetails, newCustomer, newPaymentLink } from "@/schema";
import { setDrawalState } from "@/store/appSlice";
import { LoadingButton } from "@mui/lab";
import { Box, MenuItem, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function NewPaymentLink({ reload }: any) {
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/payment/link/new`
  );

  const paymentTypes = useFetch(
    `${baseUrl}/dashboard/payment/link/types`,
    "get"
  );

  const dispatch = useDispatch();
  const close = () => dispatch(setDrawalState({ active: false }));

  useEffect(() => {
    paymentTypes?.handleSubmit();
  }, []);

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
      linkName: "",
      description: "",
      paymentType: "",
      amount: "",
    },
    validationSchema: newPaymentLink,
    onSubmit: ({ linkName, description, amount, paymentType }) => {
      const payload = {
        name: linkName,
        description: description,
        amount,
        payment_type: paymentType,
      };
      handleSubmit(payload);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing="13px">
        <TextField
          label="Link Name*"
          variant="standard"
          name="linkName"
          value={formik.values.linkName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.linkName && Boolean(formik.errors.linkName)}
          helperText={formik.touched.linkName && formik.errors.linkName}
        />
        <TextField
          label="Description"
          variant="standard"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          label="Payment Type*"
          variant="standard"
          name="paymentType"
          value={formik.values.paymentType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.paymentType && Boolean(formik.errors.paymentType)
          }
          helperText={formik.touched.paymentType && formik.errors.paymentType}
          select
        >
          {paymentTypes?.data?.payment_link_types?.map(
            ({ payment_link_name, code, id }: any) => (
              <MenuItem sx={{ width: "100%" }} key={id} value={code}>
                {payment_link_name}
              </MenuItem>
            )
          )}
        </TextField>
        <TextField
          label="Amount*"
          variant="standard"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          helperText={formik.touched.amount && formik.errors.amount}
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
          Add Payment Link
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
