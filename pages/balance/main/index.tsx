import React, { useEffect, useState } from "react";
import Dashboard from "@/layouts/dashboard";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import useFetch from "@/hooks/useFetch";
import LandscapeCard from "@/components/cards/LandscapeCard";
import baseUrl from "@/middleware/baseUrl";
import AddIcon from "@/public/icons/add-white.svg";
import CoinsIcon from "@/public/icons/coins.svg";
import CardIcon from "@/public/icons/card.svg";
import BankIcon from "@/public/icons/bank.svg";
import InfoIcon from "@/public/icons/info.svg";
import ChargebackIcon from "@/public/icons/chargeback.svg";
import ReloadIcon from "@/public/icons/reload.svg";
import BlockIcon from "@/public/icons/block.svg";
import TransferDetails from "@/components/payouts/transfers/transferDetails";
import { useDispatch } from "react-redux";
import { setDrawalState } from "@/store/appSlice";
import Modal from "@/components/modal/modal";

export default function Index() {
  const [metric, setMetric] = useState<any>({});
  const [balance, setBalance] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const dispatch = useDispatch();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/get/wallet/balance`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    setBalance(data?.wallets);
  }, [data]);

  // const openDrawal = () => {
  //   dispatch(
  //     setDrawalState({
  //       active: true,
  //       title: "Fund Balance",
  //       content: <TransferDetails />,
  //     })
  //   );
  // };

  return (
    <Dashboard title="Balance">
      <Modal
        title="Fund Balance"
        isOpen={openModal}
        close={handleCloseModal}
        onClose={handleCloseModal}
      >
        <TransferDetails reload={handleSubmit} close={handleCloseModal} />
      </Modal>
      {/* header */}
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Typography fontSize="18px" fontWeight={600} lineHeight="26px">
          Balance
        </Typography>
        <Button
          variant="containedMedium"
          sx={{ height: "40px" }}
          onClick={handleOpenModal}
        >
          <AddIcon fill="#fff" width="18px" height="18px" />
          Top up balance
        </Button>
      </Stack>
      {/* cards */}
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
          subtitle={"Ledger Balance"}
          currency="NGN"
          icon={<CardIcon />}
        />
        <LandscapeCard
          title="0091487523"
          subtitle={"Bank details (Guaranty Trust Bank)"}
          icon={<BankIcon />}
          noFilter
        />
      </Stack>
      <Stack direction="row" gap="16px" mt="32px">
        <LandscapeCard
          title="0091487523"
          subtitle={"Dispute / Chargeback"}
          currency="NGN"
          icon={<ChargebackIcon />}
          linkText="View chargeback"
          linkTo="/"
        />
        <LandscapeCard
          title="0091487523"
          subtitle={"Refunds"}
          currency="NGN"
          icon={<ReloadIcon width="24px" height="24px" fill="#3C4453" />}
          variant="error"
          linkTo="/"
          linkText="View all refunds"
        />
        <LandscapeCard
          title="400,000"
          subtitle={"Non-compliance assessment"}
          currency="NGN"
          icon={<BlockIcon />}
          footer={
            <Stack
              direction="row"
              padding="12px 24px"
              height="56px"
              bgcolor="#F5FBFF"
              alignItems="flex-start"
              spacing="8px"
            >
              <Box>
                <InfoIcon />
              </Box>
              <Typography
                position="relative"
                top={-2}
                color="#162031"
                fontSize="12px"
                lineHeight="18px"
              >
                This is how much you’ve charged for defaulting on compliance
                rule
              </Typography>
            </Stack>
          }
        />
      </Stack>
    </Dashboard>
  );
}
