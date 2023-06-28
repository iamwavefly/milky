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
import { Box, Button } from "@mui/material";

const BalanceReserveTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});

  const containerRef = useRef();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/rolling/reserves?id=5&page=${currentPage}&limit=10&${Object.entries(
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
        columns={BalanceReserveColumns}
        data={data?.data?.items}
        entries={`${data?.data?.size ?? 0} Entries`}
        setSearch={setSearch}
        selector="rollingReserve"
        updateFilter={setFilters}
      />
      <Table
        containerRef={containerRef}
        data={data?.data?.items ?? []}
        columns={BalanceReserveColumns}
        isFetching={loading}
        page={setCurrentPage}
        pageCount={data?.data?.page?.total_page}
        onClickRow={(e) =>
          Router.push(`/balance/reserve/${e?.row?.original?.id}`)
        }
      />
    </Box>
  );
};

export default BalanceReserveTable;
