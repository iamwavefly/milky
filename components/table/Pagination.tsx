import React from "react";
import TablePagination, {
  TablePaginationProps,
} from "@mui/material/TablePagination";
import { IconButton, Stack, Typography } from "@mui/material";
// icons
import Arrow from "@/public/icons/arrow-left.svg";

type CustomPaginationProps = {
  page: number;
  count: number;
  length: number;
  onChange: (currentPage: number) => void;
};

const rowsPerPage = 10;

const CustomPagination = ({
  page,
  count,
  length,
  onChange,
}: CustomPaginationProps) => {
  const isLastPage = page >= Math.ceil(length / rowsPerPage);
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      height="64px"
      padding="16px 24px"
    >
      {/* pages */}
      <Stack
        direction="row"
        spacing="8px"
        color="#586379"
        fontSize="15px"
        fontWeight={500}
        alignItems="center"
        lineHeight="26px"
      >
        <Typography fontWeight={"inherit"} fontSize="inherit">
          Page
        </Typography>
        <IconButton
          sx={{
            borderRadius: "6px",
            border: "1px solid #DADCE2",
            width: "40px",
            height: "32px",
            padding: "3px 0",
            fontSize: "inherit",
            fontWeight: 600,
            color: "#070F1C",
          }}
        >
          {page}
        </IconButton>
        <Typography fontWeight={"inherit"} fontSize="inherit">
          of {count}
        </Typography>
      </Stack>
      {/* items */}
      <Stack
        direction="row"
        spacing="20px"
        alignItems="center"
        color="#586379"
        fontSize="15px"
        fontWeight={500}
      >
        <Typography fontWeight={"inherit"} fontSize="inherit">
          {page * rowsPerPage - rowsPerPage + 1} -{" "}
          {isLastPage ? Math.min(page * rowsPerPage, length) : length} of{" "}
          {length} items
        </Typography>
        <Stack direction="row" spacing="16px" alignItems="center">
          <IconButton
            onClick={() => onChange(page - 1)}
            disabled={page === 1}
            sx={{
              width: "32px",
              height: "32px",
              borderRadius: "4px",
              p: "6px",
              border: "1px solid #DADCE2",
            }}
          >
            <Arrow fill="#070F1C" />
          </IconButton>
          <IconButton
            sx={{
              width: "32px",
              height: "32px",
              borderRadius: "4px",
              p: "6px",
              border: "1px solid #DADCE2",
              transform: "rotate(180deg)",
            }}
            disabled={isLastPage}
            onClick={() => onChange(page + 1)}
          >
            <Arrow fill="#070F1C" />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CustomPagination;
