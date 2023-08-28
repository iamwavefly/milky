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

const VirtualAccountTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const containerRef = useRef();
  const dispatch = useDispatch();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/view/static/accounts?page=${currentPage}&limit=10&${Object.entries(
      filters
    )
      ?.map((filterArr) => `${filterArr[0]}=${filterArr[1]}`)
      .join("&")}`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, [currentPage, search, filters]);

  // const openDrawal = () => {
  //   dispatch(
  //     setDrawalState({
  //       active: true,
  //       title: "New Virtual Account",
  //       content: <NewVirtualAccount reload={handleSubmit} />,
  //     })
  //   );
  // };

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
        containerRef={containerRef}
        columns={AccountVirtualTableColumns}
        data={data?.items}
        entries={`${data?.total_items ?? 0}`}
        pageName="Virtual Accounts"
        url="/view/static/accounts"
        actions={
          <>
            <Export
              columns={AccountVirtualTableColumns}
              data={data?.items}
              title="virtual account"
              variant="outlinedSmall"
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
        selector="virtual"
        updateFilter={setFilters}
      />
      <Table
        containerRef={containerRef}
        data={data?.items ?? []}
        columns={AccountVirtualTableColumns}
        isFetching={loading}
        page={setCurrentPage}
        pageCount={data?.total_pages}
      />
    </Box>
  );
};

export default VirtualAccountTable;
