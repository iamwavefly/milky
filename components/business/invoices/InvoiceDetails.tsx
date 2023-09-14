import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowUpIcon from "@/public/icons/close.svg";
import { useDispatch } from "react-redux";
import { reload, setDrawalState } from "@/store/appSlice";
import AddIcon from "@/public/icons/add.svg";
import { invoiceDetails } from "@/schema";
import { useFormik } from "formik";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { uuid } from "uuidv4";
import { LoadingButton } from "@mui/lab";
import stringToCurrency from "@/helper/formatCurrency";
import Router from "next/router";
import cloudinary from "@/cloudinaryConfig";
import { notifyErrorHandler, resolveErrorMsg } from "@/middleware/catchErrors";

interface BusinessDetailsProps {
  form: any;
}

export default function InvoiceDetails({ form }: BusinessDetailsProps) {
  const [Items, setItems] = useState<any>([]);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/invoice/create`
  );
  const currencies = useFetch(`${baseUrl}/dashboard/service/currencies`, "get");

  const dispatch = useDispatch();
  const close = () => dispatch(setDrawalState({ active: false }));

  useEffect(() => {
    const { status } = data;
    if (status === "success") {
      close();
      dispatch(reload());
      Router.push("/business/invoice");
    }
  }, [data]);

  useEffect(() => {
    currencies?.handleSubmit();
  }, []);

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
      const { customerName, companyName, customerEmail, companyEmail, image } =
        form;
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
          customer_name: customerName,
          company_name: companyName,
          email_address: customerEmail,
          company_email_address: companyEmail,
          logo: image,
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
    setAmount(totalAmount);
  }, [formik.values, Items]);

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
        {/* form */}
        <Stack mt="40px" px="40px" spacing="24px">
          <TextField
            label="Invoice title"
            variant="outlined"
            name="invoiceTitle"
            value={formik.values.invoiceTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.invoiceTitle && Boolean(formik.errors.invoiceTitle)
            }
            helperText={
              formik.touched.invoiceTitle && formik.errors.invoiceTitle
            }
          />
          <TextField
            label="Due date"
            variant="outlined"
            type="date"
            InputLabelProps={{ shrink: true }}
            name="dueDate"
            value={formik.values.dueDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
            helperText={formik.touched.dueDate && formik.errors.dueDate}
          />
          <TextField
            label="Currency"
            variant="outlined"
            select
            name="currency"
            value={formik.values.currency}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.currency && Boolean(formik.errors.currency)}
            helperText={formik.touched.currency && formik.errors.currency}
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
        {/*  /form */}
        <Stack
          mt="32px"
          pt="24px"
          pb="20px"
          px="40px"
          spacing="24px"
          borderTop="1px solid #E8EAED"
        >
          {/*  items */}
          {Items.length > 0 && (
            <Stack spacing="8px">
              {Items?.map(({ item, id }: any, index: number) => (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  borderBottom="1px solid #E8EAED"
                  py="12px"
                >
                  <Typography color="#070F1C" fontSize="14px" fontWeight={600}>
                    {item}
                  </Typography>
                  <IconButton onClick={() => handleRemoveItem(id)}>
                    <ArrowUpIcon width="20px" height="20px" fill="#6F7A90" />
                  </IconButton>
                </Stack>
              ))}
            </Stack>
          )}
          {/* /items */}
          <TextField
            label="Item description"
            multiline
            variant="outlined"
            rows={5}
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
            label="Quantity"
            variant="outlined"
            name="quantity"
            type="number"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
          />
          <TextField
            label="Unit price"
            variant="outlined"
            type="number"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
          <Box>
            <Button variant="text" onClick={handleNewForm}>
              <AddIcon width="18px" height="18px" fill="#0048B1" /> Add another
              item
            </Button>
          </Box>
        </Stack>
        <Stack
          mt="20px"
          pt="32px"
          pb="20px"
          px="40px"
          spacing="24px"
          borderTop="1px solid #E8EAED"
        >
          <TextField
            label="Invoice notes"
            multiline
            variant="outlined"
            rows={5}
            name="note"
            value={formik.values.note}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.note && Boolean(formik.errors.note)}
            helperText={formik.touched.note && formik.errors.note}
          />
          <TextField
            label="Add discount"
            variant="outlined"
            type="number"
            name="discount"
            value={formik.values.discount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.discount && Boolean(formik.errors.discount)}
            helperText={formik.touched.discount && formik.errors.discount}
          />
          <TextField
            label="Add tax"
            variant="outlined"
            type="number"
            name="tax"
            value={formik.values.tax}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.tax && Boolean(formik.errors.tax)}
            helperText={formik.touched.tax && formik.errors.tax}
          />
        </Stack>
        <Stack mt="20px" px="40px" borderTop="1px solid #E8EAED">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            borderBottom="1px solid #E8EAED"
            pt="12px"
            pb="16px"
          >
            <Typography color="#070F1C" fontSize="14px" fontWeight={500}>
              Subtotal
            </Typography>
            <Typography color="#070F1C" fontSize="14px" fontWeight={600}>
              NGN {stringToCurrency(amount ?? 0)}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            borderBottom="1px solid #E8EAED"
            pt="12px"
            pb="16px"
          >
            <Typography color="#070F1C" fontSize="14px" fontWeight={500}>
              Total
            </Typography>
            <Typography color="#070F1C" fontSize="18px" fontWeight={600}>
              NGN {stringToCurrency(total ?? 0)}
            </Typography>
          </Stack>
        </Stack>
        {/* buttons */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          borderTop="1px solid #E8EAED"
          mt="56px"
          px="40px"
          py="16px"
          spacing="28px"
          bgcolor="#fff"
          position="sticky"
          bottom={0}
          left={0}
          zIndex={2}
        >
          <Button variant="text" onClick={close}>
            Cancel
          </Button>
          <LoadingButton
            variant="containedMedium"
            type="submit"
            loading={loading}
            disabled={!(formik.isValid && formik.dirty)}
          >
            Send invoice
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
}
