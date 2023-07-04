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

export default function NewPaymentLink({ reload, details }: any) {
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/payment/link/${details ? "edit" : "new"}`
  );

  const paymentTypes = useFetch(
    `${baseUrl}/dashboard/payment/link/types`,
    "get"
  );

  const currencies = useFetch(`${baseUrl}/dashboard/service/currencies`, "get");

  useEffect(() => {
    currencies?.handleSubmit();
  }, []);

  const dispatch = useDispatch();
  const close = () => dispatch(setDrawalState({ active: false }));

  useEffect(() => {
    paymentTypes?.handleSubmit();
  }, []);

  useEffect(() => {
    const { status, message } = data;
    if (status === "Success") {
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
      currency: "",
      limit: "",
    },
    validationSchema: newPaymentLink,
    onSubmit: ({
      linkName,
      description,
      amount,
      paymentType,
      limit,
      currency,
    }) => {
      const payload = {
        name: linkName,
        description: description,
        amount,
        limit,
        currency,
        payment_type: paymentType,
        payment_link_id: details ? details?.id : undefined,
      };
      handleSubmit(payload);
    },
  });

  useEffect(() => {
    if (details) {
      const linkType = paymentTypes?.data?.payment_link_types?.find(
        (type: any) => type.payment_link_name === details?.payment_type
      )?.code;
      formik.setFieldValue("linkName", details?.name);
      formik.setFieldValue("paymentType", linkType);
      formik.setFieldValue("amount", details?.amount);
      formik.setFieldValue("limit", details?.limit);
    }
  }, [details, paymentTypes?.data]);

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
          label="Limit"
          variant="standard"
          name="limit"
          type="number"
          value={formik.values.limit}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.limit && Boolean(formik.errors.limit)}
          helperText={formik.touched.limit && formik.errors.limit}
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
        {/* currencies */}
        <TextField
          label="Currency"
          variant="standard"
          sx={{ flex: 1 }}
          name="currency"
          value={formik.values.currency}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.currency && Boolean(formik.errors.currency)}
          helperText={formik.touched.currency && formik.errors.currency}
          select
        >
          {currencies?.data?.data
            ?.filter((cur: { is_allowed: boolean }) => cur.is_allowed)
            .map(({ short_name, id }: any) => (
              <MenuItem value={short_name} key={id} sx={{ width: "100%" }}>
                {short_name}
              </MenuItem>
            ))}
        </TextField>
        {/* currencies */}
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
          {details ? "Update" : "Add"} Payment Link
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
