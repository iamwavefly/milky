import React from "react";
import Onboarding from "@/layout/index";
import { Box, Divider, Stack, Typography } from "@mui/material";
import ProductCart from "@/components/productCart";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";
import Checkout from "@/components/checkout";
import Router from "next/router";
import EmptyState from "@/components/emptyState";

export default function cart() {
  const cart = useSelector((state: AppState) => state.cart.products);

  const homeRoute = () => Router.push("/");

  return (
    <Onboarding title="Cart">
      {!cart.length ? (
        <EmptyState />
      ) : (
        <Stack direction="row" mt="86px" mb="120px" gap="50px">
          {/* products */}
          <Box flex={1}>
            {/* back arrow */}
            <Stack
              direction="row"
              sx={{ cursor: "pointer" }}
              onClick={homeRoute}
            >
              <Typography fontSize="20px" fontWeight={500}>
                &lt; Continue Shopping
              </Typography>
            </Stack>
            <Divider sx={{ mt: "26px" }} />
            {/* title */}
            <Typography mt="21px" fontSize="33px" fontWeight={500}>
              Cart
            </Typography>
            <Typography mt="2px" fontSize="17" color="#949494">
              You have {cart.length} items in your cart
            </Typography>
            <Stack mt="55px" gap="30px">
              {cart?.map((product) => (
                <ProductCart {...product} key={product.id} />
              ))}
            </Stack>
          </Box>
          {/* checkout form */}
          <Box>
            <Checkout />
          </Box>
        </Stack>
      )}
    </Onboarding>
  );
}
