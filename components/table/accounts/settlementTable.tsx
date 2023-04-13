import { useState, useCallback, useEffect } from "react";
import Styles from "./styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import axios from "axios";
import moment from "moment";
import { Divider, Image } from "semantic-ui-react";
import Link from "next/link";
import { Box, Checkbox, Typography } from "@mui/material";
import { _accounts, _accountSettlements } from "@/mocks";
import Header from "../header";
import FilterTable from "../filter";
import Table from "../table";
import Router from "next/router";
import { AccountSettlementColumns, AccountsTableColumns } from "../columns";

const SettlementsTable = () => {
  const [transactions, setTransactions] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTransactions(_accountSettlements);
    }, 3000);
  }, []);

  return (
    <div className={Styles.container}>
      <Header entries={`${transactions?.length} Entries`} />
      <FilterTable />
      <Table
        data={transactions}
        columns={AccountSettlementColumns}
        isFetching={loading}
        pageCount={20}
        onClickRow={(e) => Router.push(`/accounts/settlements/cycle`)}
        page={() => undefined}
      />
    </div>
  );
};

export default SettlementsTable;
