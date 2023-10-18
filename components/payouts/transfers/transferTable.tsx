import { useState, useCallback, useEffect, useRef } from "react";
import Styles from "../../styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { _businesses, _customers, _invoices } from "@/mocks";
import Header from "@/components/table/header";
import Table from "@/components/table/table";
import FilterTable from "@/components/table/filter";
import { TransferTableColumns } from "@/components/table/columns";
import Router from "next/router";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import AddBox from "remixicon-react/AddBoxFillIcon";
import { Box, Button } from "@mui/material";
import MakeTransfer from "./makeTransfer";
import TransferDetails from "./transferDetails";
import { setDrawalState } from "@/store/appSlice";
import { useDispatch } from "react-redux";
import AddIcon from "@/public/icons/add.svg";
import FundBalance from "./fundBalance";
import Modal from "@/components/modal/modal";
import { ResultProps } from "@/interfaces";

const TransferTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});
  const [reload, setReload] = useState(false);
  const [modalState, setModalState] = useState<null | string>(null);
  const [openModal, setOpenModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState<number | null>(10);
  const [result, setResult] = useState<ResultProps>({
    items: [],
    total_items: 0,
    total_pages: 0,
  });

  const containerRef = useRef();

  // fund balance
  const handleOpenModal = (type: "fund" | "transfer") => {
    setOpenModal(true);
    setModalState(type);
  };
  const handleCloseModal = () => setOpenModal(false);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/payout/all?${
      rowsPerPage ? `limit=${rowsPerPage}&page=${currentPage}` : ""
    }&${Object.entries(filters)
      ?.map((filterArr) => `${filterArr[0]}=${filterArr[1]}`)
      .join("&")}`,
    "get"
  );

  useEffect(() => {
    rowsPerPage && setResult(data?.data);
  }, [data]);

  useEffect(() => {
    handleSubmit();
  }, [currentPage, search, filters, rowsPerPage, reload]);

  return (
    <Box>
      <Modal
        title={modalState === "fund" ? "Fund Balance" : "Make Transfer"}
        isOpen={openModal}
        close={handleCloseModal}
        onClose={handleCloseModal}
      >
        {modalState === "fund" ? (
          <FundBalance reload={handleSubmit} close={handleCloseModal} />
        ) : (
          <MakeTransfer
            reload={() => setReload((prev) => !prev)}
            close={handleCloseModal}
          />
        )}
      </Modal>
      <Header
        setSearch={setSearch}
        actions={
          <>
            <Button
              sx={{ height: "40px", px: "12px !important" }}
              onClick={() => handleOpenModal("fund")}
              variant="outlined"
            >
              <AddIcon fill="#0048B1" width="18px" height="18px" />
              Fund balance
            </Button>
            <Button
              sx={{ fontSize: "12px", height: "40px" }}
              variant="contained"
              onClick={() => handleOpenModal("transfer")}
            >
              Make a transfer
            </Button>
          </>
        }
      />
      <Table
        containerRef={containerRef}
        columns={TransferTableColumns}
        page={setCurrentPage}
        data={result?.items ?? []}
        pageCount={result?.total_pages}
        dataLength={result?.total_items}
        isFetching={loading && rowsPerPage}
      />
    </Box>
  );
};

export default TransferTable;
