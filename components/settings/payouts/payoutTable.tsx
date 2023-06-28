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
import AddBox from "remixicon-react/AddBoxFillIcon";
import { setDrawalState } from "@/store/appSlice";
import { useDispatch } from "react-redux";

const PayoutTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});

  const dispatch = useDispatch();
  // close drawal
  const openDrawal = () => {
    dispatch(
      setDrawalState({
        active: true,
        title: "Add a New Customer",
      })
    );
  };

  const containerRef = useRef();

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

  return (
    <Box>
      <Header
        containerRef={containerRef}
        columns={PayoutTableColumns}
        data={data?.data?.items}
        entries={`${data?.page?.total_items ?? 0} Entries`}
        setSearch={setSearch}
        buttons={
          <Button
            variant="contained"
            sx={{ height: "40px", fontSize: "12px" }}
            onClick={openDrawal}
          >
            <AddBox size={16} />
            Add bank account
          </Button>
        }
        updateFilter={setFilters}
        selector="payoutAccounts"
      />
      <Table
        containerRef={containerRef}
        data={data?.data?.items ?? []}
        columns={PayoutTableColumns}
        isFetching={loading}
        page={setCurrentPage}
        pageCount={data?.page?.total_pages}
        onClickRow={(e) =>
          Router.push(`/business/customers/${e?.row?.original?.id}`)
        }
      />
    </Box>
  );
};

export default PayoutTable;
