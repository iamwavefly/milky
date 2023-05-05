import useFetch from "@/hooks/useFetch";
import { MenuProps } from "@/interfaces";
import baseUrl from "@/middleware/baseUrl";
import { businessRegistration } from "@/schema";
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
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FileUpload from "../FileUpload";
import { serialize } from "object-to-formdata";

export default function BusinessRegistration() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({});
  const dispatch = useDispatch();

  // submit registration information
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/onboarding/business/registration/add-or-update`
  );
  // business classes
  const fetchBusinessClasses = useFetch(`${baseUrl}/business/classes`, "get");

  const close = () => dispatch(setDrawalState({ active: false }));

  const fileChangeHandler = (name: string, file: Blob) => {
    setForm((prev) => ({ ...prev, [name]: file }));
  };

  useEffect(() => {
    fetchBusinessClasses.handleSubmit();
  }, []);

  useEffect(() => {
    data?.status === "success" && setStep(2);
  }, [data]);

  // form controller
  const formik = useFormik({
    initialValues: {
      businessClass: "",
      taxIdNumber: "",
    },
    validationSchema: businessRegistration,
    onSubmit: ({ businessClass, taxIdNumber }) => {
      const payload = {
        businessclassid: businessClass,
        taxidnumber: taxIdNumber,
      };
      const formData = serialize(payload);
      handleSubmit(formData);
    },
  });

  if (step === 2) {
    return (
      <Box>
        <Typography
          fontSize="14px"
          color="rgba(38, 43, 64, 0.8)"
          lineHeight="20px"
        >
          All documents must be in either .jpg, .jpeg, .png or .pdf format with
          max size of 10mb.
        </Typography>
        <Stack mt="60px" gap="25px">
          <Stack direction="row" gap="25px">
            <FileUpload
              title={"Means of identification"}
              update={(file: Blob) => fileChangeHandler("Identification", file)}
            />
            <FileUpload
              title={"Upload proof of address"}
              update={(file: Blob) => fileChangeHandler("ProofOfAddress", file)}
            />
          </Stack>
          <Stack direction="row" gap="25px">
            <FileUpload
              title={"Particulars of Directors (optional)"}
              update={(file: Blob) => fileChangeHandler("ParticularsOfDirectors", file)}
            />
            <FileUpload
              title={"Statement of return on allotment of shares"}
              update={(file: Blob) => fileChangeHandler("Identification", file)}
            />
          </Stack>
        </Stack>
        <Typography
          fontSize="14px"
          color="rgba(38, 43, 64, 0.8)"
          lineHeight="20px"
          mt="60px"
        >
          Primary identification documents of all shareholders with 5% ownership
          and above
        </Typography>
        <Stack mt="25px" gap="25px">
          <Stack direction="row" gap="25px">
            <FileUpload
              title={"Chairman 1"}
              update={(file: Blob) => fileChangeHandler("Identification", file)}
            />
            <FileUpload
              title={"Chairman 2"}
              update={(file: Blob) => fileChangeHandler("Identification", file)}
            />
          </Stack>
          <Stack direction="row" gap="25px">
            <FileUpload
              title={"Operating License (Optional)"}
              update={(file: Blob) => fileChangeHandler("OperatingLicense", file)}
            />
          </Stack>
        </Stack>
        <Typography
          fontSize="12px"
          color="rgba(38, 43, 64, 0.8)"
          lineHeight="20px"
          mt="60px"
        >
          You have to add at least 1 stakeholder
          <Typography component="span" fontSize="12px" color="#EA5851">
            *
          </Typography>
        </Typography>
        <Stack mt="14px">
          <Button
            onClick={() => setStep(2)}
            variant="outlined"
            sx={{
              color: "#2E3192",
              opacity: 0.6,
              width: "max-content",
              fontSize: "12px",
            }}
          >
            Add stakeholder
          </Button>
        </Stack>
        <Button
          onClick={close}
          variant="contained"
          fullWidth
          sx={{ mt: "60px" }}
        >
          Save
        </Button>
        <Button
          onClick={close}
          variant="outlined"
          fullWidth
          sx={{ mt: "25px" }}
        >
          Cancel
        </Button>
      </Box>
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
      <form onSubmit={formik.handleSubmit}>
        <Stack mt="60px" gap="13px">
          <TextField
            label="Business class"
            variant="standard"
            select
            name="businessClass"
            value={formik.values.businessClass}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.businessClass &&
              Boolean(formik.errors.businessClass)
            }
            helperText={
              formik.touched.businessClass && formik.errors.businessClass
            }
          >
            {fetchBusinessClasses?.data?.data?.map(
              ({ name, id }: MenuProps) => (
                <MenuItem sx={{ width: "100%" }} key={id} value={id}>
                  {name}
                </MenuItem>
              )
            )}
          </TextField>
          <TextField
            label="Tax identification number"
            variant="standard"
            name="taxIdNumber"
            value={formik.values.taxIdNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.taxIdNumber && Boolean(formik.errors.taxIdNumber)
            }
            helperText={formik.touched.taxIdNumber && formik.errors.taxIdNumber}
          />
        </Stack>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          fullWidth
          sx={{ mt: "60px" }}
          disabled={!(formik.isValid && formik.dirty)}
        >
          Next
        </LoadingButton>
      </form>
      <LoadingButton
        onClick={() => setStep(1)}
        variant="outlined"
        fullWidth
        sx={{ mt: "25px" }}
      >
        Back
      </LoadingButton>
    </Box>
  );
}
