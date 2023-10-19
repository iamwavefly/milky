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
import CopyIcon from "@/public/icons/copy.svg";
import Footer from "@/components/form/Footer";

export default function FundBalance({ reload, close }: any) {
  const [accounts, setAccounts] = useState<[]>([]);
  const [seletedAccount, setSeletedAccount] = useState<any>({});
  const [seletedCurrency, setSeletedCurrency] = useState<string>("");
  const [selectedId, setSelectedId] = useState("");

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/get/wallet/balance`,
    "get"
  );

  const handleChange = (event: any) => {
    const { value } = event.target;
    const findWallet: any = accounts.find(
      (account: any) => account.wallet_id === value
    );
    setSeletedAccount(findWallet.account_details);
    setSeletedCurrency(findWallet.currency_name);
    setSelectedId(value);
  };

  useEffect(() => {
    setAccounts(data?.wallets);
  }, [data]);

  useEffect(() => {
    const wallet = data?.wallets?.[0];
    setSelectedId(wallet?.wallet_id);
    setSeletedCurrency(wallet?.currency_name);
    setSeletedAccount(wallet?.account_details);
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
      <Stack px="40px" my="32px">
        <Typography color="#3C4453" fontSize="15px" lineHeight="26px">
          To fund your {seletedCurrency?.toLowerCase()} wallet, make a transfer
          to the account details below
        </Typography>
        {/* account details */}
        <Stack
          mt="20px"
          height="216px"
          border="1px solid #E8EAED"
          borderRadius="8px"
        >
          <Stack
            justifyContent="center"
            height="72px"
            borderBottom="1px solid #E8EAED"
            px="24px"
            gap="2px"
          >
            <Typography color="#6F7A90" fontSize="12px" lineHeight="18px">
              Account Number
            </Typography>
            <Stack direction="row" spacing="16px" alignItems="center">
              <Typography
                color="#162031"
                fontSize="15px"
                lineHeight="26px"
                fontWeight={600}
              >
                {seletedAccount?.account_number}
              </Typography>
              {seletedAccount?.account_number && (
                <Button
                  sx={{ fontSize: "12px", fontWeight: 600, lineHeight: "18px" }}
                  variant="text"
                  onClick={() => clipboard(seletedAccount?.account_number)}
                >
                  Copy <CopyIcon />
                </Button>
              )}
            </Stack>
          </Stack>
          <Stack
            justifyContent="center"
            height="72px"
            borderBottom="1px solid #E8EAED"
            px="24px"
            gap="2px"
          >
            <Typography color="#6F7A90" fontSize="12px" lineHeight="18px">
              Bank Name
            </Typography>
            <Stack direction="row" spacing="16px" alignItems="center">
              <Typography
                color="#162031"
                fontSize="15px"
                lineHeight="26px"
                fontWeight={600}
              >
                {seletedAccount?.bank_name}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            justifyContent="center"
            height="72px"
            borderBottom="1px solid #E8EAED"
            px="24px"
            gap="2px"
          >
            <Typography color="#6F7A90" fontSize="12px" lineHeight="18px">
              Account Name
            </Typography>
            <Stack direction="row" spacing="16px" alignItems="center">
              <Typography
                color="#162031"
                fontSize="15px"
                lineHeight="26px"
                fontWeight={600}
              >
                {seletedAccount?.account_name}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        {/* account type */}
        <Stack spacing="24px" mt="24px" pb="16px">
          <TextField
            label="Which balance do you want to fund?"
            variant="outlined"
            name="linkName"
            value={selectedId}
            onChange={handleChange}
            select
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
          </TextField>
          {/* <TextField label="Funding amount" variant="outlined" type="number" /> */}
        </Stack>
      </Stack>
      {/* <Footer onClose={close}>Fund balance </Footer> */}
    </form>
  );
}
