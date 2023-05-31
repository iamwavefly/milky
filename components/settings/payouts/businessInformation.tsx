import useFetch from "@/hooks/useFetch";
import { MenuProps } from "@/interfaces";
import baseUrl from "@/middleware/baseUrl";
import { settingBusiness } from "@/schema";
import { selectUserState } from "@/store/authSlice";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import UploadIcon from "../../../public/icons/photo-upload.svg";

export default function BusinessInformation() {
  const [fileName, setFileName] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [countries, setCountries] = useState<any>([]);

  const { subsidiaries } = useSelector(selectUserState);

  // business types
  const fetchBusinessType = useFetch(
    `${baseUrl}/dashboard/business/categories`,
    "get"
  );
  // business countries
  const fetchCountries = useFetch(
    `${baseUrl}/dashboard/service/countries`,
    "get"
  );
  // update business information endpoint
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/business/update`
  );

  // fetch business type
  useEffect(() => {
    fetchBusinessType.handleSubmit();
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

  const handleFileInputChange = (e: any) => {
    const imagePreview = e.target.files[0];
    const { name, type } = imagePreview;
    setSelectedFile(imagePreview);
    setPreviewUrl(URL.createObjectURL(e.target.files[0]) as any);
    setIsImage(type?.includes("image") ? true : false);
    setFileName(
      name.length > 10
        ? name.substring(0, 10) + "..." + name?.split?.(".")?.pop()
        : name
    );
  };

  useEffect(() => {
    const { status, message } = data;
    if (status === "success") {
      toast.success(message);
    }
  }, [data]);

  const ref = useRef<any>();
  const handleClick = (e: any) => {
    ref.current.click();
  };

  const clearFile = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
  };

  const formik = useFormik({
    initialValues: {
      businessName: "",
      businessEmail: "",
      businessType: "",
      country: "",
      industry: "",
      legalName: "",
      description: "",
    },
    validationSchema: settingBusiness,
    onSubmit: ({
      businessEmail,
      businessName,
      businessType,
      country,
      description,
      industry,
      legalName,
    }) => {
      const payload = {
        business_name: businessName,
        business_email: businessEmail,
        business_type: businessType,
        country,
        industry_Sector: industry,
        industry,
        legal_business_name: legalName,
        description,
      };
      handleSubmit(payload);
    },
  });

  useEffect(() => {
    const {
      business_name,
      description,
      support_email,
      country,
      industry,
      legal_business_name,
      business_type,
    } = subsidiaries;

    const newCountry = countries?.find(
      (coun: any) => coun?.name === country
    )?.short_name;

    const payload = {
      businessName: business_name,
      businessEmail: support_email,
      businessType: business_type,
      country: newCountry,
      industry,
      legalName: legal_business_name,
      description,
    };
    formik.setValues(payload as any);
    console.log({ subsidiaries }, newCountry);
  }, [subsidiaries, countries]);

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        {/* file upload */}
        <Stack direction="row" alignItems="center">
          {/* hidden input file */}
          <Box position="absolute">
            <input
              hidden
              ref={ref}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
            />
          </Box>
          <Stack
            height="94px"
            width="94px"
            bgcolor="#F5F5F5"
            justifyContent="center"
            alignItems="center"
          >
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Preview"
                width={94}
                height={94}
                style={{ width: "100%", objectFit: "cover" }}
              />
            ) : (
              <UploadIcon />
            )}
          </Stack>
          <Button
            sx={{
              ml: "20px",
              height: "40px",
              fontSize: "12px",
              fontWeight: 500,
            }}
            onClick={handleClick}
            variant="outlined"
          >
            Change Picture
          </Button>
          <Button
            sx={{
              ml: "10px",
              height: "40px",
              fontSize: "12px",
              borderRadius: 0,
              fontWeight: 500,
              color: "#2E3192",
            }}
            variant="text"
            onClick={clearFile}
          >
            Remove
          </Button>
        </Stack>
        {/* form fields */}
        <Stack mt="34px" spacing="20px">
          <Stack direction="row" flex={1} spacing="18px">
            <TextField
              label="Business name"
              variant="standard"
              name="businessName"
              value={formik.values.businessName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ flex: 1 }}
              error={
                formik.touched.businessName &&
                Boolean(formik.errors.businessName)
              }
              helperText={
                formik.touched.businessName && formik.errors.businessName
              }
            />
            <TextField
              label="Business email"
              variant="standard"
              name="businessEmail"
              value={formik.values.businessEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ flex: 1 }}
              error={
                formik.touched.businessEmail &&
                Boolean(formik.errors.businessEmail)
              }
              helperText={
                formik.touched.businessEmail && formik.errors.businessEmail
              }
            />
          </Stack>
          <Stack direction="row" flex={1} spacing="18px">
            <TextField
              label="Business type"
              variant="standard"
              name="businessType"
              value={formik.values.businessType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ flex: 1 }}
              error={
                formik.touched.businessType &&
                Boolean(formik.errors.businessType)
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
              label="Country"
              variant="standard"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ flex: 1 }}
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
          </Stack>
          <Stack direction="row" flex={1} spacing="18px">
            <TextField
              label="Industry"
              variant="standard"
              name="industry"
              value={formik.values.industry}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ flex: 1 }}
              error={formik.touched.industry && Boolean(formik.errors.industry)}
              helperText={formik.touched.industry && formik.errors.industry}
              select
            >
              {fetchBusinessType?.data?.data?.map(({ name, id }: MenuProps) => (
                <MenuItem sx={{ width: "100%" }} key={id} value={name}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Legal business name"
              variant="standard"
              name="legalName"
              value={formik.values.legalName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ flex: 1 }}
              error={
                formik.touched.legalName && Boolean(formik.errors.legalName)
              }
              helperText={formik.touched.legalName && formik.errors.legalName}
            />
          </Stack>
          <Stack direction="row" flex={1} spacing="18px">
            <TextField
              label="Description"
              variant="standard"
              name="description"
              multiline
              rows={0}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ flex: 1 }}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Stack>
        </Stack>
        <Divider sx={{ mt: "60px" }} />
        <Stack
          direction="row"
          spacing="10px"
          mt="16px"
          ml="auto"
          justifyContent="flex-end"
        >
          <Button
            sx={{
              height: "40px",
              fontSize: "12px",
            }}
            variant="outlined"
          >
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={loading}
            sx={{
              height: "40px",
              fontSize: "12px",
            }}
            disabled={!(formik.isValid && formik.dirty)}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
}
