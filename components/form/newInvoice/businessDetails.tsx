import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import PhotoUploadIcon from "../../../public/icons/photo-upload.svg";
import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { invoiceBusinessDetails } from "@/schema";
import Router from "next/router";
import FileUpload from "@/components/FileUpload";
import Image from "next/image";

interface Props {
  onSubmit: ({}) => void;
}

export default function BusinessDetails({ onSubmit }: Props) {
  const actualBtnRef = useRef(null);
  const [fileName, setFileName] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isImage, setIsImage] = useState(false);

  const ref = useRef<any>();
  const handleClick = (e: any) => {
    ref.current.click();
  };

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

  const formik = useFormik({
    initialValues: {
      companyName: "",
      companyEmail: "",
      customerName: "",
      customerEmail: "",
    },
    validationSchema: invoiceBusinessDetails,
    onSubmit: ({ companyEmail, companyName, customerEmail, customerName }) => {
      const payload = {
        company_name: companyName,
        customer_name: customerName,
        email_address: customerEmail,
        company_email_address: companyEmail,
        logo: "",
      };
      onSubmit(payload);
    },
  });

  return (
    <Box p="25px 35px" bgcolor="#FFFFFF" width="468px">
      {/* header */}
      <Box position="absolute">
        <input
          hidden
          ref={ref}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
        />
      </Box>
      <Stack direction="row" alignItems="center" spacing="20px">
        <Stack
          justifyContent="center"
          alignItems="center"
          width="94px"
          height="94px"
          bgcolor="#F5F5F5"
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Preview"
              width={100}
              height={100}
              style={{ width: "100%", objectFit: "cover" }}
            />
          ) : (
            <PhotoUploadIcon />
          )}
        </Stack>
        <Button
          sx={{
            height: "40px !important",
            py: "0 !important",
            fontSize: "12px",
          }}
          variant="outlined"
          onClick={handleClick}
        >
          Change Logo
        </Button>
      </Stack>
      <form onSubmit={formik.handleSubmit}>
        <Stack mt="34px" width="100%" spacing="14px">
          <TextField
            label="Company Name"
            variant="standard"
            sx={{ flex: 1 }}
            name="companyName"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.companyName && Boolean(formik.errors.companyName)
            }
            helperText={formik.touched.companyName && formik.errors.companyName}
          />
          <TextField
            label="Company Email"
            variant="standard"
            sx={{ flex: 1 }}
            name="companyEmail"
            value={formik.values.companyEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.companyEmail && Boolean(formik.errors.companyEmail)
            }
            helperText={
              formik.touched.companyEmail && formik.errors.companyEmail
            }
          />
          <TextField
            label="Customer Name"
            variant="standard"
            sx={{ flex: 1 }}
            name="customerName"
            value={formik.values.customerName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.customerName && Boolean(formik.errors.customerName)
            }
            helperText={
              formik.touched.customerName && formik.errors.customerName
            }
          />
          <TextField
            label="Customer Email"
            variant="standard"
            sx={{ flex: 1 }}
            name="customerEmail"
            value={formik.values.customerEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.customerEmail &&
              Boolean(formik.errors.customerEmail)
            }
            helperText={
              formik.touched.customerEmail && formik.errors.customerEmail
            }
          />
        </Stack>
        <Divider sx={{ mt: "41px", mb: "16px" }} />
        <Stack direction="row" spacing="10px" justifyContent="flex-end">
          <Button
            variant="outlined"
            sx={{ maxHeight: "40px" }}
            onClick={() => Router.back()}
          >
            Back
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            sx={{ minWidth: "117px", maxHeight: "40px", fontSize: "14px" }}
          >
            Next
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
