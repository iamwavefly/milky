// @ts-nocheck
import { useEffect, useState } from "react";
import Dashboard from "@/layouts/dashboard";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import Router, { useRouter } from "next/router";
import moment from "moment";
import TransactionrDetailsTable from "@/components/business/paymentLinks/transactionDetailsTable";
import EditIcon from "remixicon-react/EditLineIcon";
import CopyIcon from "remixicon-react/FileCopyLineIcon";
import clipboard from "@/helper/clipboard";
import ProductDetailsTable from "@/components/business/paymentLinks/productDetailsTable";
import BackArrowIcon from "remixicon-react/ArrowLeftSLineIcon";
import truncate from "@/helper/truncate";

export default function Index() {
  const [details, setDetails] = useState({});

  const { asPath } = useRouter();
  const id = +asPath.split("/").slice(-1)[0];
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/payment/link/subsidiary?id=${id}`,
    "get"
  );

  useEffect(() => {
    typeof id === "number" && isNaN(id) === false && handleSubmit();
  }, [asPath, id]);

  useEffect(() => {
    setDetails(data?.items?.[0]);
  }, [data]);

  return (
    <Dashboard title={`${details?.name ?? "..."} | Payment Links`}>
      <Box py="35px" px="30px">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center">
            <IconButton onClick={() => Router.back()}>
              <BackArrowIcon size={18} color="#2E3192" />
            </IconButton>
            <Typography color="#2E3192" fontSize="16px">
              {details?.name ?? "..."}
            </Typography>
          </Stack>
          <Stack direction="row" spacing="10px">
            <Button
              variant="outlined"
              sx={{ fontSize: "12px", height: "40px" }}
            >
              <EditIcon size={18} /> Edit Link
            </Button>
            <Button
              variant="contained"
              sx={{ fontSize: "12px", height: "40px" }}
              onClick={() => clipboard(details?.payment_url ?? "...")}
            >
              <CopyIcon size={18} />
              Copy Link
            </Button>
          </Stack>
        </Stack>
        {/* customer details  */}
        <Stack direction="row" mt="35px" height="112px" bgcolor="#FFFFFF">
          <Stack flex={1}>
            <Stack
              justifyContent="center"
              height="56px"
              borderBottom="1px solid #E8EAF0"
              pl="48px"
            >
              <Typography color="#92959F" fontSize="12px" fontWeight={500}>
                Date created
              </Typography>
            </Stack>
            <Box justifyContent="center" pl="48px" my="auto">
              <Typography color="#262B40" fontSize="14px">
                {moment(details?.date_created).format("LL")}
              </Typography>
            </Box>
          </Stack>
          <Stack flex={1}>
            <Stack
              justifyContent="center"
              height="56px"
              borderBottom="1px solid #E8EAF0"
              pl="48px"
            >
              <Typography color="#92959F" fontSize="12px" fontWeight={500}>
                Link type
              </Typography>
            </Stack>
            <Box justifyContent="center" pl="48px" my="auto">
              <Typography color="#262B40" fontSize="14px">
                {details?.payment_type}
              </Typography>
            </Box>
          </Stack>
          <Stack flex={1}>
            <Stack
              justifyContent="center"
              height="56px"
              borderBottom="1px solid #E8EAF0"
              pl="48px"
            >
              <Typography color="#92959F" fontSize="12px" fontWeight={500}>
                Link URL
              </Typography>
            </Stack>
            <Box justifyContent="center" pl="48px" my="auto">
              <Typography color="#262B40" fontSize="14px">
                {details?.payment_url
                  ? truncate(details?.payment_url, 30)
                  : "..."}
              </Typography>
            </Box>
          </Stack>
        </Stack>
        <Box>
          <ProductDetailsTable />
        </Box>
        {/* Customer transaction */}
        <Box>
          <TransactionrDetailsTable />
        </Box>
      </Box>
    </Dashboard>
  );
}
