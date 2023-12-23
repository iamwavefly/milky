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
import OnlyHeader from "@/components/cards/onlyHeader";
import Detail from "@/components/detail";

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
        <OnlyHeader
          header={details?.name ?? "..."}
          alignHeader="left"
          mt="35px"
        >
          <Grid container flex={1} minWidth="100%">
            <Grid item xs={4}>
              <Detail
                title="link Url"
                value={
                  details?.payment_link_url
                    ? truncate(details?.payment_link_url, 30)
                    : "..."
                }
                variant="copy"
              />
            </Grid>
            <Grid item xs={3}>
              <Detail
                title="Date created"
                value={moment(details?.date_created).format("LL")}
                variant="copy"
              />
            </Grid>
            <Grid item xs={3}>
              <Detail
                title="link type"
                value={details?.payment_type}
                variant="copy"
              />
            </Grid>
          </Grid>
        </OnlyHeader>
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
