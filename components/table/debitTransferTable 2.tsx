import FilterTable from "@/components/table/filter";
import Header from "@/components/table/header";
import MultipleTableHeader from "@/components/table/MultipleTableHeader";
import { _main, _review } from "@/mocks";
import { Button, Checkbox, Stack } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Styles from "./duetable.module.scss";
import Table from "./table";
import {
  DebitTransferTableColumns,
  SettlementTableColumns,
} from "@/components/table/columns";
import Router from "next/router";

interface btnProps {
  id?: number;
  name: string;
}

const DebitTransferTable = () => {
  const [transactions, setTransactions] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTransactions(_main);
    }, 3000);
  }, []);

  return (
    <div>
      <Header
        entries={transactions.length}
        buttons={
          <div className={Styles.header_btn}>
            <Stack direction={"row"} spacing={2} alignItems="center">
              <Button variant={"outlined"}>Wallets actions</Button>
              <Button variant={"contained"}>Download</Button>
            </Stack>
          </div>
        }
      />
      <FilterTable />
      <Table
        data={transactions}
        columns={DebitTransferTableColumns}
        isFetching={loading}
        pageCount={20}
        onClickRow={(e) =>
          Router.push(`/settlements/failed/${e?.row?.original?.name}`)
        }
        page={() => undefined}
      />
    </div>
  );
};

export default DebitTransferTable;
