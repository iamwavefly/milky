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

export default function TransferDetails({ reload }: any) {
  const [accounts, setAccounts] = useState<[]>([]);
  const [seletedAccount, setSeletedAccount] = useState<any>({});
  const [selectedId, setSelectedId] = useState("");
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/get/wallet/balance`,
    "get"
  );

  const dispatch = useDispatch();
  const close = () => dispatch(setDrawalState({ active: false }));

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
      <Stack>
        <Typography
          color="rgba(38, 43, 64, 0.8)"
          fontSize="14px"
          fontWeight={500}
          maxWidth="401px"
        >
          To fund your naira wallet, make a transfer to the account details
          below:
        </Typography>
        {/* account details */}
        <Stack
          mt="25px"
          gap="13px"
          bgcolor="#F3F3F9"
          padding="22px 26px"
          height="130px"
        >
          <Stack direction="row" alignItems="center">
            <Typography
              width="50%"
              color="rgba(38, 43, 64, 0.8)"
              fontSize="14px"
            >
              Bank name:
            </Typography>
            <Typography
              color="rgba(38, 43, 64, 0.8)"
              fontSize="14px"
              fontWeight={500}
            >
              {seletedAccount?.bank_name?.length
                ? seletedAccount?.bank_name
                : "N/A"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography
              width="50%"
              color="rgba(38, 43, 64, 0.8)"
              fontSize="14px"
            >
              Account number:
            </Typography>
            <Stack direction="row" alignItems="center" spacing="14px">
              <Typography
                color="rgba(38, 43, 64, 0.8)"
                fontSize="14px"
                fontWeight={500}
              >
                {seletedAccount?.account_number?.length
                  ? seletedAccount?.account_number
                  : "N/A"}
              </Typography>
              <Button
                sx={{
                  color: "rgba(38, 43, 64, 0.8)",
                  fontSize: "10px",
                  width: "35px",
                  height: "20px",
                  padding: "2px 4px",
                  borderRadius: 0,
                }}
                onClick={() =>
                  clipboard(seletedAccount?.account_number ?? "...")
                }
              >
                Copy
              </Button>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography
              width="50%"
              color="rgba(38, 43, 64, 0.8)"
              fontSize="14px"
            >
              Account name:
            </Typography>
            <Typography
              color="rgba(38, 43, 64, 0.8)"
              fontSize="14px"
              fontWeight={500}
            >
              {seletedAccount?.account_name?.length
                ? seletedAccount?.account_name
                : "N/A"}
            </Typography>
          </Stack>
        </Stack>
        {/* account type */}
        <InputLabel sx={{ mt: "14px", mb: "4px", left: 0 }}>
          Which balance do you want to fund?
        </InputLabel>
        <Select
          label="Link Name*"
          variant="standard"
          name="linkName"
          value={selectedId}
          onChange={handleChange}
        >
          {accounts?.map(
            ({ currency_short_name, wallet_id, available_balance }: any) => (
              <MenuItem
                sx={{ width: "100%" }}
                key={wallet_id}
                value={wallet_id}
              >
                {currency_short_name} Balance:{" "}
                {stringToCurrency(available_balance)}
              </MenuItem>
            )
          )}
        </Select>
      </Stack>
      <Stack spacing="25px" mt="60px">
        <LoadingButton variant="outlined" fullWidth onClick={close}>
          Close
        </LoadingButton>
      </Stack>
    </form>
  );
}
