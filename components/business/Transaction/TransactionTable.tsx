import { TransactionTableColumns } from "@/components/table/columns";
import FilterTable from "@/components/table/filter";
import Header from "@/components/table/header";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { _transactions } from "@/mocks";
import { Checkbox } from "@material-ui/core";
import Router from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Styles from "../../table/business/styles.module.scss";
import Table from "../../table/table";

const TransactionTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});

  const containerRef = useRef();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/order/all/paginated?page=${currentPage}&limit=10&${Object.entries(
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
    <div className={Styles.container}>
      <Header
        containerRef={containerRef}
        columns={TransactionTableColumns}
        data={data?.items}
        entries={`${data?.total_items ?? 0} Entries`}
        setSearch={setSearch}
      />
      <FilterTable updateFilter={setFilters} />
      <Table
        containerRef={containerRef}
        data={data?.items ?? []}
        columns={TransactionTableColumns}
        page={setCurrentPage}
        pageCount={data?.total_pages}
        isFetching={loading}
        onClickRow={(e) => Router.push(`/transactions/${e?.row?.original?.id}`)}
      />
    </div>
  );
};

export default TransactionTable;
