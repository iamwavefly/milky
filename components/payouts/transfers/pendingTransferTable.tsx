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

const PendingTransferTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});

  const containerRef = useRef();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/payout/pending/approval?page=${currentPage}&limit=10&${Object.entries(
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
        columns={TransferPendingTableColumns}
        data={data?.data}
        entries={`${data?.data?.page?.size ?? 0}`}
        setSearch={setSearch}
        pageName="Pending Approvals"
        url="/payout/pending/approval"
        actions={
          <>
            <Export
              columns={TransferPendingTableColumns}
              data={data?.data}
              title="Pending Approvals"
              variant="outlinedSmall"
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
        updateFilter={setFilters}
      />
      <Table
        containerRef={containerRef}
        data={data?.data ?? []}
        columns={TransferPendingTableColumns}
        isFetching={loading}
        page={setCurrentPage}
        pageCount={data?.data?.page?.total_page}
      />
    </Box>
  );
};

export default PendingTransferTable;
