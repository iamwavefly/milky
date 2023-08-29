import React, { useEffect, useState } from "react";
import Dashboard from "@/layouts/dashboard";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Breadcrumb from "@/components/headers/BackArrow";
import OnlyHeader from "@/components/cards/onlyHeader";
import csvtojson from "csvtojson";
import Table from "@/components/table/table";
import Header from "@/components/table/header";
// import { Close } from "@carbon/icons-react";
import { setToastState } from "@/store/appSlice";
import { useDispatch } from "react-redux";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { LoadingButton } from "@mui/lab";
import Router from "next/router";

const Index = () => {
  const [jsonData, setJsonData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);

  const dispatch = useDispatch();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/refund/transaction`
  );

  // show success message
  useEffect(() => {
    const { status, message } = data;
    if (status === "success") {
      Router.push("/refunds");
      dispatch(
        setToastState({
          title: message,
          active: true,
          theme: "success",
        })
      );
    }
  }, [data]);

  const submitHandler = () => {
    const payload = jsonData.map((el) =>
      Object.fromEntries(
        Object.entries(el).map(([key, value]) => [
          key.replace(/\s+/g, "_"),
          value,
        ])
      )
    );
    handleSubmit(payload);
  };

  const handleFileInputChange = async (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const csvData = await file.text();
      const jsonArray = await csvtojson().fromString(csvData);
      const tableColumns = Object.keys(jsonArray[0]).map((col) => {
        return {
          accessorKey: col,
          header: col,
        };
      });
      setColumns(tableColumns);
      setJsonData(jsonArray);
    }
  };

  return (
    <Dashboard title="Disputes">
      {showTable && jsonData.length ? (
        <Box>
          <Header
            columns={columns}
            data={jsonData}
            entries={`${jsonData?.length ?? 0}`}
            buttons={
              <Stack direction="row" spacing="16px">
                <Button variant="outlined" onClick={() => setShowTable(false)}>
                  Cancel
                  {/* <Close /> */}
                </Button>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  onClick={submitHandler}
                >
                  Log bulk dispute
                </LoadingButton>
              </Stack>
            }
          />
          <Table data={jsonData ?? []} columns={columns} />
        </Box>
      ) : (
        <>
          <Breadcrumb title="Back to dispute" />
          <OnlyHeader
            mt="49px"
            mx="auto"
            width="489px"
            alignHeader="left"
            header="File upload requirements"
          >
            <Stack>
              <Typography fontSize="14px">File must be CSV</Typography>
              <Typography fontSize="14px" mt="16px">
                CSV file should contain{" "}
                <Typography component="span" fontWeight={500}>
                  transaction reference
                </Typography>
                , and{" "}
                <Typography component="span" fontWeight={500}>
                  amount
                </Typography>{" "}
                columns.
              </Typography>
              <Typography fontSize="14px" mt="14px">
                The order of the columns should be the same as the order in
                which they are listed above with the first row header.
              </Typography>
              <Divider sx={{ my: "16px" }} />
              <TextField
                InputLabelProps={{ shrink: true }}
                onChange={handleFileInputChange}
                type="file"
                className="file-input"
                variant="outlined"
                label="Bulk dispute CSV file"
                placeholder="Choose file to upload"
                name="due_date"
                sx={{ mt: "16px" }}
              />
              <Button
                disabled={!jsonData.length}
                onClick={() => setShowTable(true)}
                variant="contained"
                sx={{ height: "52px", mt: "36px" }}
              >
                Continue
              </Button>
            </Stack>
          </OnlyHeader>
        </>
      )}
    </Dashboard>
  );
};

export default Index;
