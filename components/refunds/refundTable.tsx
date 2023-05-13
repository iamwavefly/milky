import { useState, useCallback, useEffect, useRef } from "react";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { _businesses, _customers, _invoices } from "@/mocks";
import Header from "@/components/table/header";
import Table from "@/components/table/table";
import FilterTable from "@/components/table/filter";
import {
  CustomersTableColumns,
  RefundTableColumns,
} from "@/components/table/columns";
import Router from "next/router";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import { Box, Button } from "@mui/material";
import AddBox from "remixicon-react/LogoutCircleRLineIcon";
import { setDrawalState } from "@/store/appSlice";
import { useDispatch } from "react-redux";
import NewRefund from "./newRefund";

const RefundTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});

  const dispatch = useDispatch();
  // close drawal
  const openDrawal = () => {
    dispatch(
      setDrawalState({
        active: true,
        title: "Log a single refund",
        content: <NewRefund />,
      })
    );
  };

  const containerRef = useRef();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/refund/all?page=${currentPage}&limit=10&${Object.entries(
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
        columns={RefundTableColumns}
        data={data?.items}
        entries={`${data?.total_items ?? 0} Entries`}
        setSearch={setSearch}
        buttons={
          <Button
            variant="contained"
            sx={{ height: "40px", fontSize: "12px" }}
            onClick={openDrawal}
          >
            <AddBox size={16} />
            Log a refund
          </Button>
        }
      />
      <Table
        containerRef={containerRef}
        data={data?.items ?? []}
        columns={RefundTableColumns}
        isFetching={loading}
        page={setCurrentPage}
        pageCount={data?.total_pages}
      />
    </Box>
  );
};

export default RefundTable;
