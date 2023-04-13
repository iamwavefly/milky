import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import BriefCaseIcon from "../../public/assets/icons/suitcase.svg";
import ArrowTopRight from "../../public/assets/icons/arrow-top-right.svg";
import stringToCurrency from "@/helper/formatCurrency";
interface props {}

export default function TransactionCard({
  title,
  value,
  money,
}: {
  title?: string;
  value?: number;
  money?: boolean;
}) {
  const [amount, cent] = stringToCurrency(value).replace("NGN", "")?.split(".");
  return (
    <Stack bgcolor="#FFFFFF" minHeight="160px" width="100%">
      <Stack
        alignItems="center"
        justifyContent="center"
        direction="row"
        minHeight="56px"
        borderBottom="1px solid #E9EBF2"
        spacing="8px"
      >
        <Box
          width="25px"
          height="25px"
          borderRadius={100}
          bgcolor="#D7D8F2"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <BriefCaseIcon />
        </Box>
        <Typography>{title}</Typography>
      </Stack>
      <Stack
        spacing="10px"
        alignItems="center"
        height="100%"
        justifyContent="center"
        my="auto"
      >
        <Stack direction="row" alignItems="center">
          <Typography
            marginRight="5px"
            color="#4A4E60"
            fontSize="20px"
            fontWeight={400}
          >
            {money ? "NGN" : ""}
          </Typography>
          <Typography color="#262B40" fontSize="20px" fontWeight={500}>
            {amount}
          </Typography>
          <Typography
            marginTop="5px"
            color="#262B40"
            fontSize="14px"
            fontWeight={500}
          >
            .{cent}
          </Typography>
        </Stack>
        <Stack direction="row" spacing="8px">
          <Typography color="#097122" fontSize="10px">
            <ArrowTopRight /> +6%
          </Typography>
          <Typography color="#92959F" fontSize="10px">
            from last week
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
