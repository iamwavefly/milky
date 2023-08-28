import { Pagination, styled, TableRow } from "@mui/material";

export const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #f1f1f1;
  }
  &:last-child td,
  &:last-child th {
    border: 0;
  }
  :hover {
    background-color: #d9d9d9;
  }
`;

export const StyledPagination = styled(Pagination)`
  display: flex;
  align-items: flex-end;
  height: 52px;
  border-top: 1px solid #e9ebf2;
  margin-top: 2rem;
  padding: 0 24px;
  padding-bottom: 10px;
  li {
    borderradius: 0;
    margin-right: 8px;
    height: 29px;
    & button {
      border: 0;
      border-radius: 0 !important;
      margin: 0;
      color: #92959f;
      font-size: 12px;
      &.MuiPaginationItem-root {
        border: 1px solid #e4e8f2;
      }
      &.MuiPaginationItem-previousNext {
        color: #262b40;
      }
      &.Mui-selected {
        border: 0;
      }
    }
    & .MuiPaginationItem-ellipsis {
      border: 0;
    }
  }
`;
