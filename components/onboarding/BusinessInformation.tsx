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
import Styles from "./style.module.scss";
import FileUpload from "../FileUpload";

interface Props {
  nextStep: () => void;
}

export default function BusinessInformation({ nextStep }: Props) {
  const [step, setStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();

  const close = () => dispatch(setDrawalState({ active: false }));
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/onboarding/business/information`
  );

  useEffect(() => {
    const { status } = data;
    if (status === "success") {
      dispatch(reload());
      nextStep();
    }
  }, [data]);

  const fetchBusinessInformation = useFetch(
    `${baseUrl}/dashboard/onboarding/business/information/view`,
    "get"
  );

  useEffect(() => {
    fetchBusinessInformation.handleSubmit();
  }, []);

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

  // useEffect(() => {
  //   if (fetchBusinessInformation?.data?.data) {
  //     const {
  //       support_email,
  //       description,
  //       mobile_number,
  //       address,
  //       city,
  //       state,
  //       website,
  //       facebook,
  //       instagram,
  //       twitter,
  //       logo,
  //     } = fetchBusinessInformation?.data?.data;
  //     formik.setFieldValue("description", description);
  //     formik.setFieldValue("emailAddress", support_email);
  //     formik.setFieldValue("phoneNumber", mobile_number);
  //     formik.setFieldValue("address", address);
  //     formik.setFieldValue("city", city);
  //     formik.setFieldValue("state", state);
  //     formik.setFieldValue("website", website);
  //   }
  // }, [fetchBusinessInformation?.data?.data]);

  return (
    <Box bgcolor="#FFF">
      {step === 2 ? (
        <form onSubmit={formik.handleSubmit}>
          <Box p="40px">
            <Stack>
              <Typography
                fontSize="15px"
                color="#3C4453"
                lineHeight="21px"
                fontWeight={500}
              >
                Business logo (optional)
              </Typography>
              <FileUpload update={setSelectedFile} acceptType="image/*" />
            </Stack>
            <Stack mt="24px" spacing="24px">
              <TextField
                label="Website *"
                variant="outlined"
                name="website"
                value={formik.values.website}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.website && Boolean(formik.errors.website)}
                helperText={
                  formik.touched.website && Boolean(formik.errors.website)
                }
              />
              <TextField
                label="Facebook username (optional)"
                variant="outlined"
                name="facebook"
                value={formik.values.facebook}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.facebook && Boolean(formik.errors.facebook)
                }
                helperText={
                  formik.touched.facebook && Boolean(formik.errors.facebook)
                }
              />
              <TextField
                label="Instagram handle (optional)"
                variant="outlined"
                name="instagram"
                value={formik.values.instagram}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.instagram && Boolean(formik.errors.instagram)
                }
                helperText={
                  formik.touched.instagram && Boolean(formik.errors.instagram)
                }
              />
              <TextField
                label="Twitter handle (optional)"
                variant="outlined"
                name="twitter"
                value={formik.values.twitter}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.twitter && Boolean(formik.errors.twitter)}
                helperText={
                  formik.touched.twitter && Boolean(formik.errors.twitter)
                }
              />
            </Stack>
          </Box>
          <Stack
            py="16px"
            spacing="28px"
            direction="row"
            className={Styles.card}
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button
              variant="text"
              sx={{ p: 0, bgcolor: "transparent !important" }}
              onClick={() => setStep(1)}
            >
              Previous
            </Button>
            <LoadingButton
              variant="contained"
              loading={loading}
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
            >
              Save
            </LoadingButton>
          </Stack>
        </form>
      ) : (
        <Box>
          <Stack spacing="24px" p="40px">
            <TextField
              label="What do you do? *"
              variant="outlined"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && Boolean(formik.errors.description)
              }
            />
            <TextField
              label="Business email *"
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
                formik.touched.emailAddress &&
                Boolean(formik.errors.emailAddress)
              }
            />
            <TextField
              label="Business phone number *"
              variant="outlined"
              name="phoneNumber"
              placeholder="+2348000000000"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
            />
            <TextField
              label="Business address *"
              variant="outlined"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={
                formik.touched.address && Boolean(formik.errors.address)
              }
            />
            <Stack direction="row" width="100%" spacing="25px">
              <TextField
                label="City *"
                variant="outlined"
                sx={{ flex: 1 }}
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && Boolean(formik.errors.city)}
              />
              <TextField
                label="State *"
                variant="outlined"
                sx={{ flex: 1 }}
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={
                  formik.touched.state && Boolean(formik.errors.state)
                }
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
          <Stack
            py="16px"
            spacing="28px"
            direction="row"
            className={Styles.card}
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button
              variant="text"
              sx={{ p: 0, bgcolor: "transparent !important" }}
              onClick={close}
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              loading={loading}
              disabled={!(formik.isValid && formik.dirty)}
              onClick={() => setStep(2)}
            >
              Next
            </LoadingButton>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
