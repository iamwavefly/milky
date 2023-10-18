/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect, useRef } from "react";
import Styles from "../../styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { _businesses, _customers, _invoices } from "@/mocks";
import Header from "@/components/table/header";
import Table from "@/components/table/table";
import FilterTable from "@/components/table/filter";
import {
  CustomerDetailsTableColumns,
  CustomersTableColumns,
} from "@/components/table/columns";
import Router, { useRouter } from "next/router";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import { Button, Typography } from "@mui/material";
import AddBox from "remixicon-react/AddBoxFillIcon";
import Export from "@/components/Export";
import DropdownMenu from "@/components/DropdownMenu";
import { ResultProps } from "@/interfaces";

const CustomerDetailsTable = () => {
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

  const { asPath } = useRouter();
  const id = +asPath.split("/").slice(-1)[0];

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/fetch/customers/orders?CustomerId=${id}&${
      rowsPerPage ? `limit=${rowsPerPage}&page=${currentPage}` : ""
    }&${Object.entries(filters)
      ?.map((filterArr) => `${filterArr[0]}=${filterArr[1]}`)
      .join("&")}`,
    "get"
  );

  useEffect(() => {
    typeof id === "number" && isNaN(id) === false && handleSubmit();
  }, [currentPage, search, filters, asPath, id, rowsPerPage]);

  useEffect(() => {
    rowsPerPage && setResult(data);
  }, [data]);

  return (
    <div className={Styles.container}>
      <Header
        entries={result?.total_items}
        setSearch={setSearch}
        title={
          <Typography fontSize="15px" fontWeight={600}>
            Transactions
          </Typography>
        }
        actions={
          <>
            <DropdownMenu
              title="Filter"
              updateFilter={setFilters}
              selector="orders"
            />
            <Export
              columns={CustomerDetailsTableColumns}
              data={data?.items}
              title="order"
              variant="outlinedSmall"
              containerRef={containerRef}
              onExport={setRowsPerPage}
              loading={loading}
            />
          </>
        }
        transparent
      />
      <Table
        containerRef={containerRef}
        columns={CustomerDetailsTableColumns}
        page={setCurrentPage}
        data={result?.items ?? []}
        pageCount={result?.total_pages}
        isFetching={loading && rowsPerPage}
      />
    </div>
  );
};

export default CustomerDetailsTable;
