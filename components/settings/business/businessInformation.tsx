import fileSizeLimit from "@/helper/fileSizeLimit";
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
import { serialize } from "object-to-formdata";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import UploadIcon from "../../../public/icons/photo-upload.svg";
import Footer from "@/components/form/Footer";

export default function BusinessInformation() {
  const [fileName, setFileName] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isImage, setIsImage] = useState(false);
  const [countries, setCountries] = useState<any>([]);
  const [isReadOnly, setIsReadOnly] = useState(false);

  const { subsidiaries } = useSelector(selectUserState);

  // business types
  const fetchBusinessType = useFetch(
    `${baseUrl}/dashboard/business/categories`,
    "get"
  );
  // countries
  const fetchCountries = useFetch(
    `${baseUrl}/dashboard/service/countries`,
    "get"
  );
  // update business information endpoint
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/business/update`
  );
  // update logo
  const logoUpdateReq = useFetch(
    `${baseUrl}/dashboard/business/logos/add-or-update`
  );

  // fetch business type
  useEffect(() => {
    const { verification_status } = subsidiaries ?? {};
    const status = verification_status?.toLowerCase();
    if (status === "pending-approval" || status === "active") {
      return setIsReadOnly(true);
    }
  }, [subsidiaries]);

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

  useEffect(() => {
    if (logoUpdateReq?.data?.status === "success") {
      setSelectedFile(null);
    }
  }, [logoUpdateReq?.data]);

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    if (fileSizeLimit(file)) return;
    const { name, type } = file;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(e.target.files[0]) as any);
    setIsImage(type?.includes("image") ? true : false);
    setFileName(
      name.length > 10
        ? name.substring(0, 10) + "..." + name?.split?.(".")?.pop()
        : name
    );
  };

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
      if (selectedFile) {
        const formData = serialize({
          Logo: selectedFile,
        });
        logoUpdateReq?.handleSubmit(formData);
      }
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
      subsidiary_logo,
    } = subsidiaries ?? {};

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
    // set url
    const imageUrl = `https://subsidiary-dashboard-api-service-dev.eks-alliancepay.com/subsidiary/dashboard/file/alliancepay-compliance-images/download?fileId=${subsidiary_logo}`;
    setPreviewUrl(imageUrl);
  }, [subsidiaries, countries]);

  return (
    <Box bgcolor="#fff" border="1px solid #E8EAED" borderRadius="8px">
      <form onSubmit={formik.handleSubmit}>
        <Box padding="48px 40px">
          {/* file upload */}
          <Stack direction="row" alignItems="center" gap="28px">
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
              height="64px"
              width="64px"
              borderRadius="100%"
              bgcolor="#F5F5F5"
              justifyContent="center"
              alignItems="center"
              overflow="hidden"
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
            <Stack direction="row" spacing="28px">
              <Button variant="text">Update</Button>
            </Stack>
            {/* <Button
              sx={{
                ml: "20px",
                height: "40px",
                fontSize: "12px",
                fontWeight: 500,
              }}
              onClick={handleClick}
              variant="outlined"
              disabled={isReadOnly}
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
              disabled={isReadOnly}
            >
              Remove
            </Button> */}
          </Stack>
          {/* form fields */}
          <Stack mt="34px" spacing="24px">
            <Stack direction="row" flex={1} spacing="18px">
              <TextField
                label="Business name"
                variant="outlined"
                name="businessName"
                value={formik.values.businessName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isReadOnly}
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
                variant="outlined"
                name="businessEmail"
                disabled={isReadOnly}
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
            <Stack direction="row" flex={1} spacing="24px">
              <TextField
                label="Business type"
                variant="outlined"
                name="businessType"
                disabled={isReadOnly}
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
                variant="outlined"
                name="country"
                value={formik.values.country}
                disabled={isReadOnly}
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
            <Stack direction="row" flex={1} spacing="24px">
              <TextField
                label="Industry"
                variant="outlined"
                name="industry"
                disabled={isReadOnly}
                value={formik.values.industry}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ flex: 1 }}
                error={
                  formik.touched.industry && Boolean(formik.errors.industry)
                }
                helperText={formik.touched.industry && formik.errors.industry}
                select
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
                label="Legal business name"
                variant="outlined"
                name="legalName"
                disabled={isReadOnly}
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
            <Stack direction="row" flex={1} spacing="24px">
              <TextField
                label="Description"
                variant="outlined"
                name="description"
                multiline
                disabled={isReadOnly}
                rows={3}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ flex: 1 }}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Stack>
          </Stack>
        </Box>
        <Box>
          <Footer>Save changes</Footer>
        </Box>
      </form>
    </Box>
  );
}
