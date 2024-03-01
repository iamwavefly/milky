import { Box, Button, Stack, Typography } from "@mui/material";
import React, { ButtonHTMLAttributes, EventHandler, MouseEvent } from "react";
import Styles from "@/styles/product.module.scss";
import Image from "next/image";
import { ProductTypes } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { AppState } from "@/store/store";
import toast from "react-hot-toast";
import Router from "next/router";
import AddToCart from "./elements/addToCart";
import stringToCurrency from "@/utils/currency";

export default function Product({ ...product }: ProductTypes) {
  const handleDetailView = () => {
    Router.push(`/product/${product?.id}`);
  };

  return (
    <Stack className={Styles.container} onClick={handleDetailView}>
      {/* product thumbnail */}
      <Image
        src={require(`@/public/images${product?.images?.[0]}.png`)}
        alt={product?.name}
        height={222}
      />
      {/* product title */}
      <Typography variant="h3" mt="18px">
        {product?.name}
      </Typography>
      <Typography variant="body2" mt="13px">
        {product?.subtitle}
      </Typography>
      {/* footer -> amount, add to cart btn */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt="36px"
      >
        <Typography variant="h3" fontWeight={500}>
          N{stringToCurrency(product?.amount)}
        </Typography>
        <AddToCart {...product} />
      </Stack>
    </Stack>
  );
}
