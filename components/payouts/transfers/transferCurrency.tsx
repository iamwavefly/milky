import LandscapeCard from "@/components/cards/LandscapeCard";
import { Box, Skeleton, Stack } from "@mui/material";

import CoinsIcon from "@/public/icons/coins.svg";
import ReportIcon from "@/public/icons/report.svg";
import SemdIcon from "@/public/icons/send.svg";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { useEffect, useState } from "react";
import { walletProps } from "@/interfaces";

const DefaultWallet: walletProps = {
  currency_name: "",
  currency_short_name: "",
  available_balance: 0,
  successful_transfer: 0,
  available_balance_change: 0,
  wallet_id: 0,
  total_transfer: 0,
};

const TransferCurrency = ({ currentTab }: { currentTab: number }) => {
  const [balance, setBalance] = useState<walletProps | null>(null);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/get/wallet/balance?walletId=${currentTab}`,
    "get"
  );

  useEffect(() => {
    currentTab && handleSubmit();
  }, [currentTab]);

  useEffect(() => {
    setBalance(data?.wallets?.[0]);
  }, [data]);

  return (
    <Box pt="30px" pb="32px">
      {!balance ? (
        <Stack gap="16px" direction="row" mt="20px">
          <Skeleton variant="rounded" height={160} width="100%" />
          <Skeleton variant="rounded" height={160} width="100%" />
          <Skeleton variant="rounded" height={160} width="100%" />
        </Stack>
      ) : (
        <Stack direction="row" gap="16px" mt="20px">
          <LandscapeCard
            title={balance?.available_balance}
            change={balance?.available_balance_change}
            subtitle={"Available Balance"}
            currency={balance?.currency_short_name}
            icon={<CoinsIcon />}
          />
          <LandscapeCard
            title={balance?.total_transfer}
            change={balance?.available_balance_change}
            subtitle={"Total Transfers"}
            currency={balance?.currency_short_name}
            icon={<SemdIcon />}
          />
          <LandscapeCard
            title={balance?.successful_transfer}
            change={balance?.available_balance_change}
            subtitle={"Successful transfers"}
            icon={<ReportIcon />}
          />
        </Stack>
      )}
    </Box>
  );
};

export default TransferCurrency;
