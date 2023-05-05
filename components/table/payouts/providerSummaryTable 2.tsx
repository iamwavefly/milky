import { useState, useCallback, useEffect } from "react";
import { Box, Button, Stack } from "@mui/material";
import { _businesses, _main, _payoutCredit } from "@/mocks";
import Header from "../header";
import CarretDown from "../../../public/assets/icons/carret-down.svg";
import FilterTable from "../filter";
import Table from "../table";
import Router from "next/router";
import {
  CreditSummaryColumns,
  PayoutCreditColumns,
  ProviderSummaryColumns,
} from "../columns";

const ProviderSummaryTable = () => {
  const [transactions, setTransactions] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTransactions(_main);
    }, 2000);
  }, []);

  return (
    <Box>
      <Header
        entries={`${transactions?.length} Entries`}
        buttons={
          <Stack direction="row" spacing="16px">
            <Button variant="contained">Download</Button>
          </Stack>
        }
      />
      <FilterTable />
      <Table
        data={transactions}
        columns={ProviderSummaryColumns}
        isFetching={loading}
        pageCount={20}
        onClickRow={(e) =>
          Router.push(`/payouts/provider-summary/${e?.row?.original?.name}`)
        }
        page={() => undefined}
      />
    </Box>
  );
};

export default ProviderSummaryTable;
