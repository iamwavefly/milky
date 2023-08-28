// @ts-nocheck
import { useEffect, useState } from "react";
import OnlyHeader from "@/components/cards/onlyHeader";
import Detail from "@/components/detail";
import Breadcrumb from "@/components/headers/BackArrow";
import { merchants } from "@/configs/labels";
import Dashboard from "@/layouts/dashboard";
import { Box, Checkbox, Grid, Stack, Typography } from "@mui/material";
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
          <OnlyHeader alignHeader="left" size="12px">
            <Box my="auto">
              <Stack
                direction="row"
                flexWrap="wrap"
                columnGap="106px"
                rowGap="36px"
              >
                <Detail
                  title={"INVOICE ID"}
                  variant={"copy"}
                  value={details?.id}
                />
                <Detail
                  title={"COMPANY EMAIL"}
                  variant={"copy"}
                  value={details?.company_email}
                />
                <Detail
                  title={"COMPANY NAME"}
                  variant={"copy"}
                  value={details?.company_name}
                />
                <Detail
                  title={"DESCRIPTION"}
                  variant={"copy"}
                  value={details?.description}
                />
                <Detail
                  title={"AMOUNT"}
                  variant={"copy"}
                  value={`NGN${stringToCurrency(details?.amount)}`}
                />
                <Detail
                  title={"DISCOUNT"}
                  variant={"copy"}
                  value={`NGN${stringToCurrency(details?.discount)}`}
                />
                <Detail
                  title={"DATE CREATED"}
                  variant={"copy"}
                  value={moment(details?.date_created).format("L")}
                />
                <Detail
                  title={"STATUS"}
                  variant={"status"}
                  value={details?.status}
                />
              </Stack>
            </Box>
          </OnlyHeader>
        </Box>
        {/* Personal information  */}
        <Box mt="15px">
          <OnlyHeader alignHeader="left" header="Customer Details" size="12px">
            <Box my="auto">
              <Stack
                direction="row"
                flexWrap="wrap"
                columnGap="112px"
                rowGap="36px"
              >
                <Detail
                  title={"CUSTOMER NAME"}
                  variant={"copy"}
                  value={details?.customer_name}
                />
                <Detail
                  title={"CUSTOMER EMAIL"}
                  variant={"copy"}
                  value={details?.customer_email}
                />
              </Stack>
            </Box>
          </OnlyHeader>
        </Box>
        {/* Business registration  */}
        <Box mt="15px">
          <OnlyHeader alignHeader="left" header="Payment Details" size="12px">
            <Box my="auto">
              <Stack
                direction="row"
                flexWrap="wrap"
                columnGap="112px"
                rowGap="36px"
              >
                <Detail
                  title={"REFERENCE"}
                  variant={"copy"}
                  value={details?.reference}
                />
                <Detail
                  title={"CURRENCY"}
                  variant={"copy"}
                  value={details?.currency}
                />
                <Detail
                  title={"AMOUNT"}
                  variant={"copy"}
                  value={`${details?.currency} ${stringToCurrency(
                    details?.amount
                  )}`}
                />
                <Detail
                  title={"PAYMENT URL"}
                  variant={"copy"}
                  value={details?.payment_url ? details?.payment_url : "N/A"}
                />
              </Stack>
            </Box>
          </OnlyHeader>
        </Box>
      </Box>
    </Dashboard>
  );
}
