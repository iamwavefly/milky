// @ts-nocheck
import { useEffect } from "react";
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

export default function Index() {
  const { asPath } = useRouter();
  const id = +asPath.split("/").slice(-1)[0];
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/fetch/orders?id=${id}`,
    "get"
  );

  const {
    business_information,
    bank_details,
    business_registration,
    personal_information,
    contact_information,
  } = data?.data ?? "";

  useEffect(() => {
    typeof id === "number" && isNaN(id) === false && handleSubmit();
  }, [asPath, id]);

  return (
    <Dashboard title="Merchants">
      <Box py="35px" px="30px">
        <Typography color="#2E3192" fontSize="16px">
          Transaction Details
        </Typography>
        {/* Contact information  */}
        <Box mt="35px">
          <OnlyHeader alignHeader="left" header="Order Details" size="12px">
            <Box my="auto" mx="auto">
              <Stack
                direction="row"
                flexWrap="wrap"
                columnGap="112px"
                rowGap="36px"
              >
                {contact_information && !isObjEmpty(contact_information) ? (
                  Object.entries(contact_information)?.map((newArr, index) => {
                    const [title, value] = newArr;
                    return (
                      value && (
                        <Detail
                          title={title}
                          key={index}
                          variant={"copy"}
                          value={value as string}
                        />
                      )
                    );
                  })
                ) : (
                  <>
                    <Box display="flex" justifyContent="center">
                      <EmptyDataImg />
                    </Box>
                  </>
                )}
              </Stack>
            </Box>
          </OnlyHeader>
        </Box>
        {/* Personal information  */}
        <Box mt="15px">
          <OnlyHeader alignHeader="left" header="Customer Details" size="12px">
            <Box my="auto" mx="auto">
              <Stack
                direction="row"
                flexWrap="wrap"
                columnGap="112px"
                rowGap="36px"
              >
                {personal_information && !isObjEmpty(personal_information) ? (
                  Object.entries(personal_information)?.map((newArr, index) => {
                    const [title, value] = newArr;
                    return (
                      value && (
                        <Detail
                          title={title}
                          key={index}
                          variant={"copy"}
                          value={value as string}
                        />
                      )
                    );
                  })
                ) : (
                  <Box display="flex" justifyContent="center">
                    <EmptyDataImg />
                  </Box>
                )}
              </Stack>
            </Box>
          </OnlyHeader>
        </Box>
        {/* Business registration  */}
        <Box mt="15px">
          <OnlyHeader alignHeader="left" header="Payment Details" size="12px">
            <Box my="auto" mx="auto">
              <Stack
                direction="row"
                flexWrap="wrap"
                columnGap="112px"
                rowGap="36px"
              >
                {business_registration && !isObjEmpty(business_registration) ? (
                  Object.entries(business_registration)?.map(
                    (newArr, index) => {
                      const [title, value] = newArr;
                      return (
                        value && (
                          <Detail
                            title={title}
                            key={index}
                            variant={"copy"}
                            value={value as string}
                          />
                        )
                      );
                    }
                  )
                ) : (
                  <Box display="flex" justifyContent="center">
                    <EmptyDataImg />
                  </Box>
                )}
              </Stack>
            </Box>
          </OnlyHeader>
        </Box>
      </Box>
    </Dashboard>
  );
}
