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
import UploadIcon from "remixicon-react/Upload2LineIcon";
import DownloadIcon from "../../public/icons/download-alt.svg";
import csvtojson from "csvtojson";
import BulkRefundTable from "./bulkRefundTable";
// import SampleBulkFile from "";

export default function BulkRefund({ reload, updateCsvFile }: any) {
  const [jsonData, setJsonData] = useState<any[] | null>(null);
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    jsonData && updateCsvFile({ json: jsonData, columns });
  }, [jsonData]);

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

  const ref = useRef<any>();
  const openFilePicker = (e: any) => {
    ref.current.click();
  };

  return (
    <Box>
      {/* hidden input file */}
      <Box position="absolute">
        <input
          hidden
          ref={ref}
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={handleFileInputChange}
        />
      </Box>
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "315px",
          border: "1px solid #2E3192",
          mt: "32px",
        }}
      >
        <IconButton>
          <UploadIcon color="#2E3192" size={20} />
        </IconButton>
        <Button
          sx={{ fontSize: "12px", height: "40px", mt: "45px" }}
          variant="outlined"
          onClick={openFilePicker}
        >
          Choose file to upload
        </Button>
        <Typography
          mt="15px"
          fontSize="12px"
          fontWeight={400}
          color="rgba(38, 43, 64, 0.8)"
        >
          Upload the refund CSV file to begin
        </Typography>
      </Stack>
      <a
        href={"../../mocks/refunds_sample.csv"}
        download="Example-PDF-document"
        target="_blank"
        rel="noreferrer"
      >
        <Typography color="#262B40" fontWeight={500} mt="29px" fontSize="12px">
          <IconButton>
            <DownloadIcon />
          </IconButton>
          Download sample CSV file for bulk refund
        </Typography>
      </a>
    </Box>
  );
}
