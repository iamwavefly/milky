import { useState, useEffect, useRef } from "react";
import Styles from "./styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Box, Checkbox, Typography } from "@mui/material";
import { _businesses } from "@/mocks";
import Header from "../header";
import FilterTable from "../filter";
import Table from "../table";
import Router from "next/router";
import { BusinessTransactionTableColumns } from "../columns";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import Export from "@/components/Export";
import DropdownMenu from "@/components/DropdownMenu";
import { ResultProps } from "@/interfaces";

const TransactionTable = () => {
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
    `${baseUrl}/dashboard/fetch/orders?${
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
    <Box>
      <Header
        setSearch={setSearch}
        entries={result?.total_items}
        actions={
          <>
            <DropdownMenu
              title="Filter"
              updateFilter={setFilters}
              selector={"orders"}
            />
            <Export
              columns={BusinessTransactionTableColumns}
              title={"transactions"}
              data={data?.items}
              containerRef={containerRef}
              variant="containedSmall"
              onExport={setRowsPerPage}
              loading={loading}
              noPNG
            />
          </>
        }
      />
      <Table
        containerRef={containerRef}
        data={result?.items ?? []}
        dataLength={result.total_items}
        pageCount={result?.total_pages}
        isFetching={loading && rowsPerPage}
        columns={BusinessTransactionTableColumns}
        page={setCurrentPage}
        onClickRow={(e) =>
          Router.push(
            `/business/transactions/${e?.row?.original?.order_reference}`
          )
        }
      />
    </Box>
  );
};

export default TransactionTable;
