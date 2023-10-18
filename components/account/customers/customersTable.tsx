import { useState, useCallback, useEffect, useRef } from "react";
import Styles from "../../styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { _businesses, _customers, _invoices } from "@/mocks";
import Header from "@/components/table/header";
import Table from "@/components/table/table";
import FilterTable from "@/components/table/filter";
import { CustomersTableColumns } from "@/components/table/columns";
import Router from "next/router";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import { ResultProps } from "@/interfaces";
import { Box } from "@mui/material";

const CustomersTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState<number | null>(10);
  const [result, setResult] = useState<ResultProps>({
    items: [],
    total_items: 0,
    total_pages: 0,
  });

  const containerRef = useRef();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/fetch/customers?${
      rowsPerPage ? `limit=${rowsPerPage}&page=${currentPage}` : ""
    }&${Object.entries(filters)
      ?.map((filterArr) => `${filterArr[0]}=${filterArr[1]}`)
      .join("&")}`,
    "get"
  );

  useEffect(() => {
    rowsPerPage && setResult(data);
  }, [data]);

  useEffect(() => {
    handleSubmit();
  }, [currentPage, search, filters, rowsPerPage]);

  return (
    <Box className={Styles.container}>
      <Header setSearch={setSearch} entries={result?.total_items} />
      <FilterTable updateFilter={setFilters} />
      <Table
        containerRef={containerRef}
        columns={CustomersTableColumns}
        dataLength={result.total_items}
        page={setCurrentPage}
        data={result?.items ?? []}
        pageCount={result?.total_pages}
        isFetching={loading && rowsPerPage}
        onClickRow={(e) =>
          Router.push(`/transactions/customers/${e?.row?.original?.id}`)
        }
      />
    </Box>
  );
};

export default CustomersTable;
