import useFetch from "@/hooks/useFetch";
import { MenuProps } from "@/interfaces";
import baseUrl from "@/middleware/baseUrl";
import { bankDetails, newCustomer, newUser } from "@/schema";
import { setDrawalState } from "@/store/appSlice";
import { LoadingButton } from "@mui/lab";
import { Box, MenuItem, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function NewUser({ reload }: { reload: () => void }) {
  const [countries, setCountries] = useState<any>([]);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/create-user`
  );
  // countries
  const fetchCountries = useFetch(
    `${baseUrl}/dashboard/service/countries`,
    "get"
  );
  // role
  const roles = useFetch(`${baseUrl}/dashboard/service/roles`, "get");

  const dispatch = useDispatch();
  const close = () => dispatch(setDrawalState({ active: false }));

  useEffect(() => {
    console.log({ data });
    const { status, message } = data;
    if (status === "success") {
      reload();
      close();
    }
  }, [data]);
  // fetch countries
  useEffect(() => {
    fetchCountries.handleSubmit();
  }, []);
  // fetch roles
  useEffect(() => {
    roles.handleSubmit();
  }, []);
  // filter allowed countries
  useEffect(() => {
    const fileredCountries = fetchCountries?.data?.data?.filter(
      ({ allowed }: { allowed: boolean }) => allowed
    );
    setCountries(fileredCountries);
  }, [fetchCountries?.data]);

  // form controller
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      country: "",
      role: "",
    },
    validationSchema: newUser,
    onSubmit: (form) => {
      const payload = {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.emailAddress,
        mobile_number: form.phoneNumber,
        country: form.country,
        role: form.role,
      };
      handleSubmit(payload);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing="13px">
        <TextField
          label="First Name*"
          variant="standard"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          label="Last name"
          variant="standard"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          label="Email Address*"
          variant="standard"
          name="emailAddress"
          value={formik.values.emailAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.emailAddress && Boolean(formik.errors.emailAddress)
          }
          helperText={formik.touched.emailAddress && formik.errors.emailAddress}
        />
        <TextField
          label="Phone Number"
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
        <TextField
          label="Country"
          variant="standard"
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.country && Boolean(formik.errors.country)}
          helperText={formik.touched.country && formik.errors.country}
          select
        >
          {countries?.map(({ name, id, short_name }: MenuProps) => (
            <MenuItem sx={{ width: "100%" }} key={id} value={short_name}>
              {name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Role"
          variant="standard"
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.role && Boolean(formik.errors.role)}
          helperText={formik.touched.role && formik.errors.role}
          select
        >
          {roles?.data?.data?.map(({ name, id }: MenuProps) => (
            <MenuItem sx={{ width: "100%" }} key={id} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <Stack spacing="25px" mt="60px">
        <LoadingButton
          variant="contained"
          fullWidth
          type="submit"
          loading={loading}
          disabled={!(formik.isValid && formik.dirty)}
        >
          Add User
        </LoadingButton>
        <LoadingButton variant="outlined" fullWidth onClick={close}>
          Cancel
        </LoadingButton>
      </Stack>
    </form>
  );
}
