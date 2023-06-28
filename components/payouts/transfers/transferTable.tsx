import { useState, useCallback, useEffect, useRef } from "react";
import Styles from "../../styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { _businesses, _customers, _invoices } from "@/mocks";
import Header from "@/components/table/header";
import Table from "@/components/table/table";
import FilterTable from "@/components/table/filter";
import { TransferTableColumns } from "@/components/table/columns";
import Router from "next/router";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import AddBox from "remixicon-react/AddBoxFillIcon";
import { Button } from "@mui/material";

const TransferTable = ({ reload }: { reload: boolean }) => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});

  const containerRef = useRef();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/payout/all?page=${currentPage}&limit=10&${Object.entries(
      filters
    )
      ?.map((filterArr) => `${filterArr[0]}=${filterArr[1]}`)
      .join("&")}`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, [currentPage, search, filters, reload]);

  return (
    <div className={Styles.container}>
      <Header
        containerRef={containerRef}
        columns={TransferTableColumns}
        data={data?.data?.items}
        entries={`${data?.data?.page?.size ?? 0}`}
        setSearch={setSearch}
        selector="transfers"
        updateFilter={setFilters}
      />
      <Table
        containerRef={containerRef}
        data={data?.data?.items ?? []}
        columns={TransferTableColumns}
        isFetching={loading}
        page={setCurrentPage}
        pageCount={data?.data?.page?.total_page}
      />
    </div>
  );
};

export default TransferTable;
