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
import BeneficiaryTable from "@/components/payouts/transfers/beneficiaryTable";

export default function Index() {
  const dispatch = useDispatch();
  // open drawal
  const openDrawal = () => {
    dispatch(
      setDrawalState({
        active: true,
        title: "Fund Balance",
        content: <TransferDetails />,
      })
    );
  };

  return (
    <Dashboard title="Beneficiaries">
      <Stack
        px="30px"
        mt="20px"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography fontSize="16px" color="#2E3192">
          Beneficiaries
        </Typography>
      </Stack>
      <Box mt="20px" px="30px">
        <BeneficiaryTable />
      </Box>
    </Dashboard>
  );
}
