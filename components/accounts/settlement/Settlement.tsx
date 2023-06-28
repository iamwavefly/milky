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
import { Button } from "@mui/material";

const SettlementTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});

  const containerRef = useRef();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/settlement/paginated?page=${currentPage}&limit=10&${Object.entries(
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
        columns={AccountSettlementTableColumns}
        data={data?.items}
        entries={`${data?.total_items ?? 0} Entries`}
        setSearch={setSearch}
        selector="settlements"
        updateFilter={setFilters}
      />
      <Table
        containerRef={containerRef}
        data={data?.items ?? []}
        columns={AccountSettlementTableColumns}
        isFetching={loading}
        page={setCurrentPage}
        pageCount={data?.total_pages}
        // onClickRow={(e) =>
        //   Router.push(`/transactions/customers/${e?.row?.original?.id}`)
        // }
      />
    </div>
  );
};

export default SettlementTable;
