/* eslint-disable react-hooks/exhaustive-deps */
import AccountTypePanel from "@/components/accountTypePanel";
import Dashboard from "@/layouts/dashboard";
import {
  Box,
  Button,
  Collapse,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UserIcon from "remixicon-react/User6LineIcon";
import FileIcon from "remixicon-react/FileList2LineIcon";
import AccountSetup from "@/layouts/setup";
import Router from "next/router";
import { useFormik } from "formik";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { MenuProps } from "@/interfaces";
import { getStarted } from "@/schema";
import { LoadingButton } from "@mui/lab";

const panels = [
  {
    id: 1,
    name: "Unregistered/Individual",
    subtitle: "An unregistered business e.g freelancers and sole traders",
    icon: <UserIcon size={"38"} color="#69696B" />,
  },
  {
    id: 2,
    name: "Registered",
    subtitle: "A registered business with a corporate bank account",
    icon: <FileIcon size={"38"} color="#69696B" />,
  },
];

export default function Index() {
  const [activePanel, setActivePanel] = useState<undefined | number>(undefined);
  const [countries, setCountries] = useState([]);

  const nextRoute = () => {
    Router.push(
      `/onboarding/setup?type=${
        activePanel === 2 ? "registered" : "unregistered"
      }`
    );
  };

  // business types
  const fetchBusinessType = useFetch(`${baseUrl}/business/categories`, "get");
  // business sizes
  const fetchBusinessSizes = useFetch(`${baseUrl}/business/sizes`, "get");
  // business countries
  const fetchCountries = useFetch(`${baseUrl}/service/countries`, "get");
  // business countries
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/business/get-started`
  );

  // fetch business type
  useEffect(() => {
    fetchBusinessType.handleSubmit();
  }, []);

  // fetch business sizes
  useEffect(() => {
    fetchBusinessSizes.handleSubmit();
  }, []);

  // fetch countries
  useEffect(() => {
    fetchCountries.handleSubmit();
  }, []);

  // filter allowed countries
  useEffect(() => {
    const fileredCountries = fetchCountries?.data?.data?.filter(
      ({ allowed }: { allowed: boolean }) => allowed
    );
    setCountries(fileredCountries);
  }, [fetchCountries?.data]);

  // go to next page if submission successful
  useEffect(() => {
    data?.status === "success" && nextRoute();
  }, [data]);

  const formik = useFormik({
    initialValues: {
      businessName: "",
      businessLocation: "",
      businessSize: "",
      businessCategory: "",
      referralCode: "",
    },
    validationSchema: getStarted,
    onSubmit: ({
      businessName,
      businessLocation,
      businessSize,
      businessCategory,
      referralCode,
    }) => {
      const payload = {
        business_name: businessName,
        country: businessLocation,
        business_size: businessSize,
        business_type: activePanel === 1 ? "Individual" : "Company",
        business_category: businessCategory,
        referal_code: referralCode,
      };
      handleSubmit(payload);
    },
  });

  return (
    <AccountSetup activePanel={Boolean(activePanel !== undefined)}>
      <Stack gap="24px" padding="30px" bgcolor="#FFFFFF">
        {panels?.map(({ name, subtitle, id, icon }) => (
          <AccountTypePanel
            key={id}
            clickHandler={() => setActivePanel(id)}
            active={activePanel === id}
            title={name}
            subtitle={subtitle}
            icon={icon}
          />
        ))}
        <form onSubmit={formik.handleSubmit}>
          <Collapse in={Boolean(activePanel !== undefined)}>
            <Stack spacing="16px">
              <TextField
                variant="standard"
                label="Business/Company name"
                name="businessName"
                value={formik.values.businessName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.businessName &&
                  Boolean(formik.errors.businessName)
                }
                helperText={
                  formik.touched.businessName && formik.errors.businessName
                }
              />
              <TextField
                variant="standard"
                label="Location of business"
                select
                name="businessLocation"
                value={formik.values.businessLocation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.businessLocation &&
                  Boolean(formik.errors.businessLocation)
                }
                helperText={
                  formik.touched.businessLocation &&
                  formik.errors.businessLocation
                }
              >
                {countries?.map(({ name, id, short_name }: MenuProps) => (
                  <MenuItem sx={{ width: "100%" }} key={id} value={short_name}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
              <Stack direction="row" spacing="22px">
                <TextField
                  sx={{ flex: 1 }}
                  variant="standard"
                  label="Business size"
                  select
                  name="businessSize"
                  value={formik.values.businessSize}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.businessSize &&
                    Boolean(formik.errors.businessSize)
                  }
                  helperText={
                    formik.touched.businessSize && formik.errors.businessSize
                  }
                >
                  {fetchBusinessSizes?.data?.data?.map(
                    ({ name, id }: MenuProps) => (
                      <MenuItem sx={{ width: "100%" }} key={id} value={name}>
                        {name}
                      </MenuItem>
                    )
                  )}
                </TextField>
                <TextField
                  sx={{ flex: 1 }}
                  variant="standard"
                  label="Business category"
                  select
                  name="businessCategory"
                  value={formik.values.businessCategory}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.businessCategory &&
                    Boolean(formik.errors.businessCategory)
                  }
                  helperText={
                    formik.touched.businessCategory &&
                    formik.errors.businessCategory
                  }
                >
                  {fetchBusinessType?.data?.data?.map(
                    ({ name, id }: MenuProps) => (
                      <MenuItem sx={{ width: "100%" }} key={id} value={name}>
                        {name}
                      </MenuItem>
                    )
                  )}
                </TextField>
              </Stack>
              <TextField
                variant="standard"
                label="Referral code"
                name="referralCode"
                value={formik.values.referralCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.referralCode &&
                  Boolean(formik.errors.referralCode)
                }
                helperText={
                  formik.touched.referralCode && formik.errors.referralCode
                }
              />
            </Stack>
            <LoadingButton
              loading={loading}
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: "22px", flex: 1 }}
            >
              Proceed to my dashboard
            </LoadingButton>
          </Collapse>
        </form>
      </Stack>
    </AccountSetup>
  );
}
