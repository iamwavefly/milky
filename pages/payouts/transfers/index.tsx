import React, { useEffect, useState } from "react";
import Dashboard from "@/layouts/dashboard";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import FundIcon from "remixicon-react/FundsBoxLineIcon";
import SendIcon from "remixicon-react/SendPlane2LineIcon";
import { useDispatch } from "react-redux";
import { setDrawalState } from "@/store/appSlice";
import TransferDetails from "@/components/payouts/transfers/transferDetails";
import TransferTable from "@/components/payouts/transfers/transferTable";
import MakeTransfer from "@/components/payouts/transfers/makeTransfer";
import Tabs from "@/components/Tabs";
import TransferCurrency from "@/components/payouts/transfers/transferCurrency";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { walletProps } from "@/interfaces";

export default function Index() {
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/get/wallet/balance`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    const newWalletTabs = data?.wallets?.map(
      ({ currency_short_name, wallet_id }: walletProps) => {
        return {
          tab: currency_short_name,
          id: wallet_id,
          Form: TransferCurrency,
        };
      }
    );
    setTabs(newWalletTabs);
  }, [data]);

  return (
    <Dashboard title="Transfers">
      {/* tabs */}
      <Tabs tabs={tabs} updateTab={setCurrentTab} />
      {/* table */}
      <Box>
        <TransferTable />
      </Box>
    </Dashboard>
  );
}
