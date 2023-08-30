import { useState, useCallback, useEffect, useRef } from "react";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import { _businesses, _main } from "@/mocks";
import Header from "../header";
import FilterTable from "../filter";
import Table from "../table";
import Router from "next/router";
import {
  LimitCollectionTableColumns,
  LimitTransferTableColumns,
} from "../columns";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";

const TransferLimitTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});

  const containerRef = useRef();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/limits/payout?page=${currentPage}&limit=10&${Object.entries(
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
    <div>
      <Header
        containerRef={containerRef}
        columns={LimitTransferTableColumns}
        data={data?.data?.items}
        url="/dashboard/limits/payout"
        entries={`${data?.data?.page.total ?? 0}`}
        setSearch={setSearch}
        buttons={<Button variant="contained">Add a new transfer limit</Button>}
      />
      <Table
        containerRef={containerRef}
        data={data?.data?.items ?? []}
        columns={LimitTransferTableColumns}
        page={setCurrentPage}
        pageCount={data?.data?.page.total_pages}
        isFetching={loading}
        onClickRow={(e) => Router.push(`/merchants/${e?.row?.original?.id}`)}
      />
    </div>
  );
};

export default TransferLimitTable;
