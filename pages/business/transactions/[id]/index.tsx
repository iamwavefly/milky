// @ts-nocheck
import { useEffect, useState } from "react";
import OnlyHeader from "@/components/cards/onlyHeader";
import Detail from "@/components/detail";
import Breadcrumb from "@/components/headers/breadcrumb";
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

export default function Index() {
  const [details, setDetails] = useState({});

  const { asPath } = useRouter();
  const id = +asPath.split("/").slice(-1)[0];
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/fetch/orders?OrderReference=${id}`,
    "get"
  );

  useEffect(() => {
    typeof id === "number" && isNaN(id) === false && handleSubmit();
  }, [asPath, id]);

  useEffect(() => {
    setDetails(data?.items?.[0]);
  }, [data]);

  return (
    <Dashboard title="Merchants">
      <Box py="35px" px="30px">
        <Typography color="#2E3192" fontSize="16px">
          Transaction Details
        </Typography>
        {/* order information  */}
        <Box mt="35px">
          <OnlyHeader alignHeader="left" header="Order Details" size="12px">
            <Box my="auto">
              <Stack
                direction="row"
                flexWrap="wrap"
                columnGap="106px"
                rowGap="36px"
              >
                <Detail
                  title={"ORDER REFERENCE"}
                  variant={"copy"}
                  value={details?.order_reference}
                />
                <Detail
                  title={"PAYMENT REFERENCE"}
                  variant={"copy"}
                  value={details?.payment_reference}
                />
                <Detail
                  title={"PAYMENT RESPONSE CODE"}
                  variant={"copy"}
                  value={details?.payment_response_code}
                />
                <Detail
                  title={"PAYMENT RESPONSE MESSAGE"}
                  variant={"copy"}
                  value={
                    details?.payment_response_message !== ""
                      ? details?.payment_response_message
                      : "N/A"
                  }
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
                <Detail
                  title={"CUSTOMER PHONE NUMBER"}
                  variant={"copy"}
                  value={details?.customer_phone}
                />
                {/* <Detail
                  title={"CURRENCY"}
                  variant={"copy"}
                  value={details?.currency}
                /> */}
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
                  title={"PAYMENT TYPE"}
                  variant={"copy"}
                  value={details?.payment_type}
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
                  title={"STATUS"}
                  variant={"copy"}
                  value={details?.order_status}
                />
                <Detail
                  title={"NARRATION"}
                  variant={"copy"}
                  value={details?.narration}
                />
                <Detail
                  title={"REMARKS"}
                  variant={"copy"}
                  value={details?.remarks}
                />
                <Detail
                  title={"FEE"}
                  variant={"copy"}
                  value={stringToCurrency(details?.fee)}
                />
                <Detail
                  title={"SUBSIDIARY FEE"}
                  variant={"copy"}
                  value={stringToCurrency(details?.subsidiary_fee)}
                />
                <Detail
                  title={"CUSTOMER FEE"}
                  variant={"copy"}
                  value={stringToCurrency(details?.customer_fee)}
                />
                <Detail
                  title={"WHO BEARS FEE?"}
                  variant={"copy"}
                  value={details?.who_bears_fee}
                />
                <Detail
                  title={"DATE CREATED"}
                  variant={"copy"}
                  value={moment(details?.date_created).format("L")}
                />
                <Detail
                  title={"DATE UPDATED"}
                  variant={"copy"}
                  value={
                    details?.date_updated
                      ? moment(details?.date_updated).format("L")
                      : "N/A"
                  }
                />
                <Detail
                  title={"DATE PAYMENT CONFIRMED"}
                  variant={"copy"}
                  value={
                    details?.date_payment_confirmed
                      ? moment(details?.date_payment_confirmed).format("L")
                      : "N/A"
                  }
                />
              </Stack>
            </Box>
          </OnlyHeader>
        </Box>
      </Box>
    </Dashboard>
  );
}
