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
import { ResultProps } from "@/interfaces";

const InvoiceTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState<number | null>(10);
  const [result, setResult] = useState<ResultProps>({
    items: [],
    total_items: 0,
    total_pages: 0,
  });

  const dispatch = useDispatch();
  const containerRef = useRef();

  const { reload } = useSelector(selectAppState);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/invoice/all?${
      rowsPerPage ? `limit=${rowsPerPage}&page=${currentPage}` : ""
    }&${Object.entries(filters)
      ?.map((filterArr) => `${filterArr[0]}=${filterArr[1]}`)
      .join("&")}`,
    "get"
  );

  useEffect(() => {
    rowsPerPage && setResult(data);
  }, [data]);

  useEffect(() => {
    handleSubmit();
  }, [currentPage, search, filters, rowsPerPage]);

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
              onExport={setRowsPerPage}
              loading={loading}
              noCSV
              noPNG
              noXLS
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
        entries={data?.total_items ?? 0}
        setSearch={setSearch}
      />
      <Table
        containerRef={containerRef}
        data={result?.items ?? []}
        columns={InvoiceTableColumns}
        isFetching={loading && rowsPerPage}
        page={setCurrentPage}
        pageCount={data?.total_pages}
        dataLength={result.total_items}
        onClickRow={(e) =>
          Router.push(`/business/invoice/${e?.row?.original?.id}`)
        }
      />
    </div>
  );
};

export default InvoiceTable;
