import { useState, useCallback, useEffect, useRef } from "react";
import Styles from "../../styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { _businesses, _customers, _invoices } from "@/mocks";
import Header from "@/components/table/header";
import Table from "@/components/table/table";
import FilterTable from "@/components/table/filter";
import { InvoiceTableColumns } from "@/components/table/columns";
import Router from "next/router";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import { Button } from "@mui/material";
import AddBox from "@/public/icons/add.svg";
import Filter from "@/components/Filter";
import Export from "@/components/Export";
import DropdownMenu from "@/components/DropdownMenu";
import { selectAppState, setDrawalState } from "@/store/appSlice";
import { useDispatch, useSelector } from "react-redux";
import NewInvoice from "./NewInvoice";

const InvoiceTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});

  const dispatch = useDispatch();
  const containerRef = useRef();

  const { reload } = useSelector(selectAppState);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/invoice/all?page=${currentPage}&limit=10&${Object.entries(
      filters
    )
      ?.map((filterArr) => `${filterArr[0]}=${filterArr[1]}`)
      .join("&")}`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, [currentPage, reload, filters]);

  const newInvoiceDrawal = () => {
    dispatch(
      setDrawalState({
        active: true,
        title: "New Invoice",
        content: <NewInvoice />,
      })
    );
  };

  return (
    <div className={Styles.container}>
      <Header
        containerRef={containerRef}
        columns={InvoiceTableColumns}
        data={data?.items}
        url="/dashboard/invoice/all"
        actions={
          <>
            <DropdownMenu
              title="Filter"
              updateFilter={setFilters}
              selector="invoice"
            />
            <Export
              columns={InvoiceTableColumns}
              data={data?.items}
              title="invoice"
              variant="outlinedSmall"
              containerRef={containerRef}
            />
            <Button
              sx={{ height: "40px", fontSize: "12px" }}
              variant="contained"
              onClick={newInvoiceDrawal}
            >
              <AddBox width="18px" height="18px" fill="#fff" />
              New Invoice
            </Button>
          </>
        }
        entries={`${data?.total_items ?? 0} Entries`}
        setSearch={setSearch}
        updateFilter={setFilters}
        selector="invoice"
      />
      <Table
        containerRef={containerRef}
        data={data?.items ?? []}
        columns={InvoiceTableColumns}
        isFetching={loading}
        page={setCurrentPage}
        pageCount={data?.total_pages}
        onClickRow={(e) =>
          Router.push(`/business/invoice/${e?.row?.original?.id}`)
        }
      />
    </div>
  );
};

export default InvoiceTable;
