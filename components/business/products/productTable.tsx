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
import { useDispatch } from "react-redux";
import { setDrawalState } from "@/store/appSlice";
import NewProduct from "./NewProduct";

const SettlementTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});

  const containerRef = useRef();
  const dispatch = useDispatch();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/product/all?page=${currentPage}&limit=10&${Object.entries(
      filters
    )
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
    handleSubmit();
  }, [currentPage, search, filters]);

  return (
    <Box>
      <Header
        containerRef={containerRef}
        columns={ProductsTableColumns}
        data={data?.items}
        entries={`${data?.total_items ?? 0}`}
        setSearch={setSearch}
        url="/dashboard/product/all"
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
        selector="products"
        updateFilter={setFilters}
      />
      <Table
        containerRef={containerRef}
        data={data?.items ?? []}
        columns={ProductsTableColumns}
        isFetching={loading}
        page={setCurrentPage}
        pageCount={data?.total_pages}
      />
    </Box>
  );
};

export default SettlementTable;
