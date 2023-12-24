// @ts-nocheck
import { useEffect, useState } from "react";
import Dashboard from "@/layouts/dashboard";
import {
  Box,
  Button,
  Checkbox,
  Chip,
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
import stringToCurrency from "@/helper/formatCurrency";

const routes = [
  { label: "Rolling reserve", link: "/balance/reserve" },
  { label: "Rolling reserve details" },
];

export default function Index() {
  const [details, setDetails] = useState({});

  const dispatch = useDispatch();

  const { asPath } = useRouter();
  const id = +asPath.split("/").slice(-1)[0];
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/rolling/reserves?id=${id}`,
    "get"
  );

  const close = () => dispatch(setDrawalState({ active: false }));

  useEffect(() => {
    typeof id === "number" && isNaN(id) === false && handleSubmit();
  }, [asPath, id]);

  useEffect(() => {
    setDetails(data?.data?.items?.[0]);
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
    <Dashboard title={`Rolling Reserve Details`} breadcrumbLinks={routes}>
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <BackArrow title="Rolling Reserve Details" mb={0} />
        </Stack>
        {/* rolling reserve details  */}
        <OnlyHeader
          alignHeader="left"
          mt="35px"
          header={
            details && (
              <Stack spacing="16px" direction="row">
                <Typography color="#162031" fontSize="15px" fontWeight={700}>
                  NGN {stringToCurrency(details?.settlement_amount)}
                </Typography>
                <Chip
                  label={details?.status?.replaceAll("-", " ")}
                  className={`chip border ${details?.status
                    ?.toLowerCase()
                    ?.replaceAll(" ", "-")}`}
                />
              </Stack>
            )
          }
        >
          <Grid container flex={1} minWidth="100%">
            <Grid item xs={3}>
              <Detail
                title="DATE PAID"
                value={moment(details?.settlement_date).format("D MMM, YYYY")}
                variant="copy"
              />
            </Grid>
            <Grid item xs={3}>
              <Detail
                title="Date Due"
                value={moment(details?.due_date).format("D MMM, YYYY")}
                variant="copy"
              />
            </Grid>
            <Grid item xs={3}>
              <Detail
                title="Withheld Amount"
                value={`NGN ${stringToCurrency(details?.withheld_amount)}`}
                variant="copy"
              />
            </Grid>
          </Grid>
        </OnlyHeader>
        <Box mt="24px">
          <ProductDetailsTable />
        </Box>
      </Box>
    </Dashboard>
  );
}
