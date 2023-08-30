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
import Footer from "./Footer";

interface NewUserProps {
  reload: () => void;
  close: () => void;
}

export default function NewUser({ reload, close }: NewUserProps) {
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
      <Stack spacing="24px" px="40px" mt="32px">
        <TextField
          label="First Name*"
          variant="outlined"
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
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          label="Email Address*"
          variant="outlined"
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
          variant="outlined"
          name="phoneNumber"
          placeholder="+23480000000000"
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
          variant="outlined"
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
          variant="outlined"
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
      <Footer
        type="submit"
        loading={loading}
        disabled={!(formik.isValid && formik.dirty)}
      >
        Add User
      </Footer>
    </form>
  );
}
