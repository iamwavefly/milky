import React, { useEffect, useState } from "react";
import Onboarding from "@/layout/index";
import { Box, Divider, Stack, Typography } from "@mui/material";
import ProductCart from "@/components/productCart";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";
import Checkout from "@/components/checkout";
import Router from "next/router";
import EmptyState from "@/components/emptyState";
import ProductReceipt from "@/components/productReceipt";
import { OrderReceiptType } from "@/types";
import OrderReceipt from "@/components/order";

export default function cart() {
  const [selectedOrder, setSelectedOrder] = useState<
    undefined | OrderReceiptType
  >(undefined);
  const order = useSelector((state: AppState) => state.order.order);

  useEffect(() => {
    setSelectedOrder(order[order.length - 1]);
  }, [order]);

  return (
    <Onboarding title="Cart">
      {!order.length ? (
        <EmptyState order/>
      ) : (
        <Stack direction="row" mt="86px" mb="120px" gap="50px">
          {/* products */}
          <Box flex={1}>
            {/* title */}
            <Typography mt="21px" fontSize="33px" fontWeight={500}>
              My orders
            </Typography>
            <Typography mt="2px" fontSize="17" color="#949494">
              Input your email to view your order history
            </Typography>
            <Stack mt="55px" gap="24px">
              {order?.map((product: any) => (
                <ProductReceipt
                  key={product.id}
                  image={selectedOrder?.products?.[0]?.images?.[0]}
                  name={selectedOrder?.products?.[0]?.name}
                  subtitle={selectedOrder?.products?.[0]?.subtitle}
                  onClick={() => setSelectedOrder(product)}
                />
              ))}
            </Stack>
          </Box>
          {/* checkout form */}
          <Box>
            {selectedOrder && (
              <OrderReceipt
                id={selectedOrder?.id}
                customer={selectedOrder?.customer}
                products={selectedOrder?.products}
              />
            )}
          </Box>
        </Stack>
      )}
    </Onboarding>
  );
}
