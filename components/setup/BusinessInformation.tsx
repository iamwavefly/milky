import React, { useEffect, useRef, useState } from "react";
import { reload, setDrawalState } from "@/store/appSlice";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import UploadIcon from "../../public/icons/photo-upload.svg";
import { businessInformation, contactInformation } from "@/schema";
import { useFormik } from "formik";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { LoadingButton } from "@mui/lab";
import Image from "next/image";
import { serialize } from "object-to-formdata";
import { toast } from "react-hot-toast";
import fileSizeLimit from "@/helper/fileSizeLimit";
import states from "@/mocks/states";

export default function BusinessInformation() {
  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isImage, setIsImage] = useState(false);

  const dispatch = useDispatch();

  const close = () => dispatch(setDrawalState({ active: false }));
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/onboarding/business/information`
  );

  const ref = useRef<any>();
  const handleClick = (e: any) => {
    ref.current.click();
  };

  useEffect(() => {
    const { status, message } = data;
    if (status === "success") {
      dispatch(reload());
      close();
    }
  }, [data]);

  const fetchBusinessInformation = useFetch(
    `${baseUrl}/dashboard/onboarding/business/information/view`,
    "get"
  );

  useEffect(() => {
    fetchBusinessInformation.handleSubmit();
  }, []);

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    // file checker
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

  const formik = useFormik({
    initialValues: {
      description: "",
      emailAddress: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      website: "",
      facebook: "",
      instagram: "",
      twitter: "",
    },
    validationSchema: businessInformation,
    onSubmit: ({
      address,
      city,
      description,
      emailAddress,
      facebook,
      instagram,
      phoneNumber,
      state,
      twitter,
      website,
    }: any) => {
      if (step === 1) return setStep(2);
      const payload = {
        Description: description,
        EmailAddress: emailAddress,
        MobileNumber: phoneNumber,
        Address: address,
        City: city,
        State: state,
        SubsidiaryLogo: selectedFile,
        Website: website,
        Facebook: facebook,
        Instagram: instagram,
        Twitter: twitter,
      };
      const formData = serialize(payload);
      handleSubmit(formData);
    },
  });

  useEffect(() => {
    if (fetchBusinessInformation?.data?.data) {
      const {
        support_email,
        description,
        mobile_number,
        address,
        city,
        state,
        website,
        facebook,
        instagram,
        twitter,
        logo,
      } = fetchBusinessInformation?.data?.data;
      formik.setFieldValue("description", description);
      formik.setFieldValue("emailAddress", support_email);
      formik.setFieldValue("phoneNumber", mobile_number);
      formik.setFieldValue("address", address);
      formik.setFieldValue("city", city);
      formik.setFieldValue("state", state);
      // formik.setFieldValue("website", website);
      // formik.setFieldValue("facebook", facebook);
      // formik.setFieldValue("instagram", instagram);
      // formik.setFieldValue("twitter", twitter);
      setSelectedFile(logo);
      setPreviewUrl(logo);
    }
  }, [fetchBusinessInformation?.data]);

  if (step === 2) {
    return (
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <Box position="absolute">
            <input
              hidden
              ref={ref}
              type="file"
              accept="image/x-png,image/gif,image/jpeg"
              onChange={handleFileInputChange}
            />
          </Box>
          <Typography
            fontSize="14px"
            color="rgba(38, 43, 64, 0.8)"
            lineHeight="20px"
          >
            Business logo (optional)
          </Typography>
          <Stack gap="20px" direction="row" mt="60px" alignItems="center">
            <Box
              onClick={handleClick}
              bgcolor="#F5F5F5"
              minWidth="94px"
              height="94px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ cursor: "pointer" }}
            >
              {previewUrl && isImage ? (
                <Image
                  src={previewUrl}
                  alt="Preview"
                  width={100}
                  height={100}
                  style={{ width: "100%", objectFit: "cover" }}
                />
              ) : (
                <UploadIcon />
              )}
            </Box>
            <Typography fontSize="12px" color="#262B40" lineHeight="18px">
              {fileName ??
                "We use your logo on payment pages to increase the credibility for larger than 1mb."}
            </Typography>
          </Stack>
          <Stack mt="25px" spacing="13px">
            <TextField
              label="Website *"
              variant="standard"
              name="website"
              value={formik.values.website}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.website && Boolean(formik.errors.website)}
              helperText={formik.touched.website && formik.errors.website}
            />
            <TextField
              label="Facebook username (optional)"
              variant="standard"
              name="facebook"
              value={formik.values.facebook}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.facebook && Boolean(formik.errors.facebook)}
              helperText={formik.touched.facebook && formik.errors.facebook}
            />
            <TextField
              label="Instagram handle (optional)"
              variant="standard"
              name="instagram"
              value={formik.values.instagram}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.instagram && Boolean(formik.errors.instagram)
              }
              helperText={formik.touched.instagram && formik.errors.instagram}
            />
            <TextField
              label="Twitter handle (optional)"
              variant="standard"
              name="twitter"
              value={formik.values.twitter}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.twitter && Boolean(formik.errors.twitter)}
              helperText={formik.touched.twitter && formik.errors.twitter}
            />
          </Stack>
          <LoadingButton
            variant="contained"
            fullWidth
            sx={{ mt: "60px" }}
            loading={loading}
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Save
          </LoadingButton>
          <Button
            onClick={() => setStep(1)}
            variant="outlined"
            fullWidth
            sx={{ mt: "25px" }}
          >
            Back
          </Button>
        </Box>
      </form>
    );
  }

  return (
    <Box>
      <Typography
        fontSize="14px"
        color="rgba(38, 43, 64, 0.8)"
        lineHeight="20px"
      >
        We need this information to give us an idea of the kind of business you
        run, the type of product/services you will need to maximize this portal
        and how we can generally serve you better.
      </Typography>
      <Stack mt="60px" spacing="13px">
        <TextField
          label="What do you do? *"
          variant="standard"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          label="Business email *"
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
          label="Business phone number *"
          variant="standard"
          name="phoneNumber"
          placeholder="+2348000000000"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
          }
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />
        <TextField
          label="Business address *"
          variant="standard"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
        <Stack direction="row" width="100%" spacing="25px">
          <TextField
            label="City *"
            variant="standard"
            sx={{ flex: 1 }}
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
          <TextField
            label="State *"
            variant="standard"
            sx={{ flex: 1 }}
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
            select
          >
            {states?.map((state, index) => (
              <MenuItem sx={{ width: "100%" }} key={index} value={state}>
                {state}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Stack>
      <LoadingButton
        onClick={() => setStep(2)}
        disabled={!(formik.isValid && formik.dirty)}
        variant="contained"
        fullWidth
        sx={{ mt: "60px" }}
      >
        Next
      </LoadingButton>
      <Button onClick={close} variant="outlined" fullWidth sx={{ mt: "25px" }}>
        Cancel
      </Button>
    </Box>
  );
}
