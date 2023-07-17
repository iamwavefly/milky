import OnlyHeader from "@/components/cards/onlyHeader";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { merchant } from "@/mocks/cards";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../header";

export default function TransferFeesTable() {
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/pricing/payout`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <Box mt="36px">
      <Header
        url="/dashboard/pricing/payout"
        entries={`${data?.data?.page.total ?? 0} Entries`}
        buttons={<Button variant="contained">Add a new fee</Button>}
      />
      <OnlyHeader
        alignHeader="left"
        maxWidth="489px"
        mx="auto"
        mt="24px"
        header={
          <Stack
            spacing="62px"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight={500} fontSize={"14px"}>
              Transaction details
            </Typography>
            <Typography fontWeight={500} fontSize={"14px"}>
              Fees
            </Typography>
          </Stack>
        }
        size="12px"
      >
        <Stack direction="column" width="100%">
          {data?.data?.items?.map(({ id, currency, fee }: any) => (
            <Stack
              key={id}
              direction="row"
              alignItems="center"
              width="100%"
              height="54px"
              borderBottom="0.5px solid #E4E8F2"
            >
              <Typography width="45%" fontSize="14px" color="#262B40">
                {currency}
              </Typography>
              <Typography fontSize="14px" color="rgba(38, 43, 64, 0.8)">
                {fee}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </OnlyHeader>
    </Box>
  );
}
