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

export default function Index() {
  const [reload, setReload] = useState(false);
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
  const openTransferDrawal = () => {
    dispatch(
      setDrawalState({
        active: true,
        title: "Make Transfer",
        content: <MakeTransfer reload={() => setReload((prev) => !prev)} />,
      })
    );
  };

  return (
    <Dashboard title="Dashboard">
      <Stack
        px="30px"
        mt="20px"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography fontSize="16px" color="#2E3192">
          Transfers
        </Typography>
        <Stack direction="row" alignItems="center" spacing="10px">
          <Button
            sx={{ fontSize: "12px", height: "40px" }}
            variant="outlined"
            onClick={openTransferDrawal}
          >
            <Box sx={{ transform: "rotate(-45deg)" }}>
              <SendIcon size={18} />
            </Box>
            Make Transfer
          </Button>
          <Button
            sx={{ fontSize: "12px", height: "40px" }}
            variant="contained"
            onClick={openDrawal}
          >
            <FundIcon size={18} />
            Fund Balance
          </Button>
        </Stack>
      </Stack>
      <Box mt="20px" px="30px">
        <TransferTable reload={reload} />
      </Box>
    </Dashboard>
  );
}
