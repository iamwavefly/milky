import { useState, useCallback, useEffect, useRef } from "react";
import Styles from "../../styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { _businesses, _customers, _invoices } from "@/mocks";
import Header from "@/components/table/header";
import Table from "@/components/table/table";
import FilterTable from "@/components/table/filter";
import { BeneficiaryTableColumns } from "@/components/table/columns";
import Router from "next/router";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import AddBox from "remixicon-react/AddBoxFillIcon";
import { Box, Button } from "@mui/material";
import FundIcon from "@/public/icons/add-white.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectAppState, setDrawalState } from "@/store/appSlice";
import NewBeneficiary from "../newBeneficiary";
import Export from "@/components/Export";
import Modal from "@/components/modal/modal";

const BeneficiaryTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const { reload } = useSelector(selectAppState);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const containerRef = useRef();
  const dispatch = useDispatch();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/beneficiary/all?page=${currentPage}&limit=10&${Object.entries(
      filters
    )
      ?.map((filterArr) => `${filterArr[0]}=${filterArr[1]}`)
      .join("&")}`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, [currentPage, reload, filters]);

  // open drawal
  const openDrawal = () => {
    dispatch(
      setDrawalState({
        active: true,
        title: "Add New Beneficiary",
        content: <NewBeneficiary reload={handleSubmit} />,
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
        <NewBeneficiary reload={handleSubmit} close={handleCloseModal} />
      </Modal>
      <Header
        containerRef={containerRef}
        columns={BeneficiaryTableColumns}
        data={data?.data?.items}
        entries={`${data?.data?.items?.length ?? 0}`}
        setSearch={setSearch}
        url="/beneficiary/all"
        actions={
          <>
            <Export
              columns={BeneficiaryTableColumns}
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
              Add new beneficiary
            </Button>
          </>
        }
        updateFilter={setFilters}
      />
      <Table
        containerRef={containerRef}
        data={data?.data?.items ?? []}
        columns={BeneficiaryTableColumns}
        isFetching={loading}
        page={setCurrentPage}
        pageCount={data?.data?.page?.total_page}
      />
    </Box>
  );
};

export default BeneficiaryTable;
