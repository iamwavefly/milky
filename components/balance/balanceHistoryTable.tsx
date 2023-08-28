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

const BalanceHistoryTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});

  const containerRef = useRef();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/fetch/wallet/history?page=${currentPage}&limit=10&${Object.entries(
      filters
    )
      ?.map((filterArr) => `${filterArr[0]}=${filterArr[1]}`)
      .join("&")}`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, [currentPage, search, filters]);

  return (
    <Box>
      <Header
        containerRef={containerRef}
        columns={BalanceHistoryColumns}
        data={data?.items}
        entries={data?.total_items ?? 0}
        pageName="Balance History"
        setSearch={setSearch}
        selector="balanceHistory"
        updateFilter={setFilters}
        url="/dashboard/fetch/wallet/history"
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
            />
          </>
        }
      />
      <Table
        containerRef={containerRef}
        data={data?.items ?? []}
        columns={BalanceHistoryColumns}
        isFetching={loading}
        page={setCurrentPage}
        pageCount={data?.total_pages}
        onClickRow={(e) =>
          Router.push(`/transactions/customers/${e?.row?.original?.id}`)
        }
      />
    </Box>
  );
};

export default BalanceHistoryTable;
