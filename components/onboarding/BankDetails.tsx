import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountTypePanel from "../accountTypePanel";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import AddIcon from "@/public/icons/add.svg";
import { bankDetails } from "@/schema";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";

const accountTypes = ["Current", "Savings"];

interface Props {
  nextStep: () => void;
}

export default function BankDetails({ nextStep }: Props) {
  const [banks, setBanks] = useState([]);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/onboarding/bank/details`
  );

  const fetchBankInformation = useFetch(
    `${baseUrl}/dashboard/onboarding/bank/view`,
    "get"
  );
  const fetchBanks = useFetch(`${baseUrl}/dashboard/banks`, "get");
  const resolveAccount = useFetch(`${baseUrl}/payout/account/resolve`, "post");

  useEffect(() => {
    setBanks(fetchBanks?.data?.banks);
  }, [fetchBanks?.data]);

  useEffect(() => {
    const { status, message } = data;
    if (status === "success") {
      nextStep();
    }
  }, [data]);

  // fetch banks
  useEffect(() => {
    fetchBanks.handleSubmit();
  }, []);

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
    <Box>
      <Box bgcolor="#FFF">
        <form onSubmit={formik.handleSubmit}>
          <Box px="40px" pt="29px" pb="14px">
            <Stack spacing="24px" mt="16px">
              <TextField
                label="Account type"
                variant="outlined"
                select
                name="accountType"
                value={formik.values.accountType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.accountType &&
                  Boolean(formik.errors.accountType)
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
                error={
                  formik.touched.bankName && Boolean(formik.errors.bankName)
                }
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
            </Stack>
            <Typography
              mt="8px"
              fontSize="12px"
              lineHeight="18px"
              textAlign="right"
            >
              {formik.values.accountName}
            </Typography>
          </Box>
          <Stack
            spacing="28px"
            justifyContent="flex-end"
            direction="row"
            px="40px"
            py="16px"
            borderTop="1px solid #E8EAED"
          >
            <Button
              variant="text"
              sx={{ p: 0, fontWeight: 600, bgcolor: "transparent !important" }}
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={loading}
              disabled={!(formik.isValid && formik.dirty)}
            >
              Save & Continue
            </LoadingButton>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
