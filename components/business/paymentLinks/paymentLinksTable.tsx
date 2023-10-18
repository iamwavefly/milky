import { useState, useCallback, useEffect, useRef } from "react";
import Styles from "../../styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { _businesses, _customers, _invoices } from "@/mocks";
import Header from "@/components/table/header";
import Table from "@/components/table/table";
import FilterTable from "@/components/table/filter";
import {
  PaymentLinkColumns,
  ProductsTableColumns,
} from "@/components/table/columns";
import Router from "next/router";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import AddBox from "@/public/icons/link.svg";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setDrawalState } from "@/store/appSlice";
import NewPaymentLink from "./newPaymentLink";
import DropdownMenu from "@/components/DropdownMenu";
import Export from "@/components/Export";
import Modal from "@/components/modal/modal";
import { ResultProps } from "@/interfaces";

const PaymentLinksTable = () => {
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

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/payment/link/subsidiary?${
      rowsPerPage ? `limit=${rowsPerPage}&page=${currentPage}` : ""
    }&${Object.entries(filters)
      ?.map((filterArr) => `${filterArr[0]}=${filterArr[1]}`)
      .join("&")}`,
    "get"
  );

  const containerRef = useRef();

  useEffect(() => {
    rowsPerPage && setResult(data);
  }, [data]);

  useEffect(() => {
    handleSubmit();
  }, [currentPage, search, filters, rowsPerPage]);

  return (
    <Box>
      <Modal
        title="New Payment Link"
        isOpen={openModal}
        close={handleCloseModal}
        onClose={handleCloseModal}
      >
        <NewPaymentLink reload={handleSubmit} close={handleCloseModal} />
      </Modal>
      <Header
        entries={result?.total_items}
        setSearch={setSearch}
        actions={
          <>
            <DropdownMenu
              title="Filter"
              updateFilter={setFilters}
              selector={"paymentLinks"}
            />
            <Export
              title={"payment link"}
              data={data?.items}
              columns={PaymentLinkColumns}
              containerRef={containerRef}
              onExport={setRowsPerPage}
              loading={loading}
            />
            <Button
              variant="contained"
              sx={{ height: "40px", fontSize: "12px" }}
              onClick={handleOpenModal}
            >
              <AddBox width="18px" height="18px" fill="#fff" />
              Create New Link
            </Button>
          </>
        }
      />
      <Table
        data={result?.items ?? []}
        pageCount={result?.total_pages}
        isFetching={loading && rowsPerPage}
        containerRef={containerRef}
        columns={PaymentLinkColumns}
        page={setCurrentPage}
        onClickRow={(e) =>
          Router.push(`/business/payment-links/${e?.row?.original?.id}`)
        }
      />
    </Box>
  );
};

export default PaymentLinksTable;
