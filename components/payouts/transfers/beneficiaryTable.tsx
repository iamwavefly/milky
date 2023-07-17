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
import { Button } from "@mui/material";
import FundIcon from "remixicon-react/FundsBoxLineIcon";
import { useDispatch } from "react-redux";
import { setDrawalState } from "@/store/appSlice";
import NewBeneficiary from "../newBeneficiary";

const BeneficiaryTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});

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
  }, [currentPage, search, filters]);

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
    <div className={Styles.container}>
      <Header
        containerRef={containerRef}
        columns={BeneficiaryTableColumns}
        data={data?.data?.items}
        entries={`${data?.data?.page?.size ?? 0}`}
        setSearch={setSearch}
        url="/beneficiary/all"
        buttons={
          <Button
            sx={{ fontSize: "12px", height: "40px" }}
            variant="contained"
            onClick={openDrawal}
          >
            <FundIcon size={18} />
            Add new beneficiary
          </Button>
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
    </div>
  );
};

export default BeneficiaryTable;
