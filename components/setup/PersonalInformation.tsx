import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { businessInformation, personalInformation } from "@/schema";
import { setDrawalState } from "@/store/appSlice";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Blob } from "buffer";
import { useFormik } from "formik";
import { serialize } from "object-to-formdata";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import FileUpload from "../FileUpload";

const gender = ["Male", "Female"];

interface FormProps {
  bvn: string;
  dob: string;
  firstName: string;
  gender: string;
  identificationDocument: string;
  identificationNumber: string;
  lastName: string;
  phoneNumber: string;
}

export default function PersonalInformation() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    Identification: "",
    ProofOfAddress: "",
    PassportPhoto: "",
  });
  const dispatch = useDispatch();

  const close = () => dispatch(setDrawalState({ active: false }));

  const idTypes = useFetch(
    `${baseUrl}/dashboard/onboarding/identification/types`,
    "get"
  );
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/onboarding/personal/information`
  );

  const fileChangeHandler = (name: string, file: Blob) => {
    setForm((prev) => ({ ...prev, [name]: file }));
  };

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
    }: FormProps) => {
      if (step === 1) return setStep(2);
      const { Identification, ProofOfAddress, PassportPhoto } = form;
      const payload = {
        FirstName: firstName,
        LastName: lastName,
        Identification,
        ProofOfAddress,
        PassportPhoto,
        Bvn: bvn,
        Gender: gender,
        DateOfBirth: dob,
        MobileNumber: phoneNumber,
        IdType: identificationDocument,
        IdNumber: identificationNumber,
      };
      const formData = serialize(payload);
      handleSubmit(formData);
    },
  });

  useEffect(() => {
    idTypes.handleSubmit();
  }, []);

  useEffect(() => {
    const { status, message } = data;
    if (status === "success") {
      toast.success(message);
      close();
    }
  }, [data]);

  if (step === 2) {
    return (
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <Typography
            fontSize="14px"
            color="rgba(38, 43, 64, 0.8)"
            lineHeight="20px"
          >
            Please upload any of the following means of identification:
            International Passport, Driver’s License, National ID or Voter’s ID.
            All files must be an image (.jpg, .jpeg, .png or .pdf) with max size
            of 10mb.
          </Typography>
          <Stack mt="60px" gap="25px">
            <FileUpload
              height={82}
              title={"Upload means of identification"}
              update={(file: Blob) => fileChangeHandler("Identification", file)}
            />
            <FileUpload
              height={82}
              title={"Upload passport"}
              update={(file: Blob) => fileChangeHandler("PassportPhoto", file)}
            />
            <FileUpload
              height={82}
              title={"Upload proof of address"}
              update={(file: Blob) => fileChangeHandler("ProofOfAddress", file)}
            />
          </Stack>
          <LoadingButton
            variant="contained"
            fullWidth
            sx={{ mt: "60px" }}
            type="submit"
            loading={loading}
            disabled={!(formik.isValid && formik.dirty)}
          >
            Save Changes
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
        This helps us confirm your identity. We use the details you provide for
        verification only and it will not be visible to anyone else on your
        team/business.
      </Typography>
      <Stack mt="60px" spacing="13px">
        <Stack direction="row" spacing="25px">
          <TextField
            label="First Name"
            variant="standard"
            sx={{ flex: 1 }}
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            label="Last Name"
            variant="standard"
            sx={{ flex: 1 }}
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Stack>
        <TextField
          label="BVN"
          variant="standard"
          name="bvn"
          value={formik.values.bvn}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bvn && Boolean(formik.errors.bvn)}
          helperText={formik.touched.bvn && formik.errors.bvn}
        />
        <Stack direction="row" spacing="25px">
          <TextField
            label="Gender"
            variant="standard"
            sx={{ flex: 1 }}
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
            label="Date of Birth"
            variant="standard"
            sx={{ flex: 1 }}
            InputLabelProps={{ shrink: true }}
            type="date"
            name="dob"
            value={formik.values.dob}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dob && Boolean(formik.errors.dob)}
            helperText={formik.touched.dob && formik.errors.dob}
          />
        </Stack>
        <TextField
          label="Phone Number"
          variant="standard"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
          }
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />
        <TextField
          label="Identification Document"
          variant="standard"
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
          label="Identification Number"
          variant="standard"
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
      <Button
        onClick={() => setStep(2)}
        disabled={!(formik.isValid && formik.dirty)}
        variant="contained"
        fullWidth
        sx={{ mt: "60px" }}
      >
        Next
      </Button>
    </Box>
  );
}
