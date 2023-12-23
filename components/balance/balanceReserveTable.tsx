import { useState, useCallback, useEffect, useRef } from "react";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { _businesses, _customers, _invoices } from "@/mocks";
import Header from "@/components/table/header";
import Table from "@/components/table/table";
import FilterTable from "@/components/table/filter";
import {
  BalanceReserveColumns,
  ProductsTableColumns,
} from "@/components/table/columns";
import Router from "next/router";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import AddBox from "remixicon-react/AddBoxFillIcon";
import { Box, Button, Stack } from "@mui/material";
import { ResultPageProps } from "@/interfaces";
import DropdownMenu from "../DropdownMenu";
import Export from "../Export";
import DownloadIcon from "@/public/icons/download.svg";

const BalanceReserveTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState<number | null>(10);
  const [result, setResult] = useState<ResultPageProps>({
    items: [],
    page: {
      total: 0,
      total_page: 0,
    },
  });

  const containerRef = useRef();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/rolling/reserves?${
      rowsPerPage ? `limit=${rowsPerPage}&page=${currentPage}` : ""
    }&${Object.entries(filters)
      ?.map((filterArr) => `${filterArr[0]}=${filterArr[1]}`)
      .join("&")}`,
    "get"
  );

  useEffect(() => {
    rowsPerPage && setResult(data?.data);
  }, [data]);

  useEffect(() => {
    handleSubmit();
  }, [currentPage, search, filters, rowsPerPage]);

  return (
    <Box>
      <Header
        entries={result?.page?.total}
        actions={
          <>
            <DropdownMenu
              title="Filter"
              updateFilter={setFilters}
              selector={"rollingReserve"}
            />
            <Export
              columns={BalanceReserveColumns}
              title={"Balance Reserve"}
              data={data?.data?.items}
              containerRef={containerRef}
              variant="containedSmall"
              btnContent={
                <>
                  <DownloadIcon fill="#fff" />
                  Download
                </>
              }
              onExport={setRowsPerPage}
              loading={loading}
            />
          </>
        }
      />
      <Table
        containerRef={containerRef}
        data={result?.items ?? []}
        dataLength={result?.page?.total}
        columns={BalanceReserveColumns}
        isFetching={loading && rowsPerPage}
        page={setCurrentPage}
        pageCount={result?.page?.total_page}
        onClickRow={(e) =>
          Router.push(`/balance/reserve/${e?.row?.original?.id}`)
        }
      />
    </Box>
  );
};

export default BalanceReserveTable;
