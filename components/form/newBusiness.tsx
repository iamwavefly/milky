import useFetch from "@/hooks/useFetch";
import { MenuProps } from "@/interfaces";
import baseUrl from "@/middleware/baseUrl";
import { bankDetails, newCustomer, newSubsidiary, newUser } from "@/schema";
import { setDrawalState } from "@/store/appSlice";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { serialize } from "object-to-formdata";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import Checkbox from "../elements/Checkbox";

interface Props {
  closeHandler: () => void;
  reload: () => void;
}

export default function NewBusiness({ closeHandler, reload }: Props) {
  const [countries, setCountries] = useState<any>([]);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/create-subsidiary`
  );
  // business information view
  const fetchBusinessInformation = useFetch(
    `${baseUrl}/dashboard/onboarding/business/information/view`,
    "get"
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
    const { status } = data;
    if (status === "success") {
      closeHandler();
      reload();
    }
  }, [data]);
  // fetch business information view
  useEffect(() => {
    fetchBusinessInformation.handleSubmit();
  }, []);
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
      name: "",
      emailAddress: "",
      phoneNumber: "",
      country: "",
      businessType: "",
      description: "",
      default: false,
    },
    validationSchema: newSubsidiary,
    onSubmit: (form) => {
      const payload = {
        email: form.emailAddress,
        name_of_subsidiary: form?.name,
        country: form.country,
        description: form.description,
        mobile_number: form.phoneNumber,
        business_type: form.businessType,
        is_Default: form.default,
        business_id: fetchBusinessInformation?.data?.data?.business_id,
      };
      const formData = serialize(payload);
      handleSubmit(formData);
    },
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing="24px" p="40px">
          <TextField
            label="Business name"
            variant="outlined"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            label="Business email"
            variant="outlined"
            name="emailAddress"
            value={formik.values.emailAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.emailAddress && Boolean(formik.errors.emailAddress)
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
            label="Business type"
            variant="outlined"
            name="businessType"
            value={formik.values.businessType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.businessType && Boolean(formik.errors.businessType)
            }
            helperText={
              formik.touched.businessType && formik.errors.businessType
            }
            select
          >
            {["Individual", "Company"]?.map((name, index) => (
              <MenuItem sx={{ width: "100%" }} key={index} value={name}>
                {name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Description"
            variant="outlined"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ flex: 1 }}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <Box pt="4px" zIndex={99999}>
            <FormControlLabel
              control={
                <Checkbox name="default" checked={formik.values.default} />
              }
              name="default"
              onChange={formik.handleChange}
              label="Use the same account settings as my main account"
            />
          </Box>
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
          bgcolor="#fff"
        >
          <LoadingButton variant="outlined" onClick={closeHandler}>
            Cancel
          </LoadingButton>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={loading}
            disabled={!(formik.isValid && formik.dirty)}
          >
            Create business
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
}
