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
import EditIcon from "@/public/icons/edit.svg";
import CopyIcon from "@/public/icons/copy.svg";
import clipboard from "@/helper/clipboard";
import ProductDetailsTable from "@/components/business/paymentLinks/productDetailsTable";
import BackArrowIcon from "remixicon-react/ArrowLeftSLineIcon";
import truncate from "@/helper/truncate";
import NewVirtualAccount from "@/components/accounts/virtual/newVirtualAccount";
import { setDrawalState } from "@/store/appSlice";
import { useDispatch } from "react-redux";
import NewPaymentLink from "@/components/business/paymentLinks/newPaymentLink";
import BackArrow from "@/components/headers/BackArrow";

export default function Index() {
  const [details, setDetails] = useState({});

  const dispatch = useDispatch();

  const { asPath } = useRouter();
  const id = +asPath.split("/").slice(-1)[0];
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/payment/link/subsidiary?id=${id}`,
    "get"
  );

  const close = () => dispatch(setDrawalState({ active: false }));

  useEffect(() => {
    typeof id === "number" && isNaN(id) === false && handleSubmit();
  }, [asPath, id]);

  useEffect(() => {
    setDetails(data?.items?.[0]);
  }, [data]);

  const openDrawal = () => {
    dispatch(
      setDrawalState({
        active: true,
        title: "Edit Payment Link",
        content: (
          <NewPaymentLink
            reload={handleSubmit}
            details={details}
            close={close}
          />
        ),
      })
    );
  };

  return (
    <Dashboard title={`${details?.name ?? "..."} | Payment Links`}>
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <BackArrow title="Payment Link Details" mb={0} />
          <Stack direction="row" spacing="10px">
            <Button
              variant="outlined"
              sx={{ fontSize: "12px", height: "40px" }}
              onClick={() => clipboard(details?.payment_link_url ?? "...")}
            >
              <CopyIcon size={18} />
              Copy Link
            </Button>
            <Button
              variant="outlined"
              sx={{ fontSize: "12px", height: "40px" }}
              onClick={openDrawal}
            >
              <EditIcon size={18} fill="#0048B1" /> Edit Link
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
                {details?.payment_link_url
                  ? truncate(details?.payment_link_url, 30)
                  : "..."}
              </Typography>
            </Box>
          </Stack>
        </Stack>
        <Box mt="24px">
          <ProductDetailsTable />
        </Box>
        {/* Customer transaction */}
        <Box mt="24px">
          <TransactionrDetailsTable />
        </Box>
      </Box>
    </Dashboard>
  );
}
