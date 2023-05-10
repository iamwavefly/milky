import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PhotoUploadIcon from "../../../public/icons/photo-upload.svg";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { invoiceDetails } from "@/schema";
import Router from "next/router";
import FileUpload from "@/components/FileUpload";
import Image from "next/image";
import CloseIcon from "remixicon-react/DeleteBinLineIcon";
import { v4 as uuid } from "uuid";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import stringToCurrency from "../../../helper/formatCurrency";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-hot-toast";

interface Props {
  onSubmit: ({}) => void;
  previous: () => void;
  form: {};
}

export default function InvoiceDetails({ onSubmit, previous, form }: Props) {
  const [Items, setItems] = useState<any>([]);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/invoice/create`
  );
  const currencies = useFetch(`${baseUrl}/service/currencies`, "get");

  useEffect(() => {
    currencies?.handleSubmit();
  }, []);

  useEffect(() => {
    const { status, message } = data;
    if (status === "success") {
      toast.success(message);
      Router.push("/business/invoice");
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      bulk: 1,
      invoiceTitle: "",
      dueDate: "",
      currency: "",
      description: "",
      quantity: 1,
      amount: 0,
      note: "",
      discount: 0,
      tax: 0,
    },
    validationSchema: invoiceDetails,
    onSubmit: ({
      currency,
      description,
      discount,
      dueDate,
      invoiceTitle,
      amount,
      tax,
      note,
      quantity,
    }) => {
      const item = {
        amount,
        quantity,
        item: description,
      };
      const payload = {
        invoice_title: invoiceTitle,
        currency_id: currency,
        due_date: dueDate,
        invoice_items: [...Items, item],
        amount: total,
        discount,
        tax,
        description: note,
        business_details: {
          ...form,
        },
      };
      handleSubmit(payload);
    },
  });

  useEffect(() => {
    const { amount, quantity } = formik.values;
    let total = function (items: any, prop: string) {
      return items?.reduce(function (a: any, b: { [x: string]: any }) {
        return a + b[prop];
      }, 0);
    };
    const totalAmount = total(
      [...Items, { amount: amount * quantity, quantity }],
      "amount"
    );
    // const totalQuantity = total([...Items, { amount, quantity }], "quantity");
    setAmount(totalAmount);
  }, [formik.values, Items]);

  // calculate subtottal if no bulk items
  // useEffect(() => {
  //   if (!Items.length) {
  //     setAmount(amount * quantity);
  //   }
  // }, [formik.values, Items]);

  useEffect(() => {
    const { discount, tax } = formik.values;
    let newAmount = amount;
    if (discount) {
      newAmount -= discount;
    }
    if (tax) {
      newAmount += tax;
    }
    setTotal(newAmount);
  }, [amount, formik.values]);

  const handleNewForm = () => {
    const { description, amount, quantity } = formik.values;
    const newForm = {
      item: description,
      amount: amount * quantity,
      quantity,
      id: uuid(),
    };
    if (description && amount && quantity) {
      formik.setFieldValue("description", "");
      formik.setFieldValue("amount", "");
      formik.setFieldValue("quantity", "");
      return setItems((prev: []) => [...prev, newForm]);
    }
  };

  useEffect(() => {
    if (Items.length) {
      formik.setFieldValue("bulk", 0);
    }
  }, [Items]);

  const handleRemoveItem = (id: number) => {
    const newItems = Items?.filter((item: any) => item?.id !== id);
    setItems(newItems);
  };

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Stack direction="row" spacing="30px">
          <Stack spacing="30px">
            {/* title */}
            <Stack p="25px 35px" bgcolor="#FFFFFF" width="468px" spacing="14px">
              <TextField
                label="Invoice Title"
                variant="standard"
                sx={{ flex: 1 }}
                name="invoiceTitle"
                value={formik.values.invoiceTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.invoiceTitle &&
                  Boolean(formik.errors.invoiceTitle)
                }
                helperText={
                  formik.touched.invoiceTitle && formik.errors.invoiceTitle
                }
              />
              <TextField
                label="Due Date"
                variant="standard"
                type="date"
                InputLabelProps={{ shrink: true }}
                sx={{ flex: 1 }}
                name="dueDate"
                value={formik.values.dueDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
                helperText={formik.touched.dueDate && formik.errors.dueDate}
              />
              <TextField
                label="Currency"
                variant="standard"
                sx={{ flex: 1 }}
                name="currency"
                value={formik.values.currency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.currency && Boolean(formik.errors.currency)
                }
                helperText={formik.touched.currency && formik.errors.currency}
                select
              >
                {currencies?.data?.data
                  ?.filter((cur: { is_allowed: boolean }) => cur.is_allowed)
                  .map(({ short_name, id }: any) => (
                    <MenuItem value={id} key={id} sx={{ width: "100%" }}>
                      {short_name}
                    </MenuItem>
                  ))}
              </TextField>
            </Stack>
            {/* Description */}
            <Stack p="25px 35px" spacing="14px" bgcolor="#FFFFFF" width="468px">
              {Items.length ? (
                <Stack mb="16px" spacing="16px">
                  {Items?.map(({ item, id }: any, index: number) => (
                    <Stack
                      key={index}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      height="55px"
                      // border="1px solid rgba(150, 152, 200, 0.2)"
                      px="23px"
                      bgcolor="#F8F8FA"
                      sx={{ cursor: "pointer" }}
                    >
                      <Typography fontSize="12px" color="#2E3192">
                        {item}
                      </Typography>
                      <IconButton
                        onClick={() => handleRemoveItem(id)}
                        sx={{
                          bgcolor: "rgba(234, 89, 81, 0.05)",
                          width: "26px",
                          height: "26px",
                          p: "5px",
                        }}
                      >
                        <CloseIcon size={20} color="#EA5851" />
                      </IconButton>
                    </Stack>
                  ))}
                </Stack>
              ) : (
                ""
              )}
              <TextField
                label="Item Description"
                variant="standard"
                sx={{ flex: 1 }}
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
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
              <TextField
                label="Unit amount"
                variant="standard"
                sx={{ flex: 1 }}
                name="amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
              />
              <Typography
                color="#2E3192"
                pt="40px"
                fontSize="10px"
                fontWeight={500}
                onClick={handleNewForm}
                sx={{ cursor: "pointer" }}
              >
                Add another item
              </Typography>
            </Stack>
          </Stack>
          <Box>
            <Stack p="25px 35px" bgcolor="#FFFFFF" width="468px" spacing="14px">
              <TextField
                label="Invoice Notes"
                variant="standard"
                sx={{ flex: 1 }}
                name="note"
                value={formik.values.note}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.note && Boolean(formik.errors.note)}
                helperText={formik.touched.note && formik.errors.note}
              />
              <TextField
                label="Add Discount"
                variant="standard"
                sx={{ flex: 1 }}
                name="discount"
                type="number"
                value={formik.values.discount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.discount && Boolean(formik.errors.discount)
                }
                helperText={formik.touched.discount && formik.errors.discount}
              />
              <TextField
                label="Add Tax"
                variant="standard"
                type="number"
                sx={{ flex: 1 }}
                name="tax"
                value={formik.values.tax}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.tax && Boolean(formik.errors.tax)}
                helperText={formik.touched.tax && formik.errors.tax}
              />
              <Stack
                pt="20px"
                direction="row"
                justifyContent="space-between"
                height="44px"
                alignItems="center"
              >
                <Typography fontSize="14px" color="#69696B">
                  Subtotal
                </Typography>
                <Typography fontSize="14px" color="#69696B">
                  NGN {stringToCurrency(amount ?? 0)}
                </Typography>
              </Stack>
              <Divider />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontSize="16px" fontWeight={700} color="#262B40">
                  Total
                </Typography>
                <Typography fontSize="16px" fontWeight={700} color="#262B40">
                  NGN {stringToCurrency(total ?? 0)}
                </Typography>
              </Stack>
              <Divider sx={{ mt: "41px", mb: "16px", pt: "30px" }} />
              <Stack direction="row" spacing="10px" justifyContent="flex-end">
                <Button
                  variant="outlined"
                  sx={{ maxHeight: "40px" }}
                  onClick={previous}
                >
                  Back
                </Button>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                  sx={{
                    minWidth: "117px",
                    maxHeight: "40px",
                    fontSize: "14px",
                  }}
                >
                  Send Invoice
                </LoadingButton>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
