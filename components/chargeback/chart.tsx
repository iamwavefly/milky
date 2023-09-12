import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import OverviewCard from "../cards/OverviewCard";

import CoinsIcon from "@/public/icons/coins.svg";
import ReportIcon from "@/public/icons/report.svg";
import ChargebackIcon from "@/public/icons/chargeback.svg";
import Tabs from "../Tabs";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";

const OverviewCharts = ({ currentTab }: { currentTab: number }) => {
  const [overview, setOverview] = useState<any>({});
  const [balances, setBalances] = useState([]);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/chargeback/overview`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, [currentTab]);

  useEffect(() => {
    setOverview(data?.data?.overview);
  }, [currentTab, data]);

  useEffect(() => {
    setBalances(data?.data?.holding_balances);
  }, [currentTab, data]);

  return (
    <Box pt="30px" pb="32px">
      <Typography fontSize="14px" letterSpacing="0.14px" lineHeight="24px">
        This is the chargeback{" "}
        {currentTab === 1 ? "overview" : "holding balance"} information
      </Typography>
      <Stack direction="row" gap="16px" mt="28px">
        {currentTab === 1 ? (
          <>
            <OverviewCard
              title={`${overview?.threshold_percent}%`}
              subtitle={"Remaining of your Threshold"}
              icon={<ReportIcon />}
              variant="error"
            />
            <OverviewCard
              title={overview?.chargeback_value}
              subtitle={"Chargeback Value"}
              currency="NGN"
              icon={<CoinsIcon />}
            />
            <OverviewCard
              title={overview?.chargeback_count}
              subtitle={"Chargeback Count"}
              icon={<ChargebackIcon />}
            />
          </>
        ) : (
          <>
            {balances?.map(({ amount, currency }) => (
              <OverviewCard
                title={amount}
                currency={currency}
                subtitle={"Holding Balance"}
                icon={<CoinsIcon />}
              />
            ))}
          </>
        )}
      </Stack>
    </Box>
  );
};

const tabs = [
  {
    id: 1,
    tab: "Overview",
    Form: OverviewCharts,
  },
  {
    id: 2,
    tab: "Holding Balance",
    Form: OverviewCharts,
  },
];

export default function Chart() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Box>
      <Tabs tabs={tabs} updateTab={setCurrentTab} />
    </Box>
  );
}
