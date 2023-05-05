import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import ArrowDropLeftLineIcon from "remixicon-react/ArrowUpSFillIcon";
import LineChart from "./charts/lineChart";
import stringToCurrency from "../helper/formatCurrency";

interface Props {
  title: string;
  value: number;
  change: number;
  themeColor?: string;
  withCurrency?: boolean;
}

export default function CountChart({
  title,
  value,
  change,
  themeColor,
  withCurrency,
}: Props) {
  const amount = stringToCurrency(value)?.split(".");

  return (
    <Stack direction="row" width="100%" height="52px" gap="22px">
      <Stack spacing="4px" width="100%" maxWidth="171px">
        <Typography color="#4A4E60" fontSize="10px">
          {title}
        </Typography>
        <Stack direction="row" spacing="2px" alignItems="center">
          <Typography color="#262B40" fontSize="24px" fontWeight={500}>
            {withCurrency ? (
              <Stack direction="row" alignItems="flex-end">
                <Typography component="span" fontSize="14px" color="#4A4E60">
                  NGN
                </Typography>
                <Typography
                  component="span"
                  fontSize="24px"
                  lineHeight={"26px"}
                >
                  {amount[0]}
                </Typography>
                <Typography component="span" fontSize="14px" color="#4A4E60">
                  .{amount[1]}
                </Typography>
              </Stack>
            ) : (
              value
            )}
          </Typography>
          <Stack direction="row" alignItems="center">
            <ArrowDropLeftLineIcon color={themeColor ?? "#097122"} size={16} />
            <Typography
              color={themeColor ?? "#097122"}
              fontSize="10px"
              lineHeight="16px"
            >
              +{change}%
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row" width="100%">
        <LineChart themeColor={themeColor} />
      </Stack>
    </Stack>
  );
}
