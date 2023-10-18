import { useState, useCallback, useEffect, useRef } from "react";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { _businesses, _customers, _invoices } from "@/mocks";
import Header from "@/components/table/header";
import Table from "@/components/table/table";
import FilterTable from "@/components/table/filter";
import { BalanceHistoryColumns } from "@/components/table/columns";
import Router from "next/router";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import AddBox from "remixicon-react/AddBoxFillIcon";
import { Box, Button } from "@mui/material";
import DropdownMenu from "../DropdownMenu";
import Export from "../Export";
import { ResultProps } from "@/interfaces";

const BalanceHistoryTable = () => {
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
    `${baseUrl}/dashboard/fetch/wallet/history?${
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
        entries={result?.total_items}
        pageName="Balance History"
        setSearch={setSearch}
        actions={
          <>
            <DropdownMenu
              title="Filter"
              updateFilter={setFilters}
              selector={"balanceHistory"}
            />
            <Export
              title={"Balance history"}
              data={data?.items}
              columns={BalanceHistoryColumns}
              containerRef={containerRef}
              variant="containedSmall"
              onExport={setRowsPerPage}
              loading={loading}
            />
          </>
        }
      />
      <Table
        containerRef={containerRef}
        columns={BalanceHistoryColumns}
        page={setCurrentPage}
        data={result?.items ?? []}
        pageCount={result?.total_pages}
        dataLength={result.total_items}
        isFetching={loading && rowsPerPage}
      />
    </Box>
  );
};

export default BalanceHistoryTable;
