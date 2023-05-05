import { Box } from "@material-ui/core";
import React from "react";
import TransactionTable from "./TransactionTable";
import { _businesses } from "@/mocks";

const AllTransaction = () => {
  return (
    <div style={{ marginTop: "32px" }}>
      <Box bgcolor="#fff">
        <TransactionTable />
      </Box>
    </div>
  );
};

export default AllTransaction;
