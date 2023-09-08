import React, { useEffect, useState } from "react";
import { accountTypes } from "@/utils/signup";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountTypePanel from "../accountTypePanel";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import Router from "next/router";
import { selectUserState } from "@/store/authSlice";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { getStarted } from "@/schema";
import { MenuProps } from "@/interfaces";
import { LoadingButton } from "@mui/lab";

interface Props {
  nextStep: () => void;
}

export default function BusinessDetails({ nextStep }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [activePanel, setActivePanel] = useState<undefined | number>(1);
  const [countries, setCountries] = useState([]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { business_name, business_type, country } =
    useSelector(selectUserState).subsidiaries;

  const nextRoute = () => {
    Router.push(`/onboarding/setup`);
  };

  // business countries
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/business/get-started`
  );

  // go to next page if submission successful
  useEffect(() => {
    data?.status === "success" && nextRoute();
  }, [data]);

  // fetch business information
  const fetchBusinessInformation = useFetch(
    `${baseUrl}/dashboard/onboarding/business/information/view`,
    "get"
  );
  // business types
  const fetchBusinessType = useFetch(
    `${baseUrl}/dashboard/business/categories`,
    "get"
  );
  // business sizes
  const fetchBusinessSizes = useFetch(
    `${baseUrl}/dashboard/business/sizes`,
    "get"
  );
  // business countries
  const fetchCountries = useFetch(
    `${baseUrl}/dashboard/service/countries`,
    "get"
  );

  // fetch business type
  useEffect(() => {
    fetchBusinessInformation.handleSubmit();
  }, []);
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

  const formik = useFormik({
    initialValues: {
      businessLocation: "",
      businessSize: "",
      businessCategory: "",
      isDeveloper: "",
      referralCode: "",
    },
    validationSchema: getStarted,
    onSubmit: ({
      businessLocation,
      businessSize,
      businessCategory,
      referralCode,
      isDeveloper,
    }) => {
      const payload = {
        business_name: business_name,
        country: businessLocation,
        business_size: businessSize,
        business_type: activePanel === 1 ? "Individual" : "Company",
        business_category: businessCategory,
        is_developer: Boolean(isDeveloper),
        referal_code: referralCode,
      };
      handleSubmit(payload);
    },
  });

  useEffect(() => {
    if (fetchBusinessInformation?.data?.data) {
      const {
        business_registered_category,
        is_developer,
        business_size,
        referal_code,
      } = fetchBusinessInformation?.data?.data;
      const findCountryName: any = countries?.find(
        (res: { name: string }) => res?.name === country
      );
      formik.setFieldValue("businessLocation", findCountryName?.short_name);
      formik.setFieldValue("businessSize", business_size);
      formik.setFieldValue("businessCategory", business_registered_category);
      formik.setFieldValue("isDeveloper", is_developer);
      formik.setFieldValue("referralCode", referal_code);
    }
  }, [fetchBusinessInformation.data, countries]);

  useEffect(() => {
    if (business_type) {
      setActivePanel(business_name === "Individual" ? 1 : 2);
    }
  }, [business_type]);

  return (
    <Box>
      <Typography
        fontWeight={600}
        fontSize="20px"
        lineHeight="28px"
        textAlign="center"
        variant="h4"
        letterSpacing="0.5px"
        mt="20px"
      >
        GET STARTED
      </Typography>
      <Box
        width="515px"
        mx="auto"
        mt="24px"
        bgcolor="#FFF"
        border="1px solid #E8EAED"
        borderRadius="8px"
        pb="16px"
      >
        <Stack
          height="70px"
          justifyContent="center"
          px="40px"
          borderBottom="1px solid #E8EAED"
        >
          <Typography variant="subtitle1" fontWeight={500}>
            Business Details
          </Typography>
        </Stack>
        <form onSubmit={formik.handleSubmit}>
          <Box px="40px" py="24px">
            <Typography color="#3C4453" fontSize="13px" fontWeight={500}>
              What type of business do you do?
            </Typography>
            <Stack spacing="20px" mt="16px">
              {accountTypes?.map(({ name, subtitle, id, Icon }) => (
                <AccountTypePanel
                  key={id}
                  clickHandler={() => setActivePanel(id)}
                  active={activePanel === id}
                  title={name}
                  subtitle={subtitle}
                  icon={<Icon />}
                />
              ))}
            </Stack>
            <Typography
              color="#3C4453"
              fontSize="13px"
              fontWeight={500}
              mt="24px"
              lineHeight="21px"
            >
              Other details
            </Typography>
            <Stack spacing="24px" mt="16px">
              {/* business location */}
              <TextField
                label="Business location"
                variant="outlined"
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
              {/* business size */}
              <TextField
                label="Business size"
                variant="outlined"
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
              {/* business category */}
              <TextField
                label="Business category"
                variant="outlined"
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
              <TextField
                label="Are you a software developer"
                variant="outlined"
                select
                name="isDeveloper"
                value={formik.values.isDeveloper}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.isDeveloper &&
                  Boolean(formik.errors.isDeveloper)
                }
                helperText={
                  formik.touched.isDeveloper && formik.errors.isDeveloper
                }
              >
                <MenuItem sx={{ width: "100%" }} value="true">
                  Yes
                </MenuItem>
                <MenuItem sx={{ width: "100%" }} value="false">
                  No
                </MenuItem>
              </TextField>
              <TextField
                label="Referral code (optional)"
                variant="outlined"
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
              fullWidth
              loading={loading}
              variant="contained"
              sx={{ mt: "40px" }}
              disabled={!(formik.isValid && formik.dirty)}
              // onClick={() => Router.push("/onboarding/setup")}
              type="submit"
            >
              Proceed to my dashboard
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
