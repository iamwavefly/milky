import { useState, useCallback, useEffect, useRef } from "react";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { Box, Checkbox, Typography } from "@mui/material";
import { _accounts } from "@/mocks";
import Header from "../header";
import FilterTable from "../filter";
import Table from "../table";
import Router from "next/router";
import {
  AccountSettlementTableColumns,
  AccountsTableColumns,
} from "../columns";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";

const SettlementsTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});

  const containerRef = useRef();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/settlement/all`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, [currentPage, search, filters]);

  return (
    <Box>
      <Header
        containerRef={containerRef}
        columns={AccountSettlementTableColumns}
        data={data?.items}
        entries={`${data?.total_items ?? 0} Entries`}
        setSearch={setSearch}
        url="/dashboard/settlement/all"
      />
      <FilterTable updateFilter={setFilters} />
      <Table
        containerRef={containerRef}
        data={data?.items ?? []}
        columns={AccountSettlementTableColumns}
        isFetching={loading}
        page={setCurrentPage}
        dataLength={result.total_items}
        pageCount={data?.total_pages}
        onClickRow={(e) => Router.push(`/accounts/${e?.row?.original?.id}`)}
      />
    </Box>
  );
};

export default SettlementsTable;
