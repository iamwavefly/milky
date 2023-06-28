import { useState, useCallback, useEffect, useRef, MouseEvent } from "react";
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
import { Box, Button, Menu, MenuItem } from "@mui/material";
import AddBox from "remixicon-react/LogoutCircleRLineIcon";
import { setDrawalState } from "@/store/appSlice";
import { useDispatch } from "react-redux";
import NewRefund from "./newRefund";
import BulkRefund from "./bulkRefund";
import BulkRefundTable from "./bulkRefundTable";

const RefundTable = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});
  const [csvFile, setCsvFile] = useState<null | {}>(null);

  const close = () => dispatch(setDrawalState({ active: false }));
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const updateCsvFile = (file: {}) => {
    setCsvFile(file);
  };

  const dispatch = useDispatch();
  // open single refund
  const openSingleRefund = () => {
    handleClose();
    dispatch(
      setDrawalState({
        active: true,
        title: "Log a single refund",
        content: <NewRefund />,
      })
    );
  };
  // open bulk refund
  const openBulkRefund = () => {
    handleClose();
    dispatch(
      setDrawalState({
        active: true,
        title: "Log bulk refund",
        content: <BulkRefund updateCsvFile={updateCsvFile} />,
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

  const resetTable = () => setCsvFile(null);

  if (csvFile) {
    close();
    return (
      <BulkRefundTable
        csvFile={csvFile}
        openRefund={openBulkRefund}
        reload={handleSubmit}
        reset={resetTable}
      />
    );
  }

  return (
    <Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={openSingleRefund} sx={{ fontSize: "12px" }}>
          Log a single refund
        </MenuItem>
        <MenuItem onClick={openBulkRefund} sx={{ fontSize: "12px" }}>
          Log bulk refunds
        </MenuItem>
      </Menu>
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
            onClick={handleClick}
          >
            <AddBox size={16} />
            Log a refund
          </Button>
        }
        selector="Refunds"
        updateFilter={setFilters}
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
