import FilterTable from "@/components/table/filter";
import Header from "@/components/table/header";
import MultipleTableHeader from "@/components/table/MultipleTableHeader";
import { _settlement } from "@/mocks";
import { Button, Checkbox, Stack } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Styles from "./duetable.module.scss";
import Table from "../../table/table";
import { SettlementTableColumns } from "@/components/table/columns";
import Router from "next/router";

interface btnProps {
  id?: number;
  name: string;
}

const DeuTable = () => {
  const headerBtn: btnProps[] = [
    {
      id: 1,
      name: "All Settlement",
    },
    {
      id: 2,
      name: "Download All",
    },
    {
      id: 3,
      name: "Logs settlement",
    },
  ];

  const [transactions, setTransactions] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTransactions(_settlement);
    }, 3000);
  }, []);

  return (
    <div>
      <Header
        entries={transactions.length}
        buttons={
          <div className={Styles.header_btn}>
            <Stack direction={"row"} spacing={2} alignItems="center">
              {headerBtn?.map((x) => (
                <Button variant="outlined" key={x?.id}>
                  {x?.name}
                </Button>
              ))}
            </Stack>
          </div>
        }
      />
      <FilterTable
        updateFilter={function (value: React.SetStateAction<{}>): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Table
        data={transactions}
        columns={SettlementTableColumns}
        isFetching={loading}
        pageCount={20}
        onClickRow={(e) => Router.push(`/settlements/${e?.row?.original?.id}`)}
        page={() => undefined}
      />
    </div>
  );
};

export default DeuTable;
