import useFetch from "@/hooks/useFetch";
import { stakeholderProps } from "@/interfaces";
import baseUrl from "@/middleware/baseUrl";
import { stakeholder } from "@/schema";
import { LoadingButton } from "@mui/lab";
import { MenuItem, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const gender = ["Male", "Female"];

interface NewStakeholderProps {
  close: () => void;
  reload: () => void;
  details: stakeholderProps;
}

const defaultStakeholder = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  gender: "",
  dob: "",
  bvn: "",
};

export default function NewStakeholder({
  close,
  reload,
  details,
}: NewStakeholderProps) {
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/onboarding/stakeholder/add`
  );

  const updateStakeholder = useFetch(
    `${baseUrl}/dashboard/onboarding/stakeholder/update`,
    "patch"
  );

  const fetchPersonalInformation = useFetch(
    `${baseUrl}/dashboard/onboarding/personal/information/view`,
    "get"
  );

  useEffect(() => {
    fetchPersonalInformation.handleSubmit();
  }, []);
  // form controller
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      gender: "",
      dob: "",
      bvn: "",
    },
    validationSchema: stakeholder,
    onSubmit: ({ bvn, dob, firstName, gender, lastName, phoneNumber }) => {
      let payload: any = {
        first_name: firstName,
        last_name: lastName,
        gender,
        date_of_birth: dob,
        mobile_number: phoneNumber,
        bvn,
      };
      if (details) {
        payload.id = details.id;
        return updateStakeholder?.handleSubmit(payload);
      }
      handleSubmit(payload);
    },
  });

  useEffect(() => {
    if (details) {
      const {
        first_name,
        last_name,
        mobile_number,
        bvn,
        date_of_birth,
        gender,
      } = details;
      formik.setValues({
        firstName: first_name,
        lastName: last_name,
        phoneNumber: mobile_number,
        gender,
        dob: new Date(date_of_birth).toISOString().slice(0, 10),
        bvn,
      });
    } else {
      formik.setValues(defaultStakeholder);
    }
  }, [details]);

  useEffect(() => {
    if (fetchPersonalInformation?.data?.data) {
      const { bvn } = fetchPersonalInformation?.data?.data;
      formik.setFieldValue("bvn", bvn);
    }
  }, [fetchPersonalInformation?.data]);

  const resetState = () => {
    close();
    reload();
    formik.resetForm();
  };

  useEffect(() => {
    const { status } = data;
    if (status === "success") {
      resetState();
    }
  }, [data]);

  useEffect(() => {
    const { status } = updateStakeholder?.data;
    if (status === "success") {
      resetState();
    }
  }, [updateStakeholder?.data]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing="24px" px="40px" mt="32px">
        <Stack direction="row" spacing="24px">
          <TextField
            label="First name"
            variant="outlined"
            fullWidth
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            label="Last name"
            variant="outlined"
            fullWidth
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Stack>
        <Stack direction="row" spacing="24px">
          <TextField
            label="Gender"
            variant="outlined"
            fullWidth
            select
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
          >
            {gender?.map((name: string, index: number) => (
              <MenuItem value={name} key={index} sx={{ width: "100%" }}>
                {name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Date of birth"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="date"
            name="dob"
            value={formik.values.dob}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dob && Boolean(formik.errors.dob)}
            helperText={formik.touched.dob && formik.errors.dob}
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
            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
          }
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />
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
          loading={loading || updateStakeholder?.loading}
          disabled={!(formik.isValid && formik.dirty)}
        >
          {details ? "Update" : "Add"} stakeholder
        </LoadingButton>
      </Stack>
    </form>
  );
}
