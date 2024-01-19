import { useState, useCallback, useEffect, useRef } from "react";
import Styles from "../../styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { _businesses, _customers, _invoices } from "@/mocks";
import Header from "@/components/table/header";
import Table from "@/components/table/table";
import FilterTable from "@/components/table/filter";
import { ProductsTableColumns } from "@/components/table/columns";
import Router from "next/router";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import AddBox from "@/public/icons/add.svg";
import { Box, Button } from "@mui/material";
import Filter from "@/components/Filter";
import DropdownMenu from "@/components/DropdownMenu";
import { useDispatch, useSelector } from "react-redux";
import { selectAppState, setDrawalState } from "@/store/appSlice";
import NewProduct from "./NewProduct";
import { ResultProps } from "@/interfaces";

const SettlementTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState<number | null>(10);
  const [result, setResult] = useState<ResultProps>({
    items: [],
    total_items: 0,
    total_pages: 0,
  });

  const containerRef = useRef();
  const dispatch = useDispatch();

  const { reload } = useSelector(selectAppState);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/product/all?${
      rowsPerPage ? `limit=${rowsPerPage}&page=${currentPage}` : ""
    }&${Object.entries(filters)
      ?.map((filterArr) => `${filterArr[0]}=${filterArr[1]}`)
      .join("&")}`,
    "get"
  );

  const newProductDrawal = () => {
    dispatch(
      setDrawalState({
        active: true,
        title: "New Product",
        content: <NewProduct />,
      })
    );
  };

  useEffect(() => {
    rowsPerPage && data && setResult(data);
  }, [data]);

  useEffect(() => {
    handleSubmit();
  }, [currentPage, search, filters, rowsPerPage, reload]);

  return (
    <Box>
      <Header
        entries={result?.items?.length}
        setSearch={setSearch}
        actions={
          <>
            <DropdownMenu
              title="Filter"
              updateFilter={setFilters}
              selector={"products"}
            />
            <Button
              variant="contained"
              sx={{ height: "40px", fontSize: "12px" }}
              onClick={newProductDrawal}
            >
              <AddBox width="18px" height="18px" fill="#fff" />
              Add new product
            </Button>
          </>
        }
      />
      <Table
        containerRef={containerRef}
        data={result?.items ?? []}
        columns={ProductsTableColumns}
        isFetching={loading && rowsPerPage}
        page={setCurrentPage}
        pageCount={result?.total_pages}
        dataLength={result.total_items}
        onClickRow={(e) =>
          Router.push(`/business/products/${e?.row?.original?.id}`)
        }
      />
    </Box>
  );
};

export default SettlementTable;
