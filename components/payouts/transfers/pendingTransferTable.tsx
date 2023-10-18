import { useState, useCallback, useEffect, useRef } from "react";
import Styles from "../../styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { _businesses, _customers, _invoices } from "@/mocks";
import Header from "@/components/table/header";
import Table from "@/components/table/table";
import FilterTable from "@/components/table/filter";
import { TransferPendingTableColumns } from "@/components/table/columns";
import Router from "next/router";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import AddBox from "remixicon-react/AddBoxFillIcon";
import { Box, Button } from "@mui/material";
import FundIcon from "remixicon-react/FundsBoxLineIcon";
import Export from "@/components/Export";
import { ResultProps } from "@/interfaces";

const PendingTransferTable = () => {
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
    `${baseUrl}/payout/pending/approval?${
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
        setSearch={setSearch}
        pageName="Pending Approvals"
        actions={
          <>
            <Export
              columns={TransferPendingTableColumns}
              data={data?.data}
              title="Pending Approvals"
              variant="outlinedSmall"
              onExport={setRowsPerPage}
              loading={loading}
            />
            <Button
              sx={{ fontSize: "14px", height: "40px" }}
              variant="contained"
              disabled={data?.data?.length === 0}
            >
              Approve all
            </Button>
          </>
        }
      />
      <Table
        containerRef={containerRef}
        data={result?.items ?? []}
        pageCount={result?.total_pages}
        isFetching={loading && rowsPerPage}
        columns={TransferPendingTableColumns}
        page={setCurrentPage}
      />
    </Box>
  );
};

export default PendingTransferTable;
