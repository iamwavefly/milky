import { useState, useCallback, useEffect, useRef } from "react";
import Styles from "../../styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { _businesses, _customers, _invoices } from "@/mocks";
import Header from "@/components/table/header";
import Table from "@/components/table/table";
import FilterTable from "@/components/table/filter";
import { AccountSettlementTableColumns } from "@/components/table/columns";
import Router from "next/router";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import AddBox from "remixicon-react/AddBoxFillIcon";
import { Box, Button } from "@mui/material";
import Export from "@/components/Export";
import DropdownMenu from "@/components/DropdownMenu";
import { ResultProps } from "@/interfaces";

const SettlementTable = () => {
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
    `${baseUrl}/dashboard/settlement/paginated?page=${currentPage}${
      rowsPerPage ? `&limit=${rowsPerPage}` : ""
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
        actions={
          <>
            <DropdownMenu
              title="Filter"
              updateFilter={setFilters}
              selector="settlements"
            />
            <Export
              columns={AccountSettlementTableColumns}
              data={data?.items}
              title="settlements"
              variant="outlinedSmall"
              containerRef={containerRef}
              onExport={setRowsPerPage}
              loading={loading}
            />
          </>
        }
        setSearch={setSearch}
      />
      <Table
        containerRef={containerRef}
        columns={AccountSettlementTableColumns}
        isFetching={loading && rowsPerPage}
        page={setCurrentPage}
        data={result?.items ?? []}
        pageCount={result?.total_pages}
      />
    </Box>
  );
};

export default SettlementTable;
