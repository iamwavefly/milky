import { useState, useCallback, useEffect } from "react";
import Styles from "../../styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { _businesses, _customers } from "@/mocks";
import Header from "@/components/table/header";
import Table from "@/components/table/table";
import FilterTable from "@/components/table/filter";
import {
  CustomerTableColumns,
  TransactionTableColumns,
} from "@/components/table/columns";
import Router from "next/router";

const CustomerDetailsTable = () => {
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
    <div className={Styles.container}>
      <Header entries={`${transactions?.length} Entries`} />
      <FilterTable />
      <Table
        data={transactions}
        columns={CustomerTableColumns}
        isFetching={loading}
        pageCount={20}
        onClickRow={(e) => Router.push(`/transactions/${e?.row?.original?.id}`)}
        page={() => undefined}
      />
    </div>
  );
};

export default CustomerDetailsTable;
