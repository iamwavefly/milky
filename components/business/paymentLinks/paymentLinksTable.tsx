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

const PaymentLinksTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/payment/link/subsidiary?page=${currentPage}&limit=10&${Object.entries(
      filters
    )
      ?.map((filterArr) => `${filterArr[0]}=${filterArr[1]}`)
      .join("&")}`,
    "get"
  );

  const containerRef = useRef();

  const dispatch = useDispatch();
  // open drawal
  const openDrawal = () => {
    dispatch(
      setDrawalState({
        active: true,
        title: "New Payment Link",
        content: <NewPaymentLink reload={handleSubmit} />,
      })
    );
  };

  useEffect(() => {
    handleSubmit();
  }, [currentPage, search, filters]);

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
        containerRef={containerRef}
        columns={PaymentLinkColumns}
        data={data?.items}
        url="/dashboard/payment/link/subsidiary"
        entries={`${data?.total_items ?? 0}`}
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
        selector="paymentLinks"
        updateFilter={setFilters}
      />
      <Table
        containerRef={containerRef}
        data={data?.items ?? []}
        columns={PaymentLinkColumns}
        isFetching={loading}
        page={setCurrentPage}
        pageCount={data?.total_pages}
        onClickRow={(e) =>
          Router.push(`/business/payment-links/${e?.row?.original?.id}`)
        }
      />
    </Box>
  );
};

export default PaymentLinksTable;
