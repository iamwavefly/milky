import React, { useState } from "react";
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
import LandscapeCard from "@/components/cards/LandscapeCard";

import CoinsIcon from "@/public/icons/coins.svg";
import ReportIcon from "@/public/icons/report.svg";
import SemdIcon from "@/public/icons/send.svg";


const TransferCurrency = ({ currentTab }: { currentTab: number }) => {
  return (
    <Box pt="30px" pb="32px">
      <Stack direction="row" gap="16px" mt="20px">
        <LandscapeCard
          title="2,500,000"
          subtitle={"Available Balance"}
          currency="NGN"
          icon={<CoinsIcon />}
          variant="error"
        />
        <LandscapeCard
          title="2,000,000"
          subtitle={"Total Transfers"}
          currency="NGN"
          icon={<SemdIcon />}
        />
        <LandscapeCard
          title="120"
          subtitle={"Successful transfers"}
          icon={<ReportIcon />}
        />
      </Stack>
    </Box>
  );
};

const tabs = [
  {
    id: 1,
    tab: "Naira",
    Form: TransferCurrency,
  },
  {
    id: 2,
    tab: "USD",
    Form: TransferCurrency,
  },
  {
    id: 3,
    tab: "GBP",
    Form: TransferCurrency,
  },
  {
    id: 4,
    tab: "EUR",
    Form: TransferCurrency,
  },
];

export default function Index() {
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <Dashboard title="Dashboard">
      {/* tabs */}
      <Tabs tabs={tabs} updateTab={setCurrentTab} />
      {/* table */}
      <Box>
        <TransferTable />
      </Box>
    </Dashboard>
  );
}
