import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import Styles from "@/styles/order.module.scss";
import Image from "next/image";
import { ProductTypes } from "@/types";
import Router from "next/router";
import CartUpdateQuantity from "./elements/cartUpdateQuantity";
import BinIcon from "@/public/icons/bin.svg";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/store/cartSlice";
import toast from "react-hot-toast";
import stringToCurrency from "@/utils/currency";

export default function ProductOrder({ ...product }: ProductTypes) {
  return (
    <Stack direction="row" className={Styles.prodContainer}>
      <Stack direction="row" alignItems="center">
        {/* product thumbnail */}
        <Box className={Styles.thumbnail}>
          <Image
            src={require(`@/public/images/product${product?.id}.png`)}
            alt={product?.name}
            height={83}
            width={83}
          />
        </Box>
        {/* product title */}
        <Typography variant="subtitle2" ml="14px">
          {product?.name}
        </Typography>
      </Stack>
      {/* amount, add to cart btn */}
      <Typography variant="subtitle2" fontWeight={600}>
        N{stringToCurrency(product?.amount)}
      </Typography>
    </Stack>
  );
}
