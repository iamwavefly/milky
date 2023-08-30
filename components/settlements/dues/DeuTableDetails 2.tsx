import FilterTable from "@/components/table/filter";
import Header from "@/components/table/header";
import MultipleTableHeader from "@/components/table/MultipleTableHeader";
import { _main, _settlement } from "@/mocks";
import { Box, Button, Checkbox, Stack } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Styles from "./duetable.module.scss";
import Table from "../../table/table";
import {
  SettlementDetailsTableColumns,
  SettlementTableColumns,
} from "@/components/table/columns";
import Router from "next/router";

interface btnProps {
  id?: number;
  name: string;
}

const DeuDetailsTable = () => {
  const headerBtn: btnProps[] = [
    {
      id: 1,
      name: "All Settlement",
    },
    {
      id: 2,
      name: "Download All",
    },
    {
      id: 3,
      name: "Logs settlement",
    },
  ];

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
    <Box bgcolor="#fff">
      <Header entries={transactions.length} />
      <Table
        data={transactions}
        columns={SettlementDetailsTableColumns}
        isFetching={loading}
        pageCount={20}
        page={() => undefined}
      />
    </Box>
  );
};

export default DeuDetailsTable;
