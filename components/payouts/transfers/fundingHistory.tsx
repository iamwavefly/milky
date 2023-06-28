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
import { Button } from "@mui/material";
import FundIcon from "remixicon-react/FundsBoxLineIcon";
import TransferDetails from "./transferDetails";
import { setDrawalState } from "@/store/appSlice";
import { useDispatch } from "react-redux";

const FundingHistory = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});

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
        content: <TransferDetails />,
      })
    );
  };

  return (
    <div className={Styles.container}>
      <Header
        containerRef={containerRef}
        columns={FundingHistoryTableColumns}
        data={data?.items}
        entries={`${data?.total_items ?? 0}`}
        setSearch={setSearch}
        entryOnly
        buttons={
          <Button
            sx={{ fontSize: "12px", height: "40px" }}
            variant="contained"
            onClick={openDrawal}
          >
            <FundIcon size={18} />
            Fund Balance
          </Button>
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
    </div>
  );
};

export default FundingHistory;
