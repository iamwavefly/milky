import React from "react";
import Onboarding from "@/layout/index";
import OrderReceipt from "@/components/order";
import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { selectOrderState } from "@/store/orderSlice";
import { AppState } from "@/store/store";

export default function complete() {
  const order = useSelector((state: AppState) => state.order.order);
  const { customer, products, id } = order[order.length - 1] ?? {};
  return (
    <Onboarding>
      <Stack mt="82px" alignItems="center">
        {order?.length && (
          <OrderReceipt id={id} customer={customer} products={products} />
        )}
      </Stack>
    </Onboarding>
  );
}
