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
import CustomerDetailsTable from "@/components/business/customers/customerDetailsTable";

export default function Index() {
  const [details, setDetails] = useState({});

  const { asPath } = useRouter();
  const id = +asPath.split("/").slice(-1)[0];
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/fetch/customers?id=${id}`,
    "get"
  );

  useEffect(() => {
    typeof id === "number" && isNaN(id) === false && handleSubmit();
  }, [asPath, id]);

  useEffect(() => {
    setDetails(data?.items?.[0]);
  }, [data]);

  return (
    <Dashboard title="Customer Details">
      <Box py="35px" px="30px">
        <Typography color="#2E3192" fontSize="16px">
          Customer Details
        </Typography>
        {/* customer details  */}
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
                  title={"CUSTOMER NAME"}
                  variant={"copy"}
                  value={details?.customer_name}
                />
                <Detail
                  title={"CUSTOMER EMAIL"}
                  variant={"copy"}
                  value={details?.email_address}
                />
                <Detail
                  title={"PHONE NUMBER"}
                  variant={"copy"}
                  value={details?.mobile_number}
                />
                <Detail
                  title={"COUNTRY"}
                  variant={"copy"}
                  value={details?.country_name}
                />
              </Stack>
            </Box>
          </OnlyHeader>
        </Box>
        {/* Customer transaction */}
        <Box>
          <CustomerDetailsTable />
        </Box>
      </Box>
    </Dashboard>
  );
}
