import { useState, useCallback, useEffect, useRef } from "react";
import Styles from "../../styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { _businesses, _customers, _invoices } from "@/mocks";
import Header from "@/components/table/header";
import Table from "@/components/table/table";
import FilterTable from "@/components/table/filter";
import { UserTableColumns } from "@/components/table/columns";
import Router from "next/router";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import { Box, Button } from "@mui/material";
import AddBox from "remixicon-react/AddBoxLineIcon";
import { setDrawalState } from "@/store/appSlice";
import { useDispatch } from "react-redux";

const AuditTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});

  const containerRef = useRef();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/audit/trails?page=${currentPage}&limit=10&${Object.entries(
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
        columns={UserTableColumns}
        data={data?.users}
        entries={data?.page?.total_items ?? 0}
        setSearch={setSearch}
        selector="audits"
        updateFilter={setFilters}
        url="/dashboard/audit/trails"
      />
      <Table
        containerRef={containerRef}
        data={data?.users ?? []}
        columns={UserTableColumns}
        isFetching={loading}
        page={setCurrentPage}
        pageCount={data?.page?.total_pages}
        onClickRow={(e) =>
          Router.push(`/business/customers/${e?.row?.original?.id}`)
        }
      />
    </Box>
  );
};

export default AuditTable;
