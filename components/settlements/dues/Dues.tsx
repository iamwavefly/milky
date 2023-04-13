import TransactionTable from "@/components/transactions/Transaction/TransactionTable";
import { Box } from "@mui/material";
import React from "react";
import DeuTable from "./DeuTable";

const Dues = () => {
  return (
    <div style={{ marginTop: "32px" }}>
      <Box bgcolor="#fff">
        <DeuTable />
      </Box>
    </div>
  );
};

export default Dues;
