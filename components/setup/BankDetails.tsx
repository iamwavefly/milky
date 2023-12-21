import React, { useEffect, useRef, useState } from "react";
import { reload, setDrawalState } from "@/store/appSlice";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import UploadIcon from "../../public/icons/photo-upload.svg";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { useFormik } from "formik";
import { bankDetails } from "@/schema";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-hot-toast";
import { selectUserState } from "@/store/authSlice";
import Footer from "../form/Footer";

const accountTypes = ["Current", "Savings"];

interface Props {
  append?: boolean;
  reload?: () => void;
  close?: () => void;
}

export default function BankDetails({ append, reload, close }: Props) {
  const [banks, setBanks] = useState([]);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/onboarding/bank/details`
  );
  const fetchBanks = useFetch(`${baseUrl}/dashboard/banks`, "get");
  const resolveAccount = useFetch(`${baseUrl}/payout/account/resolve`, "post");

  useEffect(() => {
    setBanks(fetchBanks?.data?.banks);
  }, [fetchBanks?.data]);

  useEffect(() => {
    const { status } = data;
    if (status === "success") {
      reload && reload();
      close && close();
    }
  }, [data]);

  // fetch banks
  useEffect(() => {
    fetchBanks.handleSubmit();
  }, []);

  const fetchBankInformation = useFetch(
    `${baseUrl}/dashboard/onboarding/bank/view`,
    "get"
  );

  useEffect(() => {
    fetchBankInformation.handleSubmit();
  }, []);

  // form controller
  const formik = useFormik({
    initialValues: {
      accountType: "",
      bankName: "",
      accountNumber: "",
      accountName: "",
    },
    validationSchema: bankDetails,
    onSubmit: ({ accountName, accountNumber, accountType, bankName }) => {
      const payload = {
        bank_id: bankName,
        account_number: accountNumber,
        account_name: accountName,
        account_type: accountType,
      };
      handleSubmit(payload);
    },
  });

  // resolve account
  useEffect(() => {
    const { accountNumber, bankName } = formik.values;
    if (accountNumber?.length === 10 && bankName) {
      const bank: any = banks?.find((bank: any) => bank?.id === bankName);
      resolveAccount.handleSubmit({
        bank_code: bank?.bank_code,
        account_number: accountNumber,
      });
    }
  }, [formik.values.accountNumber, formik.values.bankName]);
  // populate account name
  useEffect(() => {
    formik.setFieldValue(
      "accountName",
      resolveAccount?.data?.data?.account_name
    );
  }, [resolveAccount?.data]);

  useEffect(() => {
    if (fetchBankInformation?.data?.data) {
      const { id, bank_name, account_name, account_number } =
        fetchBankInformation?.data?.data?.[0] ?? {};
      const bank: any = banks?.find((bk: any) => bk.name === bank_name);
      formik.setValues({
        accountType: "",
        bankName: bank?.id,
        accountNumber: account_number,
        accountName: account_name,
      });
    }
  }, [fetchBankInformation?.data]);

  return (
    <Box mt="32px">
      <form onSubmit={formik.handleSubmit}>
        <Box px="40px">
          <Typography
            fontSize="14px"
            color="rgba(38, 43, 64, 0.8)"
            lineHeight="20px"
          >
            This is the primary bank account we send your settlements to.
          </Typography>
          <Stack mt="24px" spacing="24px">
            <TextField
              label="Account type"
              variant="outlined"
              select
              name="accountType"
              value={formik.values.accountType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.accountType && Boolean(formik.errors.accountType)
              }
              helperText={
                formik.touched.accountType && formik.errors.accountType
              }
            >
              {accountTypes?.map((name, index) => (
                <MenuItem value={name} key={index} sx={{ width: "100%" }}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Bank name"
              variant="outlined"
              select
              name="bankName"
              value={formik.values.bankName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.bankName && Boolean(formik.errors.bankName)}
              helperText={formik.touched.bankName && formik.errors.bankName}
            >
              {banks?.map(({ name, id, bank_code }: any) => (
                <MenuItem value={id} key={id} sx={{ width: "100%" }}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Account number"
              variant="outlined"
              name="accountNumber"
              value={formik.values.accountNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.accountNumber &&
                Boolean(formik.errors.accountNumber)
              }
              helperText={
                formik.touched.accountNumber && formik.errors.accountNumber
              }
            />
            <TextField
              label="Account name"
              variant="outlined"
              name="accountName"
              disabled
              value={formik.values.accountName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.accountName && Boolean(formik.errors.accountName)
              }
              helperText={
                formik.touched.accountName && formik.errors.accountName
              }
            />
          </Stack>
        </Box>
        <Footer loading={loading}>Save Changes</Footer>
      </form>
    </Box>
  );
}
