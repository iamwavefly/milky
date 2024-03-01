import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import Styles from "@/styles/cart.module.scss";
import Image from "next/image";
import { ProductTypes } from "@/types";
import Router from "next/router";
import CartUpdateQuantity from "./elements/cartUpdateQuantity";
import BinIcon from "@/public/icons/bin.svg";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/store/cartSlice";
import toast from "react-hot-toast";
import stringToCurrency from "@/utils/currency";

export default function ProductCart({ ...product }: ProductTypes) {
  const dispatch = useDispatch();

  const removeProduct = () => {
    dispatch(
      removeFromCart({
        id: product?.id,
      })
    );
    toast.success(`Item removed cart`);
  };

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
      <CartUpdateQuantity {...product} />
      {/* amount, add to cart btn */}
      <Stack direction="row" alignItems="center" gap="32px">
        <Typography variant="subtitle2" fontWeight={600}>
          N{stringToCurrency(product?.amount * (product?.quantity ?? 0))}
        </Typography>
        <IconButton onClick={removeProduct}>
          <BinIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}
