import React from "react";
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
import PendingTransferTable from "@/components/payouts/transfers/pendingTransferTable";

export default function Index() {
  const dispatch = useDispatch();

  return (
    <Dashboard title="Pending Approval">
      <PendingTransferTable />
    </Dashboard>
  );
}
