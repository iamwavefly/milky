import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import AvatarPlaceholder from "@/public/icons/placeholder.svg";
import { useDispatch, useSelector } from "react-redux";
import { setDrawalState } from "@/store/appSlice";
import fileSizeLimit from "@/helper/fileSizeLimit";
import Image from "next/image";
import Styles from "./styles.module.scss";
import { selectUserState } from "@/store/authSlice";
import { useFormik } from "formik";
import { invoiceBusinessDetails } from "@/schema";
import { LoadingButton } from "@mui/lab";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import { notifyErrorHandler, resolveErrorMsg } from "@/middleware/catchErrors";
import convertToBase64 from "@/helper/convertToBase64";

interface BusinessDetailsProps {
  nextStep: (data: {}) => void;
}

export default function BusinessDetails({ nextStep }: BusinessDetailsProps) {
  const [selectedFile, setSelectedFile] = useState("");
  const [logo, setLogo] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [newLogoUrl, setNewLogoUrl] = useState<File | null>(null);

  // update logo subsidiaries
  const fetchSubsidiaries = useFetch(
    `${baseUrl}/dashboard/onboarding/business/information/view`,
    "get"
  );

  const uploadImage = async (file: File) => {
    // gen base64 url
    const base64File = await convertToBase64(file);
    setNewLogoUrl(base64File as File);
    // upload image to cloudinary
    // const data = new FormData();
    // data.append("file", file);
    // data.append("upload_preset", "arca_merchant");
    // data.append("folder", "arca/merchant/invoice");
    // data.append("cloud_name", "new-invoice-logo");
    // fetch("https://api.cloudinary.com/v1_1/dzvevdlsv/image/upload", {
    //   method: "post",
    //   body: data,
    // })
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     setNewLogoUrl(data.url);
    //   })
    //   .catch((error) => {
    //     let { errorMsg } = resolveErrorMsg(error);
    //     notifyErrorHandler({
    //       type: "error",
    //       title: errorMsg,
    //       msg: error,
    //       duration: 5000,
    //     });
    //   });
  };

  const dispatch = useDispatch();
  const close = () => dispatch(setDrawalState({ active: false }));

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    if (fileSizeLimit(file)) return;
    const { name, type } = file;
    uploadImage(file);
    setPreviewUrl(URL.createObjectURL(e.target.files[0]) as any);
  };

  const ref = useRef<any>();
  const handleClick = (e: any) => {
    ref.current.click();
  };

  // set subsidiary logo
  useEffect(() => {
    setLogo(fetchSubsidiaries?.data?.data?.logo);
  }, [fetchSubsidiaries?.data?.data]);

  // fetch subsidiaries type
  useEffect(() => {
    fetchSubsidiaries.handleSubmit();
  }, []);

  const formik = useFormik({
    initialValues: {
      companyName: "",
      companyEmail: "",
      customerName: "",
      customerEmail: "",
    },
    validationSchema: invoiceBusinessDetails,
    onSubmit: (data) => {
      nextStep({ ...data, image: newLogoUrl });
    },
  });

  return (
    <Box>
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
      {/* logo */}
      <Stack direction="row" px="40px" spacing="40px" alignItems="center">
        {previewUrl ? (
          <Image
            src={previewUrl}
            width={120}
            height={120}
            alt="Product image"
            className={Styles.productImage}
          />
        ) : logo ? (
          <Image
            src={logo}
            width={120}
            height={120}
            alt="Product image"
            className={Styles.productImage}
          />
        ) : (
          <AvatarPlaceholder width="120px" height="120px" />
        )}

        <Button
          variant="outlined"
          sx={{ height: "48px", fontSize: "14px" }}
          onClick={handleClick}
        >
          Change logo
        </Button>
      </Stack>
      {/* form */}
      <form onSubmit={formik.handleSubmit}>
        <Stack mt="40px" px="40px" spacing="24px">
          <TextField
            label="Company name"
            variant="outlined"
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
            label="Company email"
            variant="outlined"
            type="email"
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
            label="Customer name"
            variant="outlined"
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
            label="Customer email"
            variant="outlined"
            type="email"
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
        <Stack
          position="sticky"
          bottom={0}
          left={0}
          zIndex={2}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          borderTop="1px solid #E8EAED"
          mt="48px"
          px="40px"
          py="16px"
          spacing="28px"
          bgcolor="#fff"
        >
          <Button variant="text" onClick={close}>
            Cancel
          </Button>
          <LoadingButton
            variant="containedMedium"
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Next
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
}
