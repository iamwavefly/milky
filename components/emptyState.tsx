import { Box, Stack, Typography } from "@mui/material";
import React from "react";

export default function EmptyState({ order }: { order?: boolean }) {
  return (
    <Stack maxWidth="600px" mt="120px" mx="auto" textAlign="center">
      <Typography variant="h3">
        {order ? "No New Order" : "Your Cart is Empty"}
      </Typography>
      {!order && (
        <Typography variant="h5" mt="8px" color="#838383">
          It seems like your cart is currently empty. Start adding items to your
          cart by browsing our products.
        </Typography>
      )}
    </Stack>
  );
}
