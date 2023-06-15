// @ts-nocheck
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PhotoUploadIcon from "../../../public/icons/photo-upload.svg";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { invoiceDetails, newProduct } from "@/schema";
import Router from "next/router";
import FileUpload from "@/components/FileUpload";
import Image from "next/image";
import { v4 as uuid } from "uuid";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import stringToCurrency from "../../../helper/formatCurrency";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-hot-toast";
import DeleteIcon from "remixicon-react/DeleteBinLineIcon";
import EditIcon from "remixicon-react/EditLineIcon";
import AddBox from "remixicon-react/AddBoxFillIcon";
import CheckboxIcon from "remixicon-react/CheckboxFillIcon";
import { serialize } from "object-to-formdata";

const deliveryTypes = [
  {
    id: 1,
    name: "containsPhysicalGoods",
    value: "This product contains one or more physical products",
  },
  {
    id: 2,
    name: "deliveryAddressRequired",
    value: "Requires delivery address",
  },
  {
    id: 3,
    name: "deliveryNoteRequired",
    value: "Requires delivery note",
  },
];

const feeDefault = { name: "", fee: "" };

export default function NewProduct({ product }: any) {
  const actualBtnRef = useRef(null);
  const [fileName, setFileName] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [form, setForm] = useState(feeDefault);
  const [showFeeForm, setShowFeeForm] = useState(false);
  const [fees, setFees] = useState<any>([]);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/product/${product ? `edit/${product?.id}` : "create"}`
  );
  const currencies = useFetch(`${baseUrl}/dashboard/service/currencies`, "get");

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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

  useEffect(() => {
    currencies?.handleSubmit();
  }, []);

  useEffect(() => {
    const { status, message } = data;
    if (status === "success") {
      Router.push("/business/products");
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      productName: "",
      productDescription: "",
      price: "",
      quantity: 1,
      containsPhysicalGoods: false,
      deliveryAddressRequired: false,
      deliveryNoteRequired: false,
      onDeal: false,
      dealPrice: "",
      url: "",
    },
    validationSchema: newProduct,
    onSubmit: ({
      containsPhysicalGoods,
      dealPrice,
      deliveryAddressRequired,
      deliveryNoteRequired,
      onDeal,
      price,
      productDescription,
      productName,
      quantity,
      url,
    }) => {
      const payload = {
        name: productName,
        description: productDescription,
        price,
        dealprice: dealPrice,
        ondeal: onDeal,
        containsphysicalgoods: containsPhysicalGoods,
        deliveryaddressrequired: deliveryAddressRequired,
        deliverynoterequired: deliveryNoteRequired,
        fee: JSON.stringify(fees),
        stock: quantity,
        images: selectedFile,
        url,
      };

      const formData = serialize(payload);
      handleSubmit(formData);
    },
  });

  useEffect(() => {
    formik.setFieldValue("productName", product?.name);
    formik.setFieldValue("productDescription", product?.description);
    formik.setFieldValue("price", product?.price);
    formik.setFieldValue("dealprice", product?.deal_price);
    formik.setFieldValue("ondeal", product?.is_on_deal);
    formik.setFieldValue("containsphysicalgoods", product?.is_physical);
    formik.setFieldValue("deliveryaddressrequired", product?.can_be_delivered);
    formik.setFieldValue("deliverynoterequired", product?.is_delivery_note);
    formik.setFieldValue("stock", product?.stock);
    formik.setFieldValue("quantity", product?.stock);
    formik.setFieldValue("url", product?.url);

    // restructure fees
    const newFees = product?.fees?.map(({ fee_name: name, amount: fee }) => ({
      name,
      fee,
    }));
    // update fees
    setFees(newFees);
    // update images
    const imageUrl = `https://subsidiary-dashboard-api-service-dev.eks-alliancepay.com/subsidiary/dashboard/file/alliancepay-compliance-images/download?fileId=${product?.images?.[0]}`;
    setSelectedFile(imageUrl);
    setPreviewUrl(imageUrl);
  }, [product]);

  const newFeeHandler = () => {
    setShowFeeForm(false);
    setFees((prev: any) => [...prev, form]);
    setForm(feeDefault);
  };

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Stack direction="row" spacing="30px">
          <Stack spacing="30px">
            {/* title */}
            <Stack p="25px 35px" bgcolor="#FFFFFF" width="468px" spacing="14px">
              <Typography fontSize="14px" fontWeight={500}>
                Product Information
              </Typography>
              <TextField
                label="Product Name"
                variant="standard"
                sx={{ flex: 1 }}
                name="productName"
                value={formik.values.productName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.productName &&
                  Boolean(formik.errors.productName)
                }
                helperText={
                  formik.touched.productName && formik.errors.productName
                }
              />
              <TextField
                label="Product Description"
                variant="standard"
                multiline
                rows={0}
                sx={{ flex: 1 }}
                placeholder="Red leather bag with red chain. Made with high quality lea..."
                name="productDescription"
                value={formik.values.productDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.productDescription &&
                  Boolean(formik.errors.productDescription)
                }
                helperText={
                  formik.touched.productDescription &&
                  formik.errors.productDescription
                }
              />
              <TextField
                label="Price"
                variant="standard"
                sx={{ flex: 1 }}
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
              <TextField
                label="Quantity"
                variant="standard"
                sx={{ flex: 1 }}
                name="quantity"
                type="number"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.quantity && Boolean(formik.errors.quantity)
                }
                helperText={formik.touched.quantity && formik.errors.quantity}
              />
            </Stack>
            {/* Description */}
            <Stack p="25px 35px" spacing="28px" bgcolor="#FFFFFF" width="468px">
              <Typography fontSize="14px" fontWeight={500}>
                Delivery
              </Typography>
              <Stack spacing="8px">
                {deliveryTypes?.map(({ id, name, value }) => {
                  return (
                    <FormControlLabel
                      key={id}
                      control={<Checkbox checked={formik.values[name]} />}
                      name={name}
                      onChange={formik.handleChange}
                      label={
                        <Typography color="#262B40" fontSize="12px" ml="8px">
                          {value}
                        </Typography>
                      }
                    />
                  );
                })}
              </Stack>
              {/* fees */}
              <Stack>
                {fees?.map(({ name, fee }: any, index: number) => {
                  return (
                    <Stack
                      key={index}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        fontSize="14px"
                        color="#262B40"
                        fontWeight={500}
                      >
                        {name} - NGN {fee}
                      </Typography>
                      <Stack direction="row">
                        <IconButton>
                          <EditIcon color="#2E3192" size={20} />
                        </IconButton>
                        <IconButton>
                          <DeleteIcon color="#EA5851" size={20} />
                        </IconButton>
                      </Stack>
                    </Stack>
                  );
                })}
              </Stack>
              {/* Box to add fee */}
              {showFeeForm ? (
                <Stack spacing="28px">
                  <Stack direction="row" spacing="20px">
                    <TextField
                      label="Name"
                      variant="standard"
                      sx={{ flex: 1 }}
                      name="name"
                      value={form.name}
                      onChange={onChange}
                    />
                    <TextField
                      label="Fee"
                      variant="standard"
                      type="number"
                      sx={{ flex: 1 }}
                      name="fee"
                      value={form.fee}
                      onChange={onChange}
                    />
                  </Stack>
                  <Button
                    onClick={newFeeHandler}
                    disabled={!form.name || !form.fee}
                    variant="contained"
                  >
                    <AddBox size={20} />
                    Add fee
                  </Button>
                </Stack>
              ) : (
                <Button onClick={() => setShowFeeForm(true)} variant="outlined">
                  <AddBox size={20} color="#2E3192" />
                  Add delivery fee
                </Button>
              )}
            </Stack>
            {/* deal sales */}
            <Stack p="25px 35px" spacing="28px" bgcolor="#FFFFFF" width="468px">
              <Typography fontSize="14px" fontWeight={500}>
                Sale
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    name="onDeal"
                    checked={formik.values.onDeal}
                    defaultChecked={true}
                  />
                }
                onChange={formik.handleChange}
                label={
                  <Typography color="#262B40" fontSize="12px" ml="8px">
                    This product is on sale
                  </Typography>
                }
              />
              <TextField
                label="Sales price"
                variant="standard"
                sx={{ flex: 1 }}
                name="dealPrice"
                type="number"
                value={formik.values.dealPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.dealPrice && Boolean(formik.errors.dealPrice)
                }
                helperText={formik.touched.dealPrice && formik.errors.dealPrice}
              />
            </Stack>
            {/* product url */}
            <Stack p="25px 35px" spacing="9px" bgcolor="#FFFFFF" width="468px">
              <Typography fontSize="14px" fontWeight={500}>
                Product URL
              </Typography>
              <TextField
                label="Product URL"
                variant="standard"
                sx={{ flex: 1 }}
                name="url"
                value={formik.values.url}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.url && Boolean(formik.errors.url)}
                helperText={formik.touched.url && formik.errors.url}
              />
            </Stack>
          </Stack>
          {/* product photo - right form */}
          <Box>
            <Stack p="25px 35px" bgcolor="#FFFFFF" width="468px">
              <Typography fontSize="14px" fontWeight={500}>
                Product Image
              </Typography>
              <Typography mt="5px" fontSize="12px" color="#92959F">
                Add up to 6 high quality product images
              </Typography>
              <Stack direction="row" alignItems="center" mt="20px">
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
                  justifyContent="center"
                  alignItems="center"
                  width="138px"
                  height="138px"
                  bgcolor="#F5F5F5"
                >
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      width={138}
                      height={138}
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <PhotoUploadIcon />
                  )}
                </Stack>
                <Button
                  sx={{
                    ml: "20px",
                    height: "40px !important",
                    py: "0 !important",
                    fontSize: "12px",
                  }}
                  variant="outlined"
                  onClick={handleClick}
                >
                  Upload Image
                </Button>
              </Stack>
              <Typography mt="26px" fontSize="12px" color="#69696B">
                Add another image
              </Typography>
              <Stack direction="row" mt="26px">
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  type="submit"
                  fullWidth
                  disabled={!(formik.isValid && formik.dirty)}
                  sx={{
                    fontSize: "14px",
                  }}
                >
                  <CheckboxIcon size={20} />
                  {product ? "Update" : "Save"}
                </LoadingButton>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
