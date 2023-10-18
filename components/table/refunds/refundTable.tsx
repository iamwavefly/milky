import { useState, useCallback, useEffect, useRef, MouseEvent } from "react";
import { Box, Button, Menu, MenuItem, Stack } from "@mui/material";
import { _businesses, _payoutCredit } from "@/mocks";
import Header from "../header";
import CarretDown from "../../../public/assets/icons/carret-down.svg";
import DownloadIcon from "../../../public/assets/icons/download-color.svg";
import FilterTable from "../filter";
import Table from "../table";
import Router from "next/router";
import {
  DisputeColumns,
  PayoutCreditColumns,
  RefundTableColumns,
} from "../columns";
import { _main } from "@/mocks/index";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
const DisputeTable = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});

  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const containerRef = useRef();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/chargeback/all/?page=${currentPage}&limit=10&${Object.entries(
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
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>Single refund</MenuItem>
        <MenuItem>Bulk refund</MenuItem>
      </Menu>
      <Header
        containerRef={containerRef}
        columns={RefundTableColumns}
        data={data?.items}
        entries={`${data?.data?.page?.total ?? 0}`}
        setSearch={setSearch}
        url="/dashboard/chargeback/all"
        buttons={
          <Stack direction="row" spacing="16px">
            <Button variant="outlined">
              Download all <DownloadIcon />
            </Button>
            <Button onClick={handleClick} variant="contained">
              Log refund
            </Button>
          </Stack>
        }
      />
      <FilterTable updateFilter={setFilters} />
      <Table
        containerRef={containerRef}
        data={data?.data?.items ?? []}
        columns={RefundTableColumns}
        page={setCurrentPage}
        pageCount={data?.data?.page.total_pages}
        isFetching={loading}
        dataLength={data?.data?.page?.total_items}
        onClickRow={(e) => Router.push(`/refunds/${e?.row?.original?.id}`)}
      />
    </Box>
  );
};

export default DisputeTable;
