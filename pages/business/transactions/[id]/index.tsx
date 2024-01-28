// @ts-nocheck
import { useEffect, useState } from "react";
import OnlyHeader from "@/components/cards/onlyHeader";
import Detail from "@/components/detail";
import BackArrow from "@/components/headers/BackArrow";
import { merchants } from "@/configs/labels";
import Dashboard from "@/layouts/dashboard";
import { Box, Checkbox, Divider, Grid, Stack, Typography } from "@mui/material";
import WarningIcon from "../../../../public/icons/warning.svg";
import EmptyDataImg from "../../../../public/images/empty.svg";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { useRouter } from "next/router";
import isObjEmpty from "@/helper/isObjEmpty";
import stringToCurrency from "../../../../helper/formatCurrency";
import moment from "moment";

const routes = [
  { label: "Transactions", link: "/business/transactions/" },
  { label: "Transaction details" },
];

export default function Index() {
  const [details, setDetails] = useState({});

  const { asPath } = useRouter();
  const id = asPath.split("/").slice(-1)[0];
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/fetch/orders?OrderReference=${id}`,
    "get"
  );

  useEffect(() => {
    id && handleSubmit();
  }, [asPath, id]);

  useEffect(() => {
    setDetails(data?.items?.[0]);
  }, [data]);

  return (
    <Dashboard title="Merchants" breadcrumbLinks={routes}>
      <BackArrow title="Transaction Details" />
      {/* order information  */}
      <Box>
        <OnlyHeader alignHeader="left" header="Order Details" size="12px">
          <Box my="auto" width="100%" flex={1}>
            <Grid container spacing="32px" flex={1}>
              <Grid item md={3}>
                <Detail
                  title={"ORDER REFERENCE"}
                  maxLen={25}
                  variant={"copy"}
                  value={details?.order_reference}
                />
              </Grid>
              <Grid item md={3}>
                <Detail
                  title={"PAYMENT REFERENCE"}
                  variant={"copy"}
                  value={details?.payment_reference}
                />
              </Grid>
              <Grid item md={3}>
                <Detail
                  title={"PAYMENT RESPONSE CODE"}
                  variant={"copy"}
                  value={details?.payment_response_code}
                />
              </Grid>
              <Grid item md={3}>
                <Detail
                  title={"PAYMENT RESPONSE MESSAGE"}
                  variant={"copy"}
                  value={
                    details?.payment_response_message !== ""
                      ? details?.payment_response_message
                      : "N/A"
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </OnlyHeader>
      </Box>
      {/* Personal information  */}
      <Box mt="15px">
        <OnlyHeader alignHeader="left" header="Customer Details" size="12px">
          <Box my="auto" width="100%">
            <Grid container spacing="32px">
              <Grid item md={3}>
                <Detail
                  title={"CUSTOMER NAME"}
                  variant={"copy"}
                  value={details?.customer_name}
                />
              </Grid>
              <Grid item md={3}>
                <Detail
                  title={"CUSTOMER EMAIL"}
                  variant={"copy"}
                  value={details?.customer_email}
                />
              </Grid>
              <Grid item md={3}>
                <Detail
                  title={"CUSTOMER PHONE NUMBER"}
                  variant={"copy"}
                  value={details?.customer_phone}
                />
              </Grid>
              <Grid item md={3}>
                <Detail title={"Country"} variant={"copy"} value={"N/A"} />
              </Grid>
            </Grid>
          </Box>
        </OnlyHeader>
      </Box>
      {/* Business registration  */}
      <Box mt="15px">
        <OnlyHeader alignHeader="left" header="Payment Details" size="12px">
          <Stack gap="24px" my="auto" flex={1}>
            <Grid container spacing="32px">
              <Grid item md={3}>
                <Detail
                  title={"PAYMENT TYPE"}
                  variant={"copy"}
                  value={details?.payment_type}
                />
              </Grid>
              <Grid item md={3}>
                <Detail
                  title={"CURRENCY"}
                  variant={"copy"}
                  value={details?.currency}
                />
              </Grid>
              <Grid item md={3}>
                <Detail
                  title={"AMOUNT"}
                  variant={"copy"}
                  value={`${details?.currency} ${stringToCurrency(
                    details?.amount
                  )}`}
                />
              </Grid>
              <Grid item md={3}>
                <Detail
                  title={"STATUS"}
                  variant={"status"}
                  value={details?.order_status}
                />
              </Grid>
            </Grid>
            <Divider />
            <Grid container spacing="32px">
              <Grid item md={3}>
                <Detail
                  title={"NARRATION"}
                  variant={"copy"}
                  value={details?.narration}
                />
              </Grid>
              <Grid item md={3}>
                <Detail
                  title={"REMARKS"}
                  variant={"copy"}
                  value={details?.remarks}
                />
              </Grid>
              <Grid item md={3}>
                <Detail
                  title={"FEE"}
                  variant={"copy"}
                  value={stringToCurrency(details?.fee)}
                />
              </Grid>
              <Grid item md={3}>
                <Detail
                  title={"SUBSIDIARY FEE"}
                  variant={"copy"}
                  value={stringToCurrency(details?.subsidiary_fee)}
                />
              </Grid>
            </Grid>
            <Divider />
            <Grid container spacing="32px">
              <Grid item md={3}>
                <Detail
                  title={"CUSTOMER FEE"}
                  variant={"copy"}
                  value={stringToCurrency(details?.customer_fee)}
                />
              </Grid>
              <Grid item md={3}>
                <Detail
                  title={"WHO BEARS FEE?"}
                  variant={"copy"}
                  value={details?.who_bears_fee}
                />
              </Grid>
              <Grid item md={3}>
                <Detail
                  title={"DATE CREATED"}
                  variant={"copy"}
                  value={moment(details?.date_created).format("L")}
                />
              </Grid>
              <Grid item md={3}>
                <Detail
                  title={"DATE UPDATED"}
                  variant={"copy"}
                  value={
                    details?.date_updated
                      ? moment(details?.date_updated).format("L")
                      : "N/A"
                  }
                />
              </Grid>
            </Grid>
            <Divider />
            <Grid container spacing="32px">
              <Grid item md={3}>
                <Detail
                  title={"DATE PAYMENT CONFIRMED"}
                  variant={"copy"}
                  value={
                    details?.date_payment_confirmed
                      ? moment(details?.date_payment_confirmed).format("L")
                      : "N/A"
                  }
                />
              </Grid>
            </Grid>
          </Stack>
        </OnlyHeader>
      </Box>
    </Dashboard>
  );
}
