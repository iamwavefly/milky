import {
  Box,
  Paper,
  Skeleton,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@mui/material";
import {
  Cell,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
// import { debounce } from "lodash";
import { ChangeEvent, FC, memo, useMemo, useState } from "react";
import { StyledPagination } from "./styled";
import CustomPagination from "./Pagination";

interface TableProps {
  containerRef?: any;
  data: any[];
  columns: ColumnDef<any>[];
  isFetching?: boolean;
  skeletonCount?: number;
  dataLength?: number;
  skeletonHeight?: number;
  headerComponent?: JSX.Element;
  pageCount?: number;
  page?: (page: number) => void;
  search?: (search: string) => void;
  onClickRow?: (cell: Cell<any, unknown>, row: Row<any>) => void;
  searchLabel?: string;
}

const Table: FC<TableProps> = ({
  containerRef,
  data,
  columns,
  isFetching,
  skeletonCount = 10,
  skeletonHeight = 28,
  headerComponent,
  pageCount,
  search,
  onClickRow,
  page,
  dataLength,
  searchLabel = "Search",
}) => {
  console.log(data.length);
  const [paginationPage, setPaginationPage] = useState(1);

  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoisedHeaderComponent = useMemo(
    () => headerComponent,
    [headerComponent]
  );

  const { getHeaderGroups, getRowModel, getAllColumns } = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
  });

  const skeletons = Array.from({ length: skeletonCount }, (x, i) => i);

  const columnCount = getAllColumns()?.length;

  const noDataFound =
    !isFetching && (!memoizedData || memoizedData?.length === 0);

  const handleSearchChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    search && search(e.target.value);
  };

  const handlePageChange = (currentPage: number) => {
    setPaginationPage(currentPage === 0 ? 1 : currentPage);
    page?.(currentPage === 0 ? 1 : currentPage);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #E8EAED",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {/* <Box paddingX="1rem">
        {memoisedHeaderComponent && <Box>{memoisedHeaderComponent}</Box>}
        {search && (
          <TextField
            onChange={debounce(handleSearchChange, 1000)}
            size="small"
            label={searchLabel}
            margin="normal"
            variant="standard"
          />
        )}
      </Box> */}
      <Box ref={containerRef} style={{ overflowX: "auto" }}>
        <MuiTable>
          {!isFetching && (
            <TableHead>
              {getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
          )}
          <TableBody>
            {!isFetching ? (
              getRowModel?.()?.rows?.map((row) => (
                <TableRow key={row?.id}>
                  {row?.getVisibleCells()?.map((cell) => (
                    <TableCell
                      onClick={() => onClickRow?.(cell, row)}
                      key={cell?.id}
                    >
                      {flexRender(
                        cell?.column?.columnDef?.cell,
                        cell?.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <>
                <TableRow
                  sx={{
                    height: "48px !important",
                    bgcolor: "#F9FAFB",
                  }}
                >
                  {Array.from({ length: columnCount }, (x, i) => i).map(
                    (elm) => (
                      <TableCell key={elm} sx={{ height: "48px" }}>
                        <Skeleton />
                      </TableCell>
                    )
                  )}
                </TableRow>
                {skeletons.map((skeleton) => (
                  <TableRow key={skeleton}>
                    {Array.from({ length: columnCount }, (x, i) => i).map(
                      (elm) => (
                        <TableCell key={elm}>
                          <Skeleton height={skeletonHeight} />
                        </TableCell>
                      )
                    )}
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </MuiTable>
      </Box>
      {noDataFound && (
        <Box my={2} textAlign="center">
          No Data Found
        </Box>
      )}
      {pageCount && page ? (
        // <StyledPagination
        //   count={pageCount}
        //   page={paginationPage}
        //   onChange={handlePageChange}
        //   color="primary"
        // />
        <CustomPagination
          count={pageCount}
          page={paginationPage}
          length={dataLength ?? 0}
          onChange={handlePageChange}
        />
      ) : (
        ""
      )}
    </Paper>
  );
};

export default memo(Table);
