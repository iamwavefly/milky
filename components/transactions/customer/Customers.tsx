import { Box } from "@material-ui/core";
import React from "react";
import CustomerTable from "./CustomerTable";

const Customers = () => {
  return (
    <div style={{ marginTop: "32px" }}>
      <Box bgcolor="#fff">
        <CustomerTable />
      </Box>
    </div>
  );
};

export default Customers;
