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
import { selectAppState, setDrawalState } from "@/store/appSlice";
import { useDispatch, useSelector } from "react-redux";
import NewRefund from "./newRefund";
import BulkRefund from "./bulkRefund";
import BulkRefundTable from "./bulkRefundTable";
import Export from "../Export";
import FundBalance from "../payouts/transfers/fundBalance";
import FundIcon from "@/public/icons/edit-square.svg";
import Modal from "../modal/modal";

const RefundTable = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});
  const [csvFile, setCsvFile] = useState<null | {}>(null);
  const [modalState, setModalState] = useState<null | string>(null);
  const [openModal, setOpenModal] = useState(false);

  const { reload } = useSelector(selectAppState);

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

  const handleOpenModal = (type: "single" | "bulk" | "csv") => {
    setOpenModal(true);
    setModalState(type);
    handleClose();
  };
  const handleCloseModal = () => {
    handleClose();
    setOpenModal(false);
  };

  const dispatch = useDispatch();
  // open single refund
  // open bulk refund
  const openBulkRefund = () => {
    handleClose();
    handleOpenModal("bulk");
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
  }, [currentPage, reload, filters]);

  useEffect(() => {
    if (csvFile) {
      handleCloseModal();
      handleOpenModal("csv");
    }
  }, [csvFile]);

  const resetTable = () => {
    handleCloseModal();
    setCsvFile(null);
  };

  return (
    <Box>
      <Modal
        width={modalState === "csv" ? "80vw" : undefined}
        title={
          modalState === "single"
            ? "Log a Single Refund"
            : modalState === "bulk"
            ? "Log Bulk Refund"
            : "Review Refund Entries"
        }
        isOpen={openModal}
        close={handleCloseModal}
        onClose={handleCloseModal}
      >
        {modalState === "single" ? (
          <NewRefund reload={handleSubmit} close={handleCloseModal} />
        ) : modalState === "bulk" ? (
          <BulkRefund updateCsvFile={updateCsvFile} close={handleCloseModal} />
        ) : modalState === "csv" ? (
          <BulkRefundTable
            csvFile={csvFile}
            openRefund={openBulkRefund}
            reload={handleSubmit}
            reset={resetTable}
            close={handleCloseModal}
          />
        ) : (
          ""
        )}
      </Modal>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleOpenModal("single")}>
          Log a single refund
        </MenuItem>
        <MenuItem onClick={() => handleOpenModal("bulk")}>
          Log bulk refunds
        </MenuItem>
      </Menu>
      <Header
        containerRef={containerRef}
        columns={RefundTableColumns}
        data={data?.items}
        entries={data?.total_items ?? 0}
        setSearch={setSearch}
        url="/dashboard/refund/all"
        actions={
          <>
            <Export
              columns={RefundTableColumns}
              data={data?.items}
              title="beneficiary"
              containerRef={containerRef}
              variant="outlinedSmall"
            />
            <Button
              variant="contained"
              onClick={handleClick}
              sx={{ height: "40px", fontSize: "14px" }}
            >
              <FundIcon width="18px" height="18px" fill="#fff" />
              Log a refund
            </Button>
          </>
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
