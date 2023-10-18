import { useState, useCallback, useEffect, useRef } from "react";
import Styles from "../../styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { _businesses, _customers, _invoices } from "@/mocks";
import Header from "@/components/table/header";
import Table from "@/components/table/table";
import FilterTable from "@/components/table/filter";
import { PayoutTableColumns } from "@/components/table/columns";
import Router from "next/router";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import { Box, Button } from "@mui/material";
import AddBox from "@/public/icons/add.svg";
import { setDrawalState } from "@/store/appSlice";
import { useDispatch } from "react-redux";
import BankDetails from "@/components/setup/BankDetails";
import Modal from "@/components/modal/modal";

const PayoutTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const dispatch = useDispatch();

  const containerRef = useRef();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/settlement/bank/get?page=${currentPage}&limit=10&${Object.entries(
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
      <Modal
        title="Bank Details"
        isOpen={openModal}
        close={handleCloseModal}
        onClose={handleCloseModal}
      >
        <BankDetails reload={handleSubmit} close={handleCloseModal} />
      </Modal>
      <Header
        containerRef={containerRef}
        columns={PayoutTableColumns}
        data={data?.data}
        entries={`${data?.data?.length ?? 0}`}
        setSearch={setSearch}
        url="/dashboard/settlement/bank/get"
        pageName="Bank Accounts"
        actions={
          <Button
            variant="contained"
            sx={{ height: "40px" }}
            onClick={handleOpenModal}
          >
            <AddBox fill="#fff" width="18px" height="18px" />
            Add a bank account
          </Button>
        }
        updateFilter={setFilters}
        selector="payoutAccounts"
      />
      <Table
        containerRef={containerRef}
        data={data?.data ?? []}
        columns={PayoutTableColumns}
        isFetching={loading}
        page={setCurrentPage}
        dataLength={result.total_items}
        pageCount={data?.page?.total_pages}
      />
    </Box>
  );
};

export default PayoutTable;
