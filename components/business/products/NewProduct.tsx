import BulkImageUpload from "@/components/BulkUpload";
import Checkbox from "@/components/elements/Checkbox";
import { ProductImage } from "@/types";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  IconButton,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { reload, setDrawalState } from "@/store/appSlice";
import { useFormik } from "formik";
import { newProduct } from "@/schema";
import Router from "next/router";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { serialize } from "object-to-formdata";
import EditIcon from "@/public/icons/edit.svg";
import DeleteIcon from "@/public/icons/delete.svg";
import AddBox from "@/public/icons/add.svg";
import { Product } from "@/interfaces";

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

type NewProductProps = {
  product?: Product | null;
};

export default function NewProduct({ product }: NewProductProps) {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [previewImage, setPreviewImage] = useState("");
  const [form, setForm] = useState(feeDefault);
  const [fees, setFees] = useState<any>([]);
  const [showFeeForm, setShowFeeForm] = useState(false);

  const dispatch = useDispatch();
  const close = () => dispatch(setDrawalState({ active: false }));

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/product/${product ? `edit/${product?.id}` : "create"}`
  );
  const currencies = useFetch(`${baseUrl}/dashboard/service/currencies`, "get");

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    currencies?.handleSubmit();
  }, []);

  useEffect(() => {
    const { status } = data;
    if (status === "success") {
      close();
      dispatch(reload());
      Router.push("/business/products");
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      productName: "",
      productDescription: "",
      price: null,
      quantity: 1,
      containsPhysicalGoods: false,
      deliveryAddressRequired: false,
      deliveryNoteRequired: false,
      onDeal: false,
      dealPrice: null,
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
      let formdata = new FormData();
      formdata.append("name", productName);
      formdata.append("description", productDescription);
      formdata.append("price", "" + price);
      formdata.append("dealprice", "" + dealPrice);
      formdata.append("ondeal", JSON.stringify(onDeal));
      formdata.append(
        "containsphysicalgoods",
        JSON.stringify(containsPhysicalGoods)
      );
      formdata.append(
        "deliveryaddressrequired",
        JSON.stringify(deliveryAddressRequired)
      );
      formdata.append(
        "deliverynoterequired",
        JSON.stringify(deliveryNoteRequired)
      );
      formdata.append("fee", JSON.stringify(fees));
      formdata.append("stock", "" + quantity);
      formdata.append("url", url);

      [...images, previewImage].forEach((image: any) => {
        formdata.append("images", image);
      });

      handleSubmit(formdata);
    },
  });

  useEffect(() => {
    if (product) {
      const {
        name,
        description,
        price,
        stock,
        is_physical,
        can_be_delivered,
        is_delivery_note,
        is_on_deal,
        discount,
        image,
      } = product;

      formik.setValues({
        productName: name,
        productDescription: description,
        price: price as any,
        quantity: stock,
        containsPhysicalGoods: is_physical,
        deliveryAddressRequired: can_be_delivered,
        deliveryNoteRequired: is_delivery_note,
        onDeal: is_on_deal,
        dealPrice: (discount > 0 ? discount : undefined) as any,
        url: "",
      });

      // formik.setFieldValue("productName", name);
      // formik.setFieldValue("productDescription", description);
      // formik.setFieldValue("price", price);
      // formik.setFieldValue("quantity", stock);
      // formik.setFieldValue("containsPhysicalGoods", is_physical);
      // formik.setFieldValue("deliveryAddressRequired", can_be_delivered);
      // formik.setFieldValue("deliveryNoteRequired", is_delivery_note);
      // formik.setFieldValue("onDeal", is_on_deal);
      // formik.setFieldValue("dealPrice", discount);
      // update image
      setPreviewImage(image);
    }
  }, [product]);

  const newFeeHandler = () => {
    setShowFeeForm(false);
    setFees((prev: any) => [...prev, form]);
    setForm(feeDefault);
  };

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        {/* product images */}
        <Box mt="32px" px="40px" pb="32px">
          <Typography fontSize="18px" fontWeight={500} lineHeight="26px">
            Product image
          </Typography>
          <Typography
            mt="12px"
            color="#3C4453"
            fontSize="14px"
            lineHeight="24px"
            letterSpacing="0.14px"
          >
            Add up to 6 high quality product images. Maximum upload size is 10mb
          </Typography>
          <Box mt="32px">
            <BulkImageUpload
              images={previewImage}
              limit={6}
              uploadImages={setImages}
            />
          </Box>
        </Box>
        <Divider />
        {/* product details */}
        <Box mt="32px" px="40px" pb="28px">
          <Typography fontSize="18px" fontWeight={500} lineHeight="26px">
            Product information
          </Typography>
          <Stack spacing="24px" mt="32px">
            <TextField
              label="Product name"
              variant="outlined"
              name="productName"
              value={formik.values.productName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.productName && Boolean(formik.errors.productName)
              }
              helperText={
                formik.touched.productName && formik.errors.productName
              }
            />
            <TextField
              label="Product description"
              variant="outlined"
              multiline
              rows={5}
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
              variant="outlined"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
            <TextField
              label="Quantity"
              variant="outlined"
              sx={{ flex: 1 }}
              name="quantity"
              type="number"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.quantity && Boolean(formik.errors.quantity)}
              helperText={formik.touched.quantity && formik.errors.quantity}
            />
          </Stack>
        </Box>
        <Divider />
        {/* delivery details */}
        <Box mt="24px" px="40px" pb="32px">
          <Typography fontSize="18px" fontWeight={500} lineHeight="26px">
            Delivery
          </Typography>
          <Stack spacing="16px" mt="16px">
            {deliveryTypes?.map(({ id, name, value }) => {
              return (
                <FormControlLabel
                  key={id}
                  // @ts-ignore
                  control={<Checkbox checked={formik.values[name]} />}
                  name={name}
                  onChange={formik.handleChange}
                  label={value}
                />
              );
            })}
          </Stack>
          {/* <Stack spacing="24px" mt="24px">
            <TextField label="Handling fee" variant="outlined" />
            <TextField label="Delivery fee" variant="outlined" />
          </Stack> */}
          {/* fees */}
          <Stack mt="24px">
            {fees?.map(({ name, fee }: any, index: number) => {
              return (
                <Stack
                  key={index}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography fontSize="14px" color="#262B40" fontWeight={500}>
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
          <Box mt="24px">
            {showFeeForm ? (
              <Stack spacing="28px">
                <Stack direction="row" spacing="20px">
                  <TextField
                    label="Name"
                    variant="outlined"
                    sx={{ flex: 1 }}
                    name="name"
                    value={form.name}
                    onChange={onChange}
                  />
                  <TextField
                    label="Fee"
                    variant="outlined"
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
                  variant="outlinedMedium"
                >
                  <AddBox width="18px" height="18px" fill="#0048B1" />
                  Add fee
                </Button>
              </Stack>
            ) : (
              <Button
                onClick={() => setShowFeeForm(true)}
                variant="outlinedMedium"
              >
                <AddBox width="18px" height="18px" fill="#0048B1" />
                Add delivery fee
              </Button>
            )}
          </Box>
        </Box>
        {/* sale details */}
        <Divider />
        <Box mt="24px" px="40px" pb="32px">
          <Typography fontSize="18px" fontWeight={500} lineHeight="26px">
            Sale
          </Typography>
          <Box sx={{ mt: "16px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="onDeal"
                  checked={formik.values.onDeal}
                  defaultChecked={true}
                />
              }
              onChange={formik.handleChange}
              label="This product is on sale"
            />
          </Box>
          <Stack spacing="24px" mt="24px">
            <TextField
              label="Sales price"
              variant="outlined"
              type="number"
              name="dealPrice"
              value={formik.values.dealPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.dealPrice && Boolean(formik.errors.dealPrice)
              }
              helperText={formik.touched.dealPrice && formik.errors.dealPrice}
            />
          </Stack>
        </Box>
        {/* sale details */}
        <Divider />
        <Box mt="24px" px="40px" pb="32px">
          <Typography fontSize="18px" fontWeight={500} lineHeight="26px">
            Product URL
          </Typography>
          <Stack mt="20px">
            <TextField
              label="Product URL"
              variant="outlined"
              sx={{ flex: 1 }}
              name="url"
              value={formik.values.url}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.url && Boolean(formik.errors.url)}
              helperText={formik.touched.url && formik.errors.url}
            />
          </Stack>
        </Box>
        <Stack
          position="sticky"
          bottom={0}
          left={0}
          direction="row"
          spacing="28px"
          px="40px"
          py="16px"
          mt="44px"
          borderTop="1px solid #E8EAED"
          alignItems="center"
          justifyContent="flex-end"
          bgcolor="#fff"
          zIndex={2}
        >
          <Button variant="text" onClick={close}>
            Cancel
          </Button>
          <LoadingButton
            sx={{ width: "104px" }}
            variant="contained"
            type="submit"
            loading={loading}
            disabled={!(formik.isValid && formik.dirty)}
          >
            Save {product && "Changes"}
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
}
