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
import AddIcon from "@/public/icons/add.svg";
import CheckboxIcon from "remixicon-react/CheckboxLineIcon";
import { toast } from "react-hot-toast";
import Router from "next/router";
import Footer from "../form/Footer";

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
      <Box px="56px" pt="26px" height="80vh" bgcolor="#F6F6F9">
        <Stack
          mb="20px"
          height="40px"
          direction="row"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <Typography fontSize="18px" fontWeight={500}>
            48 Entries
          </Typography>
          <Button
            variant="contained"
            sx={{
              height: "40px",
              bgcolor: "#fff !important",
              color: "#0048B1 !important",
              border: "1px solid #0048B1",
            }}
            onClick={openRefund}
          >
            <AddIcon fill="#0048B1" width="18px" height="18px" />
            Add another file
          </Button>
        </Stack>
        <Table data={csvFile.json ?? []} columns={csvFile?.columns} />
      </Box>
      <Stack
        position="sticky"
        bottom={0}
        left={0}
        direction="row"
        bgcolor="#fff"
        height="76px"
        px="40px"
        py="16px"
        gap="28px"
        borderTop="1px solid #E8EAED"
        alignItems="center"
        justifyContent="flex-end"
      >
        <LoadingButton variant="text" onClick={reset}>
          Cancel
        </LoadingButton>
        <LoadingButton
          variant="contained"
          type="submit"
          onClick={submitHandler}
          loading={loading}
        >
          Confirm refund
        </LoadingButton>
      </Stack>
    </Box>
  );
}
