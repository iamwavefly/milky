import React, { useEffect, useRef, useState } from "react";
import { setDrawalState } from "@/store/appSlice";
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

const accountTypes = ["Current", "Savings"];

export default function BusinessInformation() {
  const [banks, setBanks] = useState([]);

  const dispatch = useDispatch();

  const close = () => dispatch(setDrawalState({ active: false }));

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/onboarding/bank/details`
  );
  const fetchBanks = useFetch(`${baseUrl}/dashboard/banks`, "get");
  const resolveAccount = useFetch(`${baseUrl}/payout/account/resolve`, "post");

  useEffect(() => {
    setBanks(fetchBanks?.data?.banks);
  }, [fetchBanks?.data]);

  useEffect(() => {
    const { status, message } = data;
    if (status === "success") {
      toast.success(message);
      close();
    }
  }, [data]);

  // fetch banks
  useEffect(() => {
    fetchBanks.handleSubmit();
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
    if (accountNumber.length === 10 && bankName) {
      const bank: any = banks.find((bank: any) => bank?.id === bankName);
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
      resolveAccount.data?.data?.account_name
    );
  }, [resolveAccount.data]);

  return (
    <Box>
      <Typography
        fontSize="14px"
        color="rgba(38, 43, 64, 0.8)"
        lineHeight="20px"
      >
        This is the primary bank account we send your settlements to.
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack mt="60px" spacing="13px">
          <TextField
            label="Account type"
            variant="standard"
            select
            name="accountType"
            value={formik.values.accountType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.accountType && Boolean(formik.errors.accountType)
            }
            helperText={formik.touched.accountType && formik.errors.accountType}
          >
            {accountTypes?.map((name, index) => (
              <MenuItem value={name} key={index} sx={{ width: "100%" }}>
                {name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Bank name"
            variant="standard"
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
            variant="standard"
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
            variant="standard"
            name="accountName"
            value={formik.values.accountName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.accountName && Boolean(formik.errors.accountName)
            }
            helperText={formik.touched.accountName && formik.errors.accountName}
          />
        </Stack>
        <LoadingButton
          variant="contained"
          fullWidth
          type="submit"
          loading={loading}
          disabled={!(formik.isValid && formik.dirty)}
          sx={{ mt: "60px" }}
        >
          Save
        </LoadingButton>
      </form>
      <Button onClick={close} variant="outlined" fullWidth sx={{ mt: "25px" }}>
        Cancel
      </Button>
    </Box>
  );
}
