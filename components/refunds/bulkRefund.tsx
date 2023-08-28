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
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import UploadIcon from "@/public/icons/upload.svg";
import DownloadIcon from "@/public/icons/download.svg";
import csvtojson from "csvtojson";
import { CSVLink } from "react-csv";
import Footer from "../form/Footer";
import FileUpload from "../FileUpload";

const headers = [
  { key: "transaction_reference", label: "Transaction references" },
  { key: "amount", label: "Amount to refund" },
  { key: "reason", label: "Comments" },
];
const sampleBulkDownload = [
  {
    transaction_reference: "ALLI-MOCK-RECURR-81a68bad83b3130b96389abd23c3431f",
    amount: "5000",
    reason: "Customer got no value for his money",
  },
  {
    transaction_reference: "ALLI-MOCK-8db33f13922e19d0ea423126d8304dde",
    amount: "2.99",
    reason: "Customer got no value for his money",
  },
  {
    transaction_reference: "ALLI-MOCK-RECURR-5c7ad5d2c2cbbc16887fe8aad8fa99de",
    amount: "2000",
    reason: "Customer got no value for his money",
  },
];

export default function BulkRefund({ reload, updateCsvFile }: any) {
  const [jsonData, setJsonData] = useState<any[] | null>(null);
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    jsonData && updateCsvFile({ json: jsonData, columns });
  }, [jsonData]);

  const handleFileInputChange = async (file: any) => {
    if (file) {
      const csvData = await file.text();
      const jsonArray = await csvtojson({
        headers: ["transaction_reference", "amount", "reason"],
      }).fromString(csvData);
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
    <Box>
      <Box px="40px" mt="32px">
        <Typography fontSize="15px" lineHeight="26px">
          Upload the refund CSV file to begin
        </Typography>
        <Box>
          <FileUpload
            acceptType=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            icon={<UploadIcon />}
            update={handleFileInputChange}
          />
        </Box>
        <CSVLink
          data={sampleBulkDownload}
          headers={headers}
          filename={"refunds_sample.csv"}
        >
          <Stack
            direction="row"
            mt="16px"
            alignItems="flex-start"
            minHeight="40px"
            gap="8px"
          >
            <Box>
              <DownloadIcon width="24px" height="24px" fill="#0048B1" />
            </Box>
            <Typography color="#0048B1" fontWeight={600} fontSize="14px">
              Download sample CSV file for bulk refund
            </Typography>
          </Stack>
        </CSVLink>
      </Box>
      <Footer>Continue</Footer>
    </Box>
  );
}
