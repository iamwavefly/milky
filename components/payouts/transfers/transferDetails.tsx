import Footer from "@/components/form/Footer";
import clipboard from "@/helper/clipboard";
import stringToCurrency from "@/helper/formatCurrency";
import useFetch from "@/hooks/useFetch";
import { MenuProps } from "@/interfaces";
import baseUrl from "@/middleware/baseUrl";
import { bankDetails, newCustomer, newPaymentLink } from "@/schema";
import { setDrawalState } from "@/store/appSlice";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
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

export default function TransferDetails({ reload, close }: any) {
  const [accounts, setAccounts] = useState<[]>([]);
  const [seletedAccount, setSeletedAccount] = useState<any>({});
  const [selectedId, setSelectedId] = useState("");
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/get/wallet/balance`,
    "get"
  );

  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent<typeof selectedId>) => {
    const { value } = event.target;
    const findWallet: any = accounts.find(
      (account: any) => account.wallet_id === value
    );
    setSeletedAccount(findWallet.account_details);
    setSelectedId(value);
  };

  useEffect(() => {
    setAccounts(data?.wallets);
  }, [data]);

  useEffect(() => {
    const wallet = data?.wallets?.[0];
    setSelectedId(wallet?.wallet_id);
    setSeletedAccount(wallet);
  }, [data]);

  useEffect(() => {
    handleSubmit();
  }, []);

  // form controller
  const formik = useFormik({
    initialValues: {
      linkName: "",
      description: "",
      paymentType: "",
      amount: "",
    },
    validationSchema: newPaymentLink,
    onSubmit: ({ linkName, description, amount, paymentType }) => {
      const payload = {
        name: linkName,
        description: description,
        amount,
        payment_type: paymentType,
      };
      handleSubmit(payload);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack px="40px" mt="32px" gap="24px">
        <TextField variant="outlined" label="Account name" />
        <TextField variant="outlined" label="Account number" type="number" />
      </Stack>
      <Footer>Top-up</Footer>
    </form>
  );
}
