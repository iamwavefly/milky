/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect, useRef } from "react";
import Styles from "../../styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { _businesses, _customers, _invoices } from "@/mocks";
import Header from "@/components/table/header";
import Table from "@/components/table/table";
import FilterTable from "@/components/table/filter";
import { TransactionDetailsTableColumns } from "@/components/table/columns";
import Router, { useRouter } from "next/router";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import { Box, Button } from "@mui/material";
import AddBox from "remixicon-react/AddBoxFillIcon";

const TransactionrDetailsTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});

  const containerRef = useRef();

  const { asPath } = useRouter();
  const id = +asPath.split("/").slice(-1)[0];

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/fetch/orders?PaymentLinkId=${id}&page=${currentPage}&limit=10&${Object.entries(
      filters
    )
      ?.map((filterArr) => `${filterArr[0]}=${filterArr[1]}`)
      .join("&")}`,
    "get"
  );

  useEffect(() => {
    typeof id === "number" && isNaN(id) === false && handleSubmit();
  }, [currentPage, search, filters, asPath, id]);

  return (
    <Box>
      <Header
        containerRef={containerRef}
        columns={TransactionDetailsTableColumns}
        data={data?.items}
        entries={`${data?.total_items ?? 0} Entries`}
        setSearch={setSearch}
        title="Transactions"
        transparent
      />
      <Table
        containerRef={containerRef}
        data={data?.items ?? []}
        columns={TransactionDetailsTableColumns}
        isFetching={loading}
        page={setCurrentPage}
        pageCount={data?.total_pages}
      />
    </Box>
  );
};

export default TransactionrDetailsTable;
