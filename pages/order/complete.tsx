import React from "react";
import Onboarding from "@/layout/index";
import OrderReceipt from "@/components/order";
import { Box, Stack } from "@mui/material";

export default function complete() {
  return (
    <Onboarding>
      <Stack mt="82px" alignItems="center">
        <OrderReceipt />
      </Stack>
    </Onboarding>
  );
}
