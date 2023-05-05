import { useState, useCallback, useEffect } from "react";
import { Box, Button, Stack } from "@mui/material";
import { _businesses, _payoutCredit } from "@/mocks";
import Header from "../header";
import CarretDown from "../../../public/assets/icons/carret-down.svg";
import FilterTable from "../filter";
import Table from "../table";
import Router from "next/router";
import { PayoutCreditColumns } from "../columns";

const PayoutCreditTable = () => {
  const [transactions, setTransactions] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTransactions(_payoutCredit);
    }, 3000);
  }, []);

  return (
    <Box>
      <Header
        entries={`${transactions?.length} Entries`}
        buttons={
          <Stack direction="row" spacing="16px">
            <Button variant="outlined">
              Wallets actions <CarretDown />
            </Button>
            <Button variant="contained">Download</Button>
          </Stack>
        }
      />
      <FilterTable />
      <Table
        data={transactions}
        columns={PayoutCreditColumns}
        isFetching={loading}
        pageCount={20}
        onClickRow={(e) => Router.push(`/merchants/${e?.row?.original?.id}`)}
        page={() => undefined}
      />
    </Box>
  );
};

export default PayoutCreditTable;
