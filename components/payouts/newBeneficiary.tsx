import Modal from "@/components/modal/modal";
import clipboard from "@/helper/clipboard";
import stringToCurrency from "@/helper/formatCurrency";
import useFetch from "@/hooks/useFetch";
import { MenuProps } from "@/interfaces";
import baseUrl from "@/middleware/baseUrl";
import { beneficiary, newTransfer } from "@/schema";
import { setDrawalState } from "@/store/appSlice";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Collapse,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { borderRadius } from "@mui/system";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import Footer from "../form/Footer";

const benType = [
  { id: 1, name: "Bank Account", value: "Bank" },
  { id: 2, name: "Arca User App", value: "Mobile" },
  { id: 3, name: "Arca Merchant", value: "Merchant" },
];

export default function NewBeneficiary({ reload, close }: any) {
  const [banks, setBanks] = useState([]);
  const [countries, setCountries] = useState<any>([]);

  const createBeneficiary = useFetch(`${baseUrl}/beneficiary/create`);
  // countries
  const fetchCountries = useFetch(
    `${baseUrl}/dashboard/service/countries`,
    "get"
  );

  const fetchBanks = useFetch(`${baseUrl}/dashboard/banks`, "get");
  const resolveAccount = useFetch(`${baseUrl}/beneficiary/resolve`, "post");
  // fetch countries
  useEffect(() => {
    fetchCountries.handleSubmit();
  }, []);
  // beneficiaries
  // banks
  useEffect(() => {
    fetchBanks?.handleSubmit();
  }, []);

  // filter allowed countries
  useEffect(() => {
    setCountries(fetchCountries?.data?.data);
  }, [fetchCountries?.data]);

  const dispatch = useDispatch();

  useEffect(() => {
    setBanks(fetchBanks?.data?.banks);
  }, [fetchBanks?.data]);

  useEffect(() => {
    const { status } = createBeneficiary?.data;
    if (status === "success") {
      close();
      reload();
    }
  }, [createBeneficiary?.data]);

  // form controller
  const formik = useFormik({
    initialValues: {
      country: "",
      accountNumber: "",
      accountName: "",
      bank: "",
      type: "Bank",
    },
    validationSchema: beneficiary,
    onSubmit: ({ accountName, accountNumber, bank, country, type }) => {
      const payload = {
        type,
        country_id: country,
        account_number: accountNumber,
        account_name: accountName,
        bank_id: bank,
      };
      createBeneficiary?.handleSubmit(payload);
    },
  });

  // resolve account
  useEffect(() => {
    const { accountNumber, bank, type } = formik.values;
    if (accountNumber?.length === 10 && bank) {
      resolveAccount.handleSubmit(
        {
          type,
          bank_code: bank,
          account_number: accountNumber,
        },
        "noToast"
      );
    }
  }, [formik.values.accountNumber, formik.values.bank]);
  // populate account name
  useEffect(() => {
    formik.setFieldValue(
      "accountName",
      resolveAccount.data?.data?.account_name
    );
  }, [resolveAccount.data]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing="24px" px="40px" mt="32px">
        {/* currencies */}
        <TextField
          InputLabelProps={{ shrink: true }}
          select
          sx={{ flex: 1 }}
          variant="outlined"
          label="Type"
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.type && Boolean(formik.errors.type)}
          helperText={formik.touched.type && formik.errors.type}
        >
          {benType?.map(({ id, name, value }: any) => (
            <MenuItem value={value} key={id} sx={{ width: "100%" }}>
              {name}
            </MenuItem>
          ))}
        </TextField>
        {/* countries */}
        <TextField
          label="Country"
          variant="outlined"
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.country && Boolean(formik.errors.country)}
          helperText={formik.touched.country && formik.errors.country}
          select
        >
          {countries?.map(({ name, id, allowed }: MenuProps) => (
            <MenuItem
              disabled={!allowed}
              sx={{ width: "100%" }}
              key={id}
              value={id}
            >
              {name}
            </MenuItem>
          ))}
        </TextField>
        {/* bank */}
        <TextField
          label="Bank name"
          variant="outlined"
          select
          name="bank"
          value={formik.values.bank}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bank && Boolean(formik.errors.bank)}
          helperText={formik.touched.bank && formik.errors.bank}
        >
          {banks?.map(({ name, id }: any) => (
            <MenuItem value={id} key={id} sx={{ width: "100%" }}>
              {name}
            </MenuItem>
          ))}
        </TextField>
        {/* beneficiary account */}
        <TextField
          sx={{ flex: 1 }}
          variant="outlined"
          label="Account Number"
          name="accountNumber"
          value={formik.values.accountNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.accountNumber && Boolean(formik.errors.accountNumber)
          }
          helperText={
            formik.touched.accountNumber && formik.errors.accountNumber
          }
        />
        {/* Beneficiary Name */}
        <Stack position="relative">
          <TextField
            sx={{ flex: 1 }}
            variant="outlined"
            label="Account Name"
            disabled
            name="accountName"
            value={formik.values.accountName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.accountName && Boolean(formik.errors.accountName)
            }
          />
        </Stack>
      </Stack>
      <Footer onClose={close} loading={createBeneficiary?.loading}>
        Add beneficiary
      </Footer>
    </form>
  );
}
