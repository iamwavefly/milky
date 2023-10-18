import { useState, useCallback, useEffect, useRef } from "react";
import Styles from "../../styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { _businesses, _customers, _invoices } from "@/mocks";
import Header from "@/components/table/header";
import Table from "@/components/table/table";
import FilterTable from "@/components/table/filter";
import { AuditTrailTableColumns } from "@/components/table/columns";
import Router from "next/router";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import { Box, Button } from "@mui/material";
import AddBox from "remixicon-react/AddBoxLineIcon";
import { setDrawalState } from "@/store/appSlice";
import { useDispatch } from "react-redux";
import Export from "@/components/Export";
import { ResultProps } from "@/interfaces";

const AuditTable = () => {
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

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/audit/trails?${
      rowsPerPage ? `limit=${rowsPerPage}&page=${currentPage}` : ""
    }&${Object.entries(filters)
      ?.map((filterArr) => `${filterArr[0]}=${filterArr[1]}`)
      .join("&")}`,
    "get"
  );

  useEffect(() => {
    rowsPerPage && setResult(data);
  }, [data]);

  useEffect(() => {
    handleSubmit();
  }, [currentPage, search, filters, rowsPerPage]);

  return (
    <Box>
      <Header
        entries={result?.total_items}
        setSearch={setSearch}
        actions={
          <>
            <Export
              columns={AuditTrailTableColumns}
              data={data?.items}
              title="Audit Trails"
              variant="containedSmall"
              containerRef={containerRef}
              onExport={setRowsPerPage}
              loading={loading}
            />
          </>
        }
      />
      <Table
        containerRef={containerRef}
        columns={AuditTrailTableColumns}
        page={setCurrentPage}
        data={result?.items ?? []}
        pageCount={result?.total_pages}
        dataLength={result.total_items}
        isFetching={loading && rowsPerPage}
        onClickRow={(e) =>
          Router.push(`/business/customers/${e?.row?.original?.id}`)
        }
      />
    </Box>
  );
};

export default AuditTable;
