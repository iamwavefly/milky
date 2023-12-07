import { useState, useCallback, useEffect, useRef } from "react";
import Styles from "../../styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { _businesses, _customers, _invoices } from "@/mocks";
import Header from "@/components/table/header";
import Table from "@/components/table/table";
import FilterTable from "@/components/table/filter";
import { CustomersTableColumns } from "@/components/table/columns";
import Router from "next/router";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import { Box, Button } from "@mui/material";
import AddBox from "@/public/icons/add.svg";
import { selectAppState, setDrawalState } from "@/store/appSlice";
import { useDispatch, useSelector } from "react-redux";
import NewCustomer from "./newCustomer";
import Export from "@/components/Export";
import DropdownMenu from "@/components/DropdownMenu";
import Modal from "@/components/modal/modal";
import { ResultProps } from "@/interfaces";

const CustomersTable = () => {
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

  const { reload } = useSelector(selectAppState);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/fetch/customers?${
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
  }, [currentPage, search, filters, rowsPerPage, reload]);

  return (
    <Box>
      <Modal
        title="New customer"
        isOpen={openModal}
        close={handleCloseModal}
        onClose={handleCloseModal}
      >
        <NewCustomer reload={handleSubmit} close={handleCloseModal} />
      </Modal>
      <Header
        entries={result?.total_items}
        setSearch={setSearch}
        actions={
          <>
            <DropdownMenu
              title="Filter"
              updateFilter={setFilters}
              selector="customers"
            />
            <Export
              title="customer"
              columns={CustomersTableColumns}
              data={data?.items}
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
              <AddBox width={"18px"} height="18px" fill="#fff" />
              Add new customer
            </Button>
          </>
        }
      />
      <Table
        columns={CustomersTableColumns}
        containerRef={containerRef}
        data={result?.items ?? []}
        pageCount={result?.total_pages}
        isFetching={loading && rowsPerPage}
        page={setCurrentPage}
        dataLength={result.total_items}
        onClickRow={(e) =>
          Router.push(`/business/customers/${e?.row?.original?.id}`)
        }
      />
    </Box>
  );
};

export default CustomersTable;
