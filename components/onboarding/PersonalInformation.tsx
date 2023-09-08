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
import FileUpload from "../FileUpload";
import AddIcon from "@/public/icons/add-circle.svg";
import Styles from "./style.module.scss";
import { serialize } from "object-to-formdata";
import { personalInformation } from "@/schema";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";

interface Props {
  nextStep: () => void;
}

const gender = ["Male", "Female"];

const defaultForm = {
  identification: "",
  proofofaddress: "",
  passportphoto: "",
};

export default function PersonalInformation({ nextStep }: Props) {
  const [form, setForm] = useState(defaultForm);
  const [disabled, setDisabled] = useState(true);

  const fileChangeHandler = (name: string, file: Blob) => {
    setForm((prev) => ({ ...prev, [name]: file }));
  };

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/onboarding/personal/information`
  );

  const idTypes = useFetch(
    `${baseUrl}/dashboard/onboarding/identification/types`,
    "get"
  );

  const fetchPersonalInformation = useFetch(
    `${baseUrl}/dashboard/onboarding/personal/information/view`,
    "get"
  );

  useEffect(() => {
    const { identification, passportphoto, proofofaddress } = form;
    if (identification && passportphoto && proofofaddress) {
      return setDisabled(false);
    }
    setDisabled(true);
  }, [form]);

  useEffect(() => {
    fetchPersonalInformation.handleSubmit();
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      bvn: "",
      gender: "",
      dob: "",
      phoneNumber: "",
      identificationDocument: "",
      identificationNumber: "",
    },
    validationSchema: personalInformation,
    onSubmit: ({
      bvn,
      dob,
      firstName,
      lastName,
      gender,
      identificationDocument,
      identificationNumber,
      phoneNumber,
    }) => {
      const { identification, proofofaddress, passportphoto } = form;
      const payload = {
        firstname: firstName,
        lastname: lastName,
        identification,
        proofofaddress,
        passportphoto,
        bvn,
        gender,
        dateofbirth: dob,
        mobilenumber: phoneNumber,
        idtype: identificationDocument,
        idnumber: identificationNumber,
      };
      const formData = serialize(payload);
      handleSubmit(formData);
    },
  });

  useEffect(() => {
    if (fetchPersonalInformation?.data?.data) {
      const {
        mobile_number,
        first_name,
        last_name,
        bvn,
        gender,
        date_of_birth,
        id_number,
        id_type,
      } = fetchPersonalInformation?.data?.data;
      formik.setValues({
        bvn,
        dob: date_of_birth?.split?.("T")[0],
        firstName: first_name,
        lastName: last_name,
        gender,
        identificationDocument: id_type,
        identificationNumber: id_number,
        phoneNumber: mobile_number,
      });
    }
  }, [fetchPersonalInformation?.data]);

  useEffect(() => {
    idTypes.handleSubmit();
  }, []);

  useEffect(() => {
    const { status, message } = data;
    if (status === "success") {
      nextStep();
    }
  }, [data]);

  return (
    <Box bgcolor="#FFF">
      <form onSubmit={formik.handleSubmit}>
        <Box px="40px" pt="29px" pb="28px">
          <Stack gap="24px">
            <Box>
              <TextField
                fullWidth
                label="Bank Verification Number (BVN)"
                variant="outlined"
                name="bvn"
                value={formik.values.bvn}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.bvn && Boolean(formik.errors.bvn)}
                helperText={formik.touched.bvn && formik.errors.bvn}
                inputProps={{ maxLength: 11 }}
              />
              <Typography
                mt="8px"
                fontSize="12px"
                color="#070F1C"
                lineHeight="18px"
              >
                To get your BVN dial *565*0# on your registered mobile number
              </Typography>
            </Box>
            {/* <TextField
            label="Tax Identification Number (TIN)"
            variant="outlined"
            fullWidth
          /> */}
            <Stack direction="row" spacing="25px">
              <TextField
                label="First Name"
                variant="outlined"
                sx={{ flex: 1 }}
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
                label="Last Name"
                variant="outlined"
                sx={{ flex: 1 }}
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Stack>
            <TextField
              label="Gender"
              variant="outlined"
              fullWidth
              select
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender && formik.errors.gender}
            >
              {gender?.map((name: string, index: number) => (
                <MenuItem value={name} key={index} sx={{ width: "100%" }}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Date of birth"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="date"
              name="dob"
              value={formik.values.dob}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.dob && Boolean(formik.errors.dob)}
              helperText={formik.touched.dob && formik.errors.dob}
            />
            <TextField
              label="Phone number"
              variant="outlined"
              fullWidth
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="+2348000000000"
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            />
            <TextField
              label="Identification document"
              variant="outlined"
              fullWidth
              select
              name="identificationDocument"
              value={formik.values.identificationDocument}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.identificationDocument &&
                Boolean(formik.errors.identificationDocument)
              }
              helperText={
                formik.touched.identificationDocument &&
                formik.errors.identificationDocument
              }
            >
              {idTypes?.data?.data?.map(({ name, id }: any) => (
                <MenuItem value={id} key={id} sx={{ width: "100%" }}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Identification document number"
              variant="outlined"
              fullWidth
              name="identificationNumber"
              value={formik.values.identificationNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.identificationNumber &&
                Boolean(formik.errors.identificationNumber)
              }
              helperText={
                formik.touched.identificationNumber &&
                formik.errors.identificationNumber
              }
            />
          </Stack>
        </Box>
        <Stack className={Styles.card} pb="28px" pt="20px">
          <Typography variant="h5" fontSize="15px" fontWeight={600}>
            Upload Documents
          </Typography>
          <Typography
            fontSize="13px"
            fontWeight={400}
            lineHeight="21px"
            letterSpacing="0.195px"
            mt="4px"
            color="#3C4453"
          >
            All documents must be in either jpeg, jpg, png, PDF format with
            maximum size of 10mb. A valid ID can be an International passport,
            Driver’s License, National ID or Voter’s Card.
          </Typography>
          <Stack gap="24px" mt="16px">
            <FileUpload
              title={"Valid ID"}
              update={(file: Blob) => fileChangeHandler("identification", file)}
            />
            <FileUpload
              title={"Passport Photograph"}
              update={(file: Blob) => fileChangeHandler("passportphoto", file)}
            />
            <FileUpload
              title={"Proof of Address"}
              multiple
              update={(file: Blob) => fileChangeHandler("proofofaddress", file)}
            />
          </Stack>
        </Stack>
        {/* footer */}
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
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            loading={loading}
            variant="contained"
            disabled={!(formik.isValid && formik.dirty) || disabled}
          >
            Save & Continue
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
}
