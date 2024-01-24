import React, { useEffect, useState } from "react";
import Dashboard from "@/layouts/dashboard";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Skeleton,
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
import FundBalance from "@/components/payouts/transfers/fundBalance";
import Tabs from "@/components/Tabs";
import { WalletProps, walletProps } from "@/interfaces";
import DropIcon from "@/public/icons/drop.svg";
import ReportIcon from "@/public/icons/report.svg";

const skeletons = Array.from({ length: 3 }, (x, i) => i);

export default function Index() {
  const [tabs, setTabs] = useState([]);
  const [balance, setBalance] = useState<WalletProps | undefined>(undefined);
  const [openModal, setOpenModal] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/get/wallet/balance?walletId=${currentTab}`,
    "get"
  );

  useEffect(() => {
    const newWalletTabs = data?.wallets?.map(
      ({ currency_short_name, wallet_id }: walletProps) => {
        return {
          tab: currency_short_name,
          id: wallet_id,
          // Form: TransferCurrency,
        };
      }
    );
    setTabs(newWalletTabs);
  }, [data]);

  useEffect(() => {
    handleSubmit();
  }, [currentTab]);

  useEffect(() => {
    const findWalletById = data?.wallets?.find(
      ({ wallet_id }: WalletProps) => wallet_id === currentTab
    );
    console.log(findWalletById);
    setBalance(findWalletById);
  }, [data]);

  return (
    <Dashboard title="Balance">
      <Modal
        title="Fund Balance"
        isOpen={openModal}
        close={handleCloseModal}
        onClose={handleCloseModal}
      >
        <FundBalance reload={handleSubmit} close={handleCloseModal} />
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
      {/* tabs */}
      <Box mt="16px">
        <Tabs tabs={tabs} updateTab={setCurrentTab} />
      </Box>
      {/* cards */}
      <Grid container spacing="16px" mt="20px">
        {balance ? (
          <>
            <Grid item xs={4}>
              <LandscapeCard
                title={balance?.available_balance}
                change={balance?.available_balance_change}
                subtitle={"Available Balance"}
                currency={balance?.currency_short_name}
                icon={<CoinsIcon />}
              />
            </Grid>
            <Grid item xs={4}>
              <LandscapeCard
                title={balance?.ledger_balance}
                change={balance?.ledger_balance_change}
                subtitle={"Ledger Balance"}
                currency={balance?.currency_short_name}
                icon={<CardIcon />}
              />
            </Grid>
            <Grid item xs={4}>
              <LandscapeCard
                noFilter
                title={
                  balance.account_details.account_number
                    ? balance.account_details.account_number
                    : "N/A"
                }
                subtitle={`Bank details (${
                  balance.account_details.bank_name
                    ? balance.account_details.bank_name
                    : "N/A"
                })`}
                icon={<BankIcon />}
              />
            </Grid>
            <Grid item xs={4}>
              <LandscapeCard
                title={balance?.ledger_balance}
                change={balance?.ledger_balance_change}
                subtitle={"Dispute / Chargeback"}
                currency={balance?.currency_short_name}
                icon={<ChargebackIcon />}
              />
            </Grid>
          </>
        ) : (
          // ? balance?.map(
          //     ({
          //       wallet_id,
          //       available_balance,
          //       available_balance_change,
          //       currency_short_name,
          //       account_details: { bank_name, account_number },
          //     }) => (
          //       <Grid item md={4} key={wallet_id}>
          //         <LandscapeCard
          //           title={available_balance}
          //           subtitle={
          //             account_number ? `${account_number} (${bank_name})` : ""
          //           }
          //           currency={currency_short_name}
          //           icon={<BankIcon />}
          //           change={available_balance_change}
          //         />
          //       </Grid>
          //     )
          //   )
          skeletons.map((skeleton) => (
            <Grid item md={4} key={skeleton}>
              <Box height={160}>
                <Skeleton variant="rounded" height={160} />
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Dashboard>
  );
}
