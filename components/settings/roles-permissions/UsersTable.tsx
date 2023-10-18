import { useState, useCallback, useEffect, useRef } from "react";
import Styles from "../../styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { _businesses, _customers, _invoices } from "@/mocks";
import Header from "@/components/table/header";
import Table from "@/components/table/table";
import FilterTable from "@/components/table/filter";
import { UserTableColumns } from "@/components/table/columns";
import Router from "next/router";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import { Box, Button } from "@mui/material";
import AddBox from "@/public/icons/user-line.svg";
import { selectAppState, setDrawalState } from "@/store/appSlice";
import { useDispatch, useSelector } from "react-redux";
import NewUser from "@/components/form/newUser";
import Modal from "@/components/modal/modal";

const UserTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const containerRef = useRef();

  const { reload } = useSelector(selectAppState);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/users?page=${currentPage}&limit=10&${Object.entries(
      filters
    )
      ?.map((filterArr) => `${filterArr[0]}=${filterArr[1]}`)
      .join("&")}`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, [currentPage, reload, filters]);

  return (
    <Box mt="32px">
      <Modal
        title="Invite New User"
        isOpen={openModal}
        close={handleCloseModal}
        onClose={handleCloseModal}
      >
        <NewUser reload={handleSubmit} close={handleCloseModal} />
      </Modal>
      <Header
        containerRef={containerRef}
        columns={UserTableColumns}
        data={data?.users}
        url="/dashboard/users"
        entries={`${data?.users?.length ?? 0}`}
        pageName="Users"
        setSearch={setSearch}
        searchText="Search users or enter keyword"
        actions={
          <Button
            variant="contained"
            sx={{ height: "40px", fontSize: "12px" }}
            onClick={handleOpenModal}
          >
            <AddBox width="18px" height="18px" fill="#fff" />
            Invite user
          </Button>
        }
        selector="users"
        updateFilter={setFilters}
      />
      <Table
        containerRef={containerRef}
        data={data?.users ?? []}
        columns={UserTableColumns}
        isFetching={loading}
        page={setCurrentPage}
        dataLength={result.total_items}
        pageCount={data?.page?.total_pages}
      />
    </Box>
  );
};

export default UserTable;
