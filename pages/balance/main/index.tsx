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
import BalanceTable from "@/components/balance/balanceHistoryTable";
import CountChart from "@/components/CountChart";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import OnlyHeader from "@/components/cards/onlyHeader";
import Detail from "@/components/detail";
import ArrowIcon from "remixicon-react/ArrowRightUpLineIcon";
import stringToCurrency from "@/helper/formatCurrency";

export default function Index() {
  const [metric, setMetric] = useState<any>({});
  const [balance, setBalance] = useState([]);

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

  return (
    <Dashboard title="Balance">
      <Stack px="30px" mt="20px">
        <Typography fontSize="16px" color="#2E3192">
          Balance
        </Typography>
      </Stack>
      {/* balance charts */}
      <Box mt="20px" px="30px">
        <Stack
          direction="row"
          bgcolor="#F3F3F9"
          padding="25px 39px 25px 32px"
          gap="45px"
          minHeight="105px"
        >
          <Box flex={1}>
            <CountChart
              title={"Dispute/Chargeback"}
              value={metric?.count ?? 100}
              change={metric?.count_change}
              withCurrency
            />
          </Box>
          <Divider sx={{ border: "1px solid #E4E8F2" }} />
          <Box flex={1}>
            <CountChart
              title={"Refunds"}
              themeColor="#EA5851"
              value={metric?.volume ?? 1000}
              change={metric?.volume_change}
              withCurrency
            />
          </Box>
          <Divider sx={{ border: "1px solid #E4E8F2" }} />
          <Box flex={1}>
            <CountChart
              title={"Non-Compliance Assessment"}
              value={metric?.settlements ?? 2300}
              change={metric?.settlement_change}
              withCurrency
            />
          </Box>
        </Stack>
        {balance?.map(
          ({
            wallet_id,
            currency_short_name,
            ledger_balance,
            available_balance,
            account_details: { bank_name, account_number },
          }) => {
            return (
              <OnlyHeader
                key={wallet_id}
                mt="32px"
                alignHeader="left"
                header={`${currency_short_name} Balance`}
                size="12px"
              >
                <Box my="auto">
                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    columnGap="106px"
                    rowGap="36px"
                  >
                    <Detail
                      title={"BANK NAME"}
                      variant={"copy"}
                      value={
                        bank_name || account_number
                          ? `${bank_name} - ${account_number}`
                          : "N/A"
                      }
                    />
                    <Detail
                      title={"LEDGER BALANCE"}
                      variant={"copy"}
                      value={
                        ledger_balance
                          ? `${currency_short_name} ${stringToCurrency(
                              ledger_balance
                            )}`
                          : "0"
                      }
                    />
                    <Detail
                      title={"AVAILABLE BALANCE"}
                      variant={"copy"}
                      value={
                        available_balance
                          ? `${currency_short_name} ${stringToCurrency(
                              available_balance
                            )}`
                          : "0"
                      }
                    />
                    {/* <Button
                      sx={{ height: "40px", fontSize: "12px" }}
                      variant="contained"
                    >
                      <ArrowIcon size={20} />
                      Top-Up Balance
                    </Button> */}
                  </Stack>
                </Box>
              </OnlyHeader>
            );
          }
        )}
      </Box>
    </Dashboard>
  );
}
