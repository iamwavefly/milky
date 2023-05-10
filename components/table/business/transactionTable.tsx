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

const TransactionTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});

  const containerRef = useRef();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/fetch/orders?page=${currentPage}&limit=10&${Object.entries(
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
    <Box className={Styles.container}>
      <Header
        containerRef={containerRef}
        columns={BusinessTransactionTableColumns}
        data={data?.items}
        entries={`${data?.total_items ?? 0}`}
        setSearch={setSearch}
      />
      <Table
        containerRef={containerRef}
        data={data?.items ?? []}
        columns={BusinessTransactionTableColumns}
        page={setCurrentPage}
        pageCount={data?.total_pages}
        isFetching={loading}
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
