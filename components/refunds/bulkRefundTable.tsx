import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { newRefund } from "@/schema";
import { setDrawalState } from "@/store/appSlice";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import Header from "../table/header";
import Table from "../table/table";
import AddIcon from "remixicon-react/AddBoxLineIcon";
import CheckboxIcon from "remixicon-react/CheckboxLineIcon";
import { toast } from "react-hot-toast";
import Router from "next/router";

export default function BulkRefundTable({
  csvFile,
  openRefund,
  reload,
  reset,
}: any) {
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/refund`
  );

  const submitHandler = () => {
    const payload = csvFile.json.map((el: any) =>
      Object.fromEntries(
        Object.entries(el).map(([key, value]) => [
          key.replace(/\s+/g, "_"),
          value,
        ])
      )
    );
    handleSubmit(payload);
  };

  useEffect(() => {
    const { status, message } = data;
    if (status === "Success") {
      toast.success(message);
      reload();
      reset();
    }
  }, [data]);

  return (
    <Box>
      <Header
        columns={csvFile.columns}
        data={csvFile.json}
        entries={`${csvFile.json?.length ?? 0}`}
        entryOnly
        buttons={
          <Stack direction="row" spacing="16px">
            <Button
              sx={{
                height: "40px",
                fontSize: "12px",
              }}
              variant="outlined"
              onClick={openRefund}
            >
              <AddIcon size={16} />
              Add another file
            </Button>
            <LoadingButton
              loading={loading}
              onClick={submitHandler}
              sx={{
                height: "40px",
                fontSize: "12px",
              }}
              variant="contained"
            >
              <CheckboxIcon size={16} />
              Confirm refund
            </LoadingButton>
          </Stack>
        }
      />
      <Table data={csvFile.json ?? []} columns={csvFile?.columns} />
    </Box>
  );
}
