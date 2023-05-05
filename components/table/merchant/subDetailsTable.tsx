import { useState, useCallback, useEffect } from "react";
import Styles from "./styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import axios from "axios";
import moment from "moment";
import { Divider, Image } from "semantic-ui-react";
import Link from "next/link";
import { Box, Checkbox, Typography } from "@mui/material";
import { _accounts, _accountSubsidiaries } from "@/mocks";
import Header from "../header";
import FilterTable from "../filter";
import Table from "../table";
import Router from "next/router";
import {
  AccountSubDetailsColumns,
  AccountSubsidiariesColumns,
} from "../columns";

const SubDetailsTable = () => {
  const [transactions, setTransactions] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTransactions(_accountSubsidiaries);
    }, 3000);
  }, []);

  return (
    <Box bgcolor="#fff">
      <Typography py="24px" ml="24px">
        Subsidiaries
      </Typography>
      <FilterTable />
      <Table
        data={transactions}
        columns={AccountSubDetailsColumns}
        isFetching={loading}
        pageCount={20}
        onClickRow={(e) => Router.push(`/accounts/${e?.row?.original?.id}`)}
        page={() => undefined}
      />
    </Box>
  );
};

export default SubDetailsTable;