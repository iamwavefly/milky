// @ts-nocheck
import { useEffect, useState } from "react";
import OnlyHeader from "@/components/cards/onlyHeader";
import Detail from "@/components/detail";
import Dashboard from "@/layouts/dashboard";
import {
  Box,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
  capitalize,
} from "@mui/material";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { useRouter } from "next/router";
import moment from "moment";
import CustomerDetailsTable from "@/components/business/customers/customerDetailsTable";
import BackArrow from "@/components/headers/BackArrow";
import { product, refund } from "@/utils/breadcrumbs";
import stringToCurrency from "@/helper/formatCurrency";

export default function Index() {
  const [details, setDetails] = useState({});

  const { asPath } = useRouter();
  const id = +asPath.split("/").slice(-1)[0];
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/refund/all?id=${id}`,
    "get"
  );

  useEffect(() => {
    typeof id === "number" && isNaN(id) === false && handleSubmit();
  }, [asPath, id]);

  useEffect(() => {
    const findRefundById = data?.items?.find((resp) => resp?.id === +id);
    setDetails(findRefundById);
  }, [data]);

  return (
    <Dashboard title="Refund details" breadcrumbLinks={refund}>
      <BackArrow title="Refund details" />
      {/* refund details  */}
      <Box>
        <OnlyHeader
          alignHeader="left"
          header={
            details && (
              <Stack spacing="16px" direction="row">
                <Typography color="#162031" fontSize="15px" fontWeight={700}>
                  {details?.currency} {stringToCurrency(details?.amount)}
                </Typography>
                {details?.refund_status && (
                  <Chip
                    label={details?.refund_status?.replaceAll("-", " ")}
                    className={`chip border ${details?.status
                      ?.toLowerCase()
                      ?.replaceAll(" ", "-")}`}
                  />
                )}
              </Stack>
            )
          }
          size="15px"
        >
          <Stack gap="24px" my="auto" flex={1}>
            <Grid container spacing="32px">
              <Grid item md={3}>
                <Detail
                  title={"balance after refund"}
                  variant={"copy"}
                  value={moment(details?.date_created).format("D MMM, YYYY")}
                />
              </Grid>
              <Grid item md={3}>
                <Detail
                  title={"Status"}
                  variant={"copy"}
                  value={`NGN ${stringToCurrency(details?.price)}`}
                />
              </Grid>
              <Grid item md={3}>
                <Detail
                  title={"DATE & TIME"}
                  variant={"copy"}
                  value={details?.stock}
                />
              </Grid>
              <Grid item md={3}>
                <Detail
                  title={"Reason for refund"}
                  variant={"copy"}
                  value={details?.id}
                />
              </Grid>
            </Grid>
            <Divider />
            <Grid container spacing="32px">
              <Grid item md={3}>
                <Detail
                  title={"discount"}
                  variant={"copy"}
                  value={`NGN ${stringToCurrency(details?.discount)}`}
                />
              </Grid>
              <Grid item md={3}>
                <Detail
                  title={"On deal"}
                  variant={"copy"}
                  value={details?.is_on_deal ? "Yes" : "No"}
                />
              </Grid>
              <Grid item md={3}>
                <Detail
                  title={"deal price"}
                  variant={"copy"}
                  value={`NGN ${stringToCurrency(details?.deal_price)}`}
                />
              </Grid>
              <Grid item md={3}>
                <Detail
                  title={"discount"}
                  variant={"copy"}
                  value={`NGN ${stringToCurrency(details?.discount)}`}
                />
              </Grid>
            </Grid>
          </Stack>
        </OnlyHeader>
        {/* delivery information */}
        <OnlyHeader
          alignHeader="left"
          header="Delivery Information"
          size="15px"
          mt="32px"
        >
          <Stack gap="24px" my="auto" flex={1}>
            <Grid container spacing="32px">
              <Grid item md={3}>
                <Detail
                  title={"Physical products"}
                  variant={"copy"}
                  value={details?.is_physical ? "Yes" : "No"}
                />
              </Grid>
              <Grid item md={3}>
                <Detail
                  title={"Requires delivery address"}
                  variant={"copy"}
                  value={details?.can_be_delivered ? "Yes" : "No"}
                />
              </Grid>
              <Grid item md={3}>
                <Detail
                  title={"Requires delivery note"}
                  variant={"copy"}
                  value={details?.is_delivery_note ? "Yes" : "No"}
                />
              </Grid>
            </Grid>
          </Stack>
        </OnlyHeader>
        {/* fees information */}
        {details?.fees?.length > 0 && (
          <OnlyHeader alignHeader="left" header="Fees" size="15px" mt="32px">
            <Stack gap="24px" my="auto" flex={1}>
              {details?.fees?.map(({ fee_name, id, amount }) => (
                <Grid container spacing="32px">
                  <Grid item md={3}>
                    <Detail
                      title={"Name"}
                      variant={"copy"}
                      value={fee_name?.length ? fee_name : "N/A"}
                    />
                  </Grid>

                  <Grid item md={3}>
                    <Detail
                      title={"Amount"}
                      variant={"copy"}
                      value={`NGN ${stringToCurrency(amount)}`}
                    />
                  </Grid>

                  <Grid item md={3}>
                    <Detail title={"ID"} variant={"copy"} value={id} />
                  </Grid>
                </Grid>
              ))}
            </Stack>
          </OnlyHeader>
        )}
      </Box>
    </Dashboard>
  );
}
