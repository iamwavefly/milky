import { useState, useCallback, useEffect } from "react";
import Styles from "../../styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { _businesses, _customers } from "@/mocks";
import Header from "@/components/table/header";
import Table from "@/components/table/table";
import FilterTable from "@/components/table/filter";
import {
  AccountCustomerTableColumns,
  CustomerTableColumns,
  TransactionTableColumns,
} from "@/components/table/columns";
import Router from "next/router";
import { Box, Typography } from "@mui/material";

const CustomerTable = () => {
  const [rows, setRows] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [doReload, setDoReload] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [error, setError] = useState(false);
  const [logs, setLogs] = useState([]);
  const [transactions, setTransactions] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTransactions(_customers);
    }, 3000);
  }, []);

  return (
    <Box bgcolor="#fff">
      <Typography py="24px" ml="24px">
        Customers - {transactions.length}
      </Typography>
      <FilterTable />
      <Table
        data={transactions}
        columns={AccountCustomerTableColumns}
        isFetching={loading}
        pageCount={20}
        onClickRow={(e) =>
          Router.push(`/transactions/customers/${e?.row?.original?.id}`)
        }
        page={() => undefined}
      />
    </Box>
  );
};

export default CustomerTable;
