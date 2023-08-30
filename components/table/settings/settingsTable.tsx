import { useState, useCallback, useEffect } from "react";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import { _businesses, _main } from "@/mocks";
import Header from "../header";
import FilterTable from "../filter";
import Table from "../table";
import Router from "next/router";
import { FeesTableColumns, SettingsTableColumns } from "../columns";

const SettingsTable = () => {
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
      <Header entries={`${transactions?.length}`} />
      <Table
        data={transactions}
        columns={SettingsTableColumns}
        isFetching={loading}
        pageCount={20}
        onClickRow={(e) => Router.push(`/merchants/${e?.row?.original?.id}`)}
        page={() => undefined}
      />
    </div>
  );
};

export default SettingsTable;
