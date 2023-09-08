import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { newVirtualAccount } from "@/schema";
import { LoadingButton } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function NewVirtualAccount({ reload, close }: any) {
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
      <Stack spacing="13px" px="40px" mt="32px">
        <TextField
          label="Bank Verification Number (BVN)"
          variant="outlined"
          name="bvn"
          value={formik.values.bvn}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bvn && Boolean(formik.errors.bvn)}
          helperText={formik.touched.bvn && formik.errors.bvn}
          inputProps={{ maxLength: 11 }}
          disabled
        />
      </Stack>
      <Stack
        position="sticky"
        bottom={0}
        left={0}
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
          Create virtual account
        </LoadingButton>
      </Stack>
    </form>
  );
}
