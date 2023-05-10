import { useState, useCallback, useEffect, useRef } from "react";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import axios from "axios";
import moment from "moment";
import { Divider, Image } from "semantic-ui-react";
import Link from "next/link";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import { _businesses, _main } from "@/mocks";
import Header from "../header";
import FilterTable from "../filter";
import Table from "../table";
import Router from "next/router";
import { ApprovalSetupTableColumns } from "../columns";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";

const SetupTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");

  const containerRef = useRef();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/pricing/provider?page=${currentPage}&limit=10`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, [currentPage]);

  return (
    <Box>
      <Header
        containerRef={containerRef}
        columns={ApprovalSetupTableColumns}
        data={data?.data?.items}
        entries={data?.data?.page.total ?? 0}
        setSearch={setSearch}
        buttons={<Button variant="contained">Add a new provider</Button>}
      />
      <Table
        containerRef={containerRef}
        data={data?.data?.items ?? []}
        columns={ApprovalSetupTableColumns}
        page={setCurrentPage}
        pageCount={data?.data?.page.total_pages}
        isFetching={loading}
        onClickRow={(e) => Router.push(`/merchants/${e?.row?.original?.id}`)}
      />
    </Box>
  );
};

export default SetupTable;
