import useFetch from "@/hooks/useFetch";
import { MenuProps, UserProps } from "@/interfaces";
import baseUrl from "@/middleware/baseUrl";
import { bankDetails, newCustomer, newUser } from "@/schema";
import { setDrawalState } from "@/store/appSlice";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import Footer from "./Footer";

interface NewUserProps {
  reload: () => void;
  close: () => void;
  user?: UserProps;
  editRoleOnly?: boolean;
}

export default function NewUser({
  reload,
  close,
  user,
  editRoleOnly,
}: NewUserProps) {
  const [countries, setCountries] = useState<any>([]);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/create-user`
  );
  // update user role request
  const userRoleApi = useFetch(
    `${baseUrl}/dashboard/user/update`,
    "post"
  );
  // countries
  const fetchCountries = useFetch(
    `${baseUrl}/dashboard/service/countries`,
    "get"
  );
  // role
  const roles = useFetch(`${baseUrl}/dashboard/service/roles`, "get");

  const reloadPage = () => {
    reload();
    close();
  };

  useEffect(() => {
    const { status } = data;
    if (status === "success") {
      reloadPage();
    }
  }, [data]);
  // check userRoleApi status
  useEffect(() => {
    const { status } = userRoleApi?.data;
    if (status === "success") {
      reloadPage();
    }
  }, [userRoleApi?.data]);
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
      if (editRoleOnly) {
        return userRoleApi?.handleSubmit({ role: form.role });
      }
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

  useEffect(() => {
    if (user) {
      formik.setFieldValue("role", user.role);
    }
  }, [user]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing="24px" px="40px" mt="32px">
        {!editRoleOnly && (
          <>
            <TextField
              label="First Name*"
              variant="outlined"
              name="firstName"
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
                formik.touched.emailAddress &&
                Boolean(formik.errors.emailAddress)
              }
              helperText={
                formik.touched.emailAddress && formik.errors.emailAddress
              }
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
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
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
          </>
        )}
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
      {/* roles & permission */}
      <Stack
        mt="40px"
        padding="16px 40px"
        bgcolor="#F6F6F9"
        borderTop="1px solid #DADCE2"
        spacing="6px"
      >
        {/* role & permission*/}
        {roles?.data?.data?.map(
          ({ id, name, descriptions }: MenuProps, index: number) => {
            return (
              <>
                <Stack
                  key={id}
                  direction="row"
                  alignItems="center"
                  height="66px"
                  gap="54px"
                >
                  {/* role */}
                  <Box width="161px">
                    <Typography
                      color="#162031"
                      fontSize="14px"
                      fontWeight={500}
                    >
                      {name}
                    </Typography>
                  </Box>
                  <Box width="100%">
                    <Typography
                      color="#586379"
                      fontSize="13px"
                      lineHeight="21px"
                    >
                      {descriptions}
                    </Typography>
                  </Box>
                </Stack>
                {index < roles?.data?.data.length - 1 && <Divider />}
              </>
            );
          }
        )}
      </Stack>
      {/* footer */}
      <Footer
        type="submit"
        loading={loading || userRoleApi?.loading}
        disabled={!(formik.isValid && formik.dirty)}
      >
        {editRoleOnly ? "Save" : "Invite user"}
      </Footer>
    </form>
  );
}
