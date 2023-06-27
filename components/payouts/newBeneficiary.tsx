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

const benType = [
  { id: 1, name: "Bank Account", value: "Bank" },
  { id: 2, name: "Alliance User App", value: "UserApp" },
  { id: 3, name: "Alliance Merchant", value: "Merchant" },
];

export default function NewBeneficiary({ reload }: any) {
  const [banks, setBanks] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  const createBeneficiary = useFetch(`${baseUrl}/beneficiary/create`);
  const fetchCurrencies = useFetch(
    `${baseUrl}/dashboard/service/currencies`,
    "get"
  );

  const fetchBanks = useFetch(`${baseUrl}/dashboard/banks`, "get");
  const resolveAccount = useFetch(`${baseUrl}/beneficiary/resolve`, "post");
  // currencies
  useEffect(() => {
    fetchCurrencies?.handleSubmit();
  }, []);
  // beneficiaries
  // banks
  useEffect(() => {
    fetchBanks?.handleSubmit();
  }, []);

  useEffect(() => {
    const strucCurrencies = fetchCurrencies?.data?.data?.filter(
      (cur: any) => cur.is_allowed
    );
    setCurrencies(strucCurrencies);
  }, [fetchCurrencies?.data]);

  const dispatch = useDispatch();
  const close = () => dispatch(setDrawalState({ active: false }));

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
      currency: "",
      accountNumber: "",
      accountName: "",
      bank: "",
      type: "Bank",
    },
    validationSchema: beneficiary,
    onSubmit: ({ accountName, accountNumber, bank, currency, type }) => {
      const payload = {
        type,
        account_number: accountNumber,
        account_name: accountName,
        bank_code: bank,
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
      <Stack spacing="16px">
        {/* currencies */}
        <TextField
          InputLabelProps={{ shrink: true }}
          select
          sx={{ flex: 1 }}
          variant="standard"
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
        {/* currencies */}
        <TextField
          InputLabelProps={{ shrink: true }}
          select
          sx={{ flex: 1 }}
          variant="standard"
          label="Currency"
          defaultValue="NGN"
          name="currency"
          value={formik.values.currency}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.currency && Boolean(formik.errors.currency)}
          helperText={formik.touched.currency && formik.errors.currency}
        >
          {currencies?.map(({ short_name, id }: any) => (
            <MenuItem value={short_name} key={id} sx={{ width: "100%" }}>
              {short_name}
            </MenuItem>
          ))}
        </TextField>
        {/* bank */}
        <TextField
          label="Bank name"
          variant="standard"
          select
          name="bank"
          value={formik.values.bank}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bank && Boolean(formik.errors.bank)}
          helperText={formik.touched.bank && formik.errors.bank}
        >
          {banks?.map(({ name, id, bank_code }: any) => (
            <MenuItem value={bank_code} key={id} sx={{ width: "100%" }}>
              {name}
            </MenuItem>
          ))}
        </TextField>
        {/* beneficiary account */}
        <TextField
          sx={{ flex: 1 }}
          variant="standard"
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
            variant="standard"
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
      <Stack spacing="25px" mt="60px">
        <LoadingButton
          loading={createBeneficiary?.loading}
          variant="contained"
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
        >
          Add Beneficiary
        </LoadingButton>
        <Button variant="outlined" fullWidth onClick={close}>
          Cancel
        </Button>
      </Stack>
    </form>
  );
}
