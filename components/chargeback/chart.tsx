import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import OverviewCard from "../cards/OverviewCard";

import CoinsIcon from "@/public/icons/coins.svg";
import ReportIcon from "@/public/icons/report.svg";
import ChargebackIcon from "@/public/icons/chargeback.svg";
import Tabs from "../Tabs";

const OverviewCharts = ({ currentTab }: { currentTab: number }) => {
  return (
    <Box pt="30px" pb="32px">
      <Typography fontSize="14px" letterSpacing="0.14px" lineHeight="24px">
        This is the chargeback{" "}
        {currentTab === 1 ? "overview" : "holding balance"} information
      </Typography>
      <Stack direction="row" gap="16px" mt="28px">
        <OverviewCard
          title="75%"
          subtitle={"Remaining of your Threshold"}
          icon={<ReportIcon />}
          variant="error"
        />
        <OverviewCard
          title="2,000,000"
          subtitle={"Chargeback Value"}
          currency="NGN"
          icon={<CoinsIcon />}
        />
        <OverviewCard
          title="22"
          subtitle={"Chargeback Count"}
          icon={<ChargebackIcon />}
        />
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
