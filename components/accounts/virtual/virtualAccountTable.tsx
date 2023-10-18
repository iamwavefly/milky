import { useState, useCallback, useEffect, useRef } from "react";
import Styles from "../../styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { _businesses, _customers, _invoices } from "@/mocks";
import Header from "@/components/table/header";
import Table from "@/components/table/table";
import FilterTable from "@/components/table/filter";
import { AccountVirtualTableColumns } from "@/components/table/columns";
import Router from "next/router";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import AddBox from "@/public/icons/folder-plus.svg";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setDrawalState } from "@/store/appSlice";
import NewPaymentLink from "@/components/business/paymentLinks/newPaymentLink";
import NewVirtualAccount from "./newVirtualAccount";
import DropdownMenu from "@/components/DropdownMenu";
import Export from "@/components/Export";
import Modal from "@/components/modal/modal";
import { ResultProps } from "@/interfaces";

const VirtualAccountTable = () => {
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
    `${baseUrl}/view/static/accounts?${
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
        title="New Virtual Account"
        isOpen={openModal}
        close={handleCloseModal}
        onClose={handleCloseModal}
      >
        <NewVirtualAccount reload={handleSubmit} close={handleCloseModal} />
      </Modal>
      <Header
        entries={result?.total_items}
        pageName="Virtual Accounts"
        actions={
          <>
            <Export
              columns={AccountVirtualTableColumns}
              data={data?.items}
              title="virtual account"
              variant="outlinedSmall"
              containerRef={containerRef}
              onExport={setRowsPerPage}
              loading={loading}
            />
            <Button
              variant="contained"
              sx={{ height: "40px", fontSize: "12px" }}
              onClick={handleOpenModal}
            >
              <AddBox size={16} />
              Create Virtual Account
            </Button>
          </>
        }
      />
      <Table
        containerRef={containerRef}
        columns={AccountVirtualTableColumns}
        page={setCurrentPage}
        data={result?.items ?? []}
        pageCount={result?.total_pages}
        dataLength={result.total_items}
        isFetching={loading && rowsPerPage}
      />
    </Box>
  );
};

export default VirtualAccountTable;
