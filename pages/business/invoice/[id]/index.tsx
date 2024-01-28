// @ts-nocheck
import { useEffect, useState } from "react";
import OnlyHeader from "@/components/cards/onlyHeader";
import Detail from "@/components/detail";
import Breadcrumb from "@/components/headers/BackArrow";
import { merchants } from "@/configs/labels";
import Dashboard from "@/layouts/dashboard";
import {
  Box,
  Checkbox,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import WarningIcon from "../../../../public/icons/warning.svg";
import EmptyDataImg from "../../../../public/images/empty.svg";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { useRouter } from "next/router";
import isObjEmpty from "@/helper/isObjEmpty";
import stringToCurrency from "../../../../helper/formatCurrency";
import moment from "moment";
import substring from "@/helper/substring";
import BackArrow from "@/components/headers/BackArrow";
import truncate from "@/helper/truncate";

export default function Index() {
  const [details, setDetails] = useState({});

  const { asPath } = useRouter();
  const id = +asPath.split("/").slice(-1)[0];
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/invoice/all?InvoiceId=${id}`,
    "get"
  );

  useEffect(() => {
    typeof id === "number" && isNaN(id) === false && handleSubmit();
  }, [asPath, id]);

  useEffect(() => {
    setDetails(data?.items?.[0]);
  }, [data]);

  return (
    <Dashboard title="Invoice">
      <BackArrow title="Invoice Details" />
      <Box>
        {/* order information  */}
        <Box mt="35px">
          <OnlyHeader
            alignHeader="left"
            size="12px"
            header={
              details && (
                <Stack spacing="16px" direction="row">
                  <Typography color="#162031" fontSize="15px" fontWeight={700}>
                    {details?.title}
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
            <Box my="auto" flex={1}>
              <Stack gap="24px">
                <Grid container>
                  <Grid xs={3}>
                    <Detail
                      title={"INVOICE ID"}
                      variant={"copy"}
                      value={details?.id}
                    />
                  </Grid>
                  <Grid xs={3}>
                    <Detail
                      title={"COMPANY EMAIL"}
                      variant={"copy"}
                      value={details?.company_email}
                    />
                  </Grid>
                  <Grid xs={3}>
                    <Detail
                      title={"COMPANY NAME"}
                      variant={"copy"}
                      value={details?.company_name}
                    />
                  </Grid>
                  <Grid xs={3}>
                    <Detail
                      title={"DESCRIPTION"}
                      variant={"copy"}
                      maxLen={25}
                      value={
                        details?.description?.length
                          ? details?.description
                          : "N/A"
                      }
                    />
                  </Grid>
                </Grid>
                <Divider />
                <Grid container>
                  <Grid xs={3}>
                    <Detail
                      title={"CURRENCY"}
                      variant={"copy"}
                      value={details?.currency}
                    />
                  </Grid>
                  <Grid xs={3}>
                    <Detail
                      title={"AMOUNT"}
                      variant={"copy"}
                      value={`${details?.currency} ${stringToCurrency(
                        details?.amount
                      )}`}
                    />
                  </Grid>
                  <Grid xs={3}>
                    <Detail
                      title={"DISCOUNT"}
                      variant={"copy"}
                      value={`${details?.currency} ${stringToCurrency(
                        details?.discount
                      )}`}
                    />
                  </Grid>
                  <Grid xs={3}>
                    <Detail
                      title={"tax"}
                      variant={"copy"}
                      value={`${details?.currency} ${stringToCurrency(
                        details?.tax
                      )}`}
                    />
                  </Grid>
                </Grid>
                <Divider />
                <Grid container>
                  <Grid xs={3}>
                    <Detail
                      title={"PAYMENT URL"}
                      variant={"copy"}
                      maxLen={25}
                      value={
                        details?.payment_link ? details?.payment_link : "N/A"
                      }
                    />
                  </Grid>
                  <Grid xs={3}>
                    <Detail
                      title={"REFERENCE"}
                      variant={"copy"}
                      value={details?.reference}
                    />
                  </Grid>
                  <Grid xs={3}>
                    <Detail
                      title={"DATE CREATED"}
                      variant={"copy"}
                      value={moment(details?.date_created).format("L")}
                    />
                  </Grid>
                  <Grid xs={3}>
                    <Detail
                      title={"DUE DATE"}
                      variant={"copy"}
                      value={moment(details?.due_date).format("L")}
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          </OnlyHeader>
        </Box>
        {/* Personal information  */}
        <Box mt="15px">
          <OnlyHeader alignHeader="left" header="Customer Details" size="12px">
            <Box my="auto" flex={1}>
              <Grid container>
                <Grid xs={3}>
                  <Detail
                    title={"CUSTOMER NAME"}
                    variant={"copy"}
                    value={details?.customer_name}
                  />
                </Grid>
                <Grid xs={3}>
                  <Detail
                    title={"CUSTOMER EMAIL"}
                    variant={"copy"}
                    value={details?.customer_email}
                  />
                </Grid>
              </Grid>
            </Box>
          </OnlyHeader>
        </Box>
      </Box>
    </Dashboard>
  );
}
