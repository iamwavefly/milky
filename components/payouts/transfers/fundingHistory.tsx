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

const FundingHistory = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const containerRef = useRef();
  const dispatch = useDispatch();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/payout/history?page=${currentPage}&limit=10&${Object.entries(
      filters
    )
      ?.map((filterArr) => `${filterArr[0]}=${filterArr[1]}`)
      .join("&")}`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, [currentPage, search, filters]);

  const openDrawal = () => {
    dispatch(
      setDrawalState({
        active: true,
        title: "Fund Balance",
        content: <FundBalance />,
      })
    );
  };

  return (
    <Box>
      <Modal
        title="Add New Beneficiary"
        isOpen={openModal}
        close={handleCloseModal}
        onClose={handleCloseModal}
      >
        <FundBalance reload={handleSubmit} close={handleCloseModal} />
      </Modal>
      <Header
        containerRef={containerRef}
        columns={FundingHistoryTableColumns}
        data={data?.items}
        url="/payout/history"
        entries={`${data?.total_items ?? 0}`}
        setSearch={setSearch}
        actions={
          <>
            <Export
              columns={FundingHistoryTableColumns}
              data={data?.data?.items}
              title="beneficiary"
              variant="outlinedSmall"
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
        updateFilter={setFilters}
      />
      <Table
        containerRef={containerRef}
        data={data?.items ?? []}
        columns={FundingHistoryTableColumns}
        isFetching={loading}
        page={setCurrentPage}
        pageCount={data?.total_pages}
      />
    </Box>
  );
};

export default FundingHistory;
