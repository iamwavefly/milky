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

const TransferTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});
  const [reload, setReload] = useState(false);
  const [modalState, setModalState] = useState<null | string>(null);
  const [openModal, setOpenModal] = useState(false);

  const containerRef = useRef();

  // fund balance
  const handleOpenModal = (type: "fund" | "transfer") => {
    setOpenModal(true);
    setModalState(type);
  };
  const handleCloseModal = () => setOpenModal(false);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/payout/all?page=${currentPage}&limit=10&${Object.entries(
      filters
    )
      ?.map((filterArr) => `${filterArr[0]}=${filterArr[1]}`)
      .join("&")}`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, [currentPage, search, filters, reload]);

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
        containerRef={containerRef}
        columns={TransferTableColumns}
        data={data?.data?.items}
        entries={`${data?.data?.page?.size ?? 0}`}
        setSearch={setSearch}
        selector="transfers"
        updateFilter={setFilters}
        url="/payout/all"
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
        data={data?.data?.items ?? []}
        columns={TransferTableColumns}
        isFetching={loading}
        page={setCurrentPage}
        pageCount={data?.data?.page?.total_page}
      />
    </Box>
  );
};

export default TransferTable;
