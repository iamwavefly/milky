import { useState, useCallback, useEffect, useRef } from "react";
import Styles from "../../styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { _businesses, _customers, _invoices } from "@/mocks";
import Header from "@/components/table/header";
import Table from "@/components/table/table";
import FilterTable from "@/components/table/filter";
import { FundingHistoryTableColumns } from "@/components/table/columns";
import Router from "next/router";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import AddBox from "remixicon-react/AddBoxFillIcon";
import { Box, Button } from "@mui/material";
import FundIcon from "@/public/icons/add-white.svg";
import TransferDetails from "./transferDetails";
import { setDrawalState } from "@/store/appSlice";
import { useDispatch } from "react-redux";
import FundBalance from "./fundBalance";
import Export from "@/components/Export";
import Modal from "@/components/modal/modal";
import { ResultProps } from "@/interfaces";

const FundingHistory = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState<number | null>(10);
  const [result, setResult] = useState<ResultProps>({
    items: [],
    total_items: 0,
    total_pages: 0,
  });

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const containerRef = useRef();
  const dispatch = useDispatch();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/payout/history?${
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
      <Modal
        title="Fund Balance"
        isOpen={openModal}
        close={handleCloseModal}
        onClose={handleCloseModal}
      >
        <FundBalance reload={handleSubmit} close={handleCloseModal} />
      </Modal>
      <Header
        setSearch={setSearch}
        entries={result?.total_items}
        actions={
          <>
            <Export
              columns={FundingHistoryTableColumns}
              data={data?.items}
              title="funding-history"
              variant="outlinedSmall"
              onExport={setRowsPerPage}
              containerRef={containerRef}
              loading={loading}
            />
            <Button
              sx={{ fontSize: "14px", height: "40px" }}
              variant="contained"
              onClick={handleOpenModal}
            >
              <FundIcon width="18px" height="18px" />
              Fund balance
            </Button>
          </>
        }
      />
      <Table
        containerRef={containerRef}
        columns={FundingHistoryTableColumns}
        data={result?.items ?? []}
        pageCount={result?.total_pages}
        dataLength={result.total_items}
        isFetching={loading && rowsPerPage}
        page={setCurrentPage}
      />
    </Box>
  );
};

export default FundingHistory;
