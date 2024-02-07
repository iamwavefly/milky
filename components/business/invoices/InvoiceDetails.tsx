import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
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
import Styles from "@/styles/invoice.module.scss";
import { CurrencyProps, InvoiceTypes, ItemsProps } from "@/interfaces";
import moment from "moment";

interface BusinessDetailsProps {
  form: any;
  invoice: InvoiceTypes | undefined;
}

const initialValues = {
  bulk: 1,
  invoiceTitle: "",
  dueDate: "",
  currency: "",
  description: "",
  quantity: "",
  amount: "",
  note: "",
  discount: "",
  tax: "",
};

export default function InvoiceDetails({
  form,
  invoice,
}: BusinessDetailsProps) {
  const [Items, setItems] = useState<ItemsProps[]>([]);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState<string | undefined>(
    undefined
  );

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/invoice/create`
  );
  const updateReq = useFetch(
    `${baseUrl}/dashboard/invoice/edit/${invoice?.id}`,
    "put"
  );
  const currencies = useFetch(`${baseUrl}/dashboard/service/currencies`, "get");

  const dispatch = useDispatch();
  const close = () => dispatch(setDrawalState({ active: false }));

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.invoiceTitle) {
      errors.invoiceTitle = "Invoice title is required";
    }
    if (!values.dueDate) {
      errors.dueDate = "Due date is required";
    }
    if (!values.currency) {
      errors.currency = "Currency is required";
    }
    if (!values.quantity && !Items.length) {
      errors.quantity = "Quantity is required";
    }
    if (!values.amount && !Items.length) {
      errors.amount = "Amount is required";
    }
    if (!values.description && !Items.length) {
      errors.description = "Description is required";
    }

    return errors;
  };

  useEffect(() => {
    const { status } = data;
    if (status === "success") {
      close();
      dispatch(reload());
      Router.push("/business/invoice");
    }
  }, [data]);

  useEffect(() => {
    const { status } = updateReq?.data;
    if (status === "success") {
      close();
      dispatch(reload());
      Router.push("/business/invoice");
    }
  }, [updateReq?.data]);

  useEffect(() => {
    currencies?.handleSubmit();
  }, []);

  const formik = useFormik({
    initialValues,
    validate,
    // validationSchema: invoiceDetails,
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
        amount: +amount,
        quantity: +quantity,
        item: description,
      };

      const filterUnitPrice = [
        ...Items.map(({ unitPrice, ...rest }) => rest),
        item,
      ];

      const { customerName, companyName, customerEmail, companyEmail, image } =
        form;
      let payload = {
        id: undefined as unknown as number,
        invoice_title: invoiceTitle,
        currency_id: currency,
        due_date: dueDate,
        invoice_items: amount && quantity && item ? filterUnitPrice : Items,
        amount: +total,
        discount: +discount,
        tax: +tax,
        description: note,
        business_details: {
          customer_name: customerName,
          company_name: companyName,
          email_address: customerEmail,
          company_email_address: companyEmail,
          logo: image,
        },
      };
      if (invoice) {
        payload.id = invoice.id as number;
        return updateReq?.handleSubmit(payload);
      }
      handleSubmit(payload);
    },
  });

  useEffect(() => {
    const findCurName: CurrencyProps = currencies?.data?.data?.find(
      ({ id }: CurrencyProps) => +formik.values.currency === id
    );
    setSelectedCurrency(findCurName?.short_name);
  }, [formik.values.currency, currencies?.data?.data]);

  useEffect(() => {
    const { amount, quantity } = formik.values;
    let total = function (items: any, prop: string) {
      return items?.reduce(function (a: any, b: { [x: string]: any }) {
        return a + b[prop];
      }, 0);
    };
    const totalAmount = total(
      [...Items, { amount: +amount * +quantity, quantity: +quantity }],
      "amount"
    );
    setAmount(totalAmount);
  }, [formik.values, Items]);

  useEffect(() => {
    const { discount, tax } = formik.values;
    let newAmount = +amount;
    if (discount) {
      newAmount -= +discount;
    }
    if (tax) {
      newAmount += +tax;
    }
    setTotal(newAmount);
  }, [amount, formik.values]);

  const handleNewForm = () => {
    const { description, amount, quantity } = formik.values;
    const newForm: ItemsProps = {
      item: description,
      amount: +amount * +quantity,
      unitPrice: +amount,
      quantity: +quantity,
      id: uuid(),
    };
    if (description && amount && quantity) {
      formik.setFieldValue("description", "");
      formik.setFieldValue("amount", "");
      formik.setFieldValue("quantity", "");
      return setItems((prev: ItemsProps[]) => [...prev, newForm]);
    }
  };

  useEffect(() => {
    if (Items.length) {
      formik.setFieldValue("bulk", 0);
    }
  }, [Items]);

  // prefill data for edit request
  useEffect(() => {
    if (invoice) {
      formik.setValues({
        currency: currencies?.data?.data?.find(
          ({ short_name }: CurrencyProps) => invoice.currency === short_name
        )?.id,
        description: "",
        discount: "" + invoice.discount,
        dueDate: moment(invoice.due_date).format("YYYY-MM-DD"),
        invoiceTitle: invoice.title,
        amount: "",
        tax: "" + invoice.tax,
        quantity: "",
        note: invoice?.description,
        bulk: 0,
      });
    }
  }, [invoice, currencies?.data?.data]);
  // prefill data for edit request -> update invoice items
  useEffect(() => {
    if (invoice?.invoice_items?.length) {
      const itemContruc = invoice?.invoice_items?.map(
        ({ amount, item, quantity }) => ({
          item,
          amount: amount * quantity,
          unitPrice: amount,
          quantity: quantity,
          id: uuid(),
        })
      );
      setItems(itemContruc);
    }
  }, [invoice]);

  const handleRemoveItem = (id: string, e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const newItems = Items?.filter((item: any) => item?.id !== id);
    setItems(newItems);

    // populate the item for edit
    formik.setValues({
      ...formik.values,
      description: "",
      amount: "",
      quantity: "",
    });
  };

  const handleEditItem = (id: string) => {
    const selectedItem = Items.find(
      (item: ItemsProps) => item?.id === id
    ) as ItemsProps;
    // remove the selected item
    const newItems = Items?.filter((item: ItemsProps) => item?.id !== id);
    setItems(newItems);

    // populate the item for edit
    formik.setValues({
      ...formik.values,
      description: selectedItem.item,
      amount: String(selectedItem.unitPrice),
      quantity: String(selectedItem.quantity),
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    // Allow only numbers and decimals
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (regex.test(input) || input === "") {
      // Forward the event to the parent component
      if (formik.handleChange) {
        formik.handleChange(event);
      }
    }
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
              .map(({ short_name, id }: CurrencyProps) => (
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
              {Items?.map(({ item, id }: ItemsProps, index: number) => (
                <Stack
                  className={Styles.itemContainer}
                  onClick={() => handleEditItem(id)}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  borderBottom="1px solid #E8EAED"
                  py="12px"
                >
                  <Typography color="#070F1C" fontSize="14px" fontWeight={600}>
                    {item}
                  </Typography>
                  <IconButton onClick={(e) => handleRemoveItem(id, e)}>
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
            type="text"
            onChange={handleInputChange}
            value={formik.values.quantity}
            onBlur={formik.handleBlur}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
          />
          <TextField
            label="Unit price"
            variant="outlined"
            name="amount"
            onChange={handleInputChange}
            value={formik.values.amount}
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
            onChange={handleInputChange}
            name="discount"
            value={formik.values.discount}
            onBlur={formik.handleBlur}
            error={formik.touched.discount && Boolean(formik.errors.discount)}
            helperText={formik.touched.discount && formik.errors.discount}
          />
          <TextField
            label="Add tax"
            variant="outlined"
            name="tax"
            value={formik.values.tax}
            onChange={handleInputChange}
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
              {selectedCurrency ?? "NGN"} {stringToCurrency(amount ?? 0)}
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
              {selectedCurrency ?? "NGN"} {stringToCurrency(total ?? 0)}
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
            loading={loading || updateReq?.loading}
            disabled={!(formik.isValid && formik.dirty)}
          >
            {invoice ? "Update" : "Send"} invoice
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
}
