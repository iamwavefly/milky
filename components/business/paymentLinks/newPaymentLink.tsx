import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { newPaymentLink } from "@/schema";
import { LoadingButton } from "@mui/lab";
import { Box, MenuItem, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import Router from "next/router";
import React, { useEffect } from "react";

export default function NewPaymentLink({ reload, details, close }: any) {
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

  useEffect(() => {
    paymentTypes?.handleSubmit();
  }, []);
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
    const { status } = data;
    if (status === "Success") {
      reload();
      close && close();
      formik.resetForm();
      if (details) Router.push("/business/payment-links");
    }
  }, [data]);

  useEffect(() => {
    if (details) {
      const linkType = paymentTypes?.data?.payment_link_types?.find(
        (type: any) => type.payment_link_name === details?.payment_type
      )?.code;
      formik.setFieldValue("linkName", details?.name);
      formik.setFieldValue("paymentType", linkType);
      formik.setFieldValue("amount", details?.amount);
      formik.setFieldValue("currency", details?.currency);
      formik.setFieldValue("limit", details?.limit);
      formik.setFieldValue("description", details?.descriptions);
    }
  }, [details, paymentTypes?.data]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing="24px" px="40px" mt="32px">
        <TextField
          label="Link Name"
          variant="outlined"
          name="linkName"
          value={formik.values.linkName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.linkName && Boolean(formik.errors.linkName)}
          helperText={formik.touched.linkName && formik.errors.linkName}
        />
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          multiline
          rows={5}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          label="Payment Type"
          variant="outlined"
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
        {formik.values.paymentType === "SUB" && (
          <TextField
            label="Limit"
            variant="outlined"
            name="limit"
            type="number"
            value={formik.values.limit}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.limit && Boolean(formik.errors.limit)}
            helperText={formik.touched.limit && formik.errors.limit}
          />
        )}
        {/* currencies */}
        <TextField
          label="Currency"
          variant="outlined"
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
          label="Amount"
          variant="outlined"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          helperText={formik.touched.amount && formik.errors.amount}
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
        bgcolor="#fff"
        zIndex={2}
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
          {details ? "Update" : "Create new"} Link
        </LoadingButton>
      </Stack>
    </form>
  );
}
