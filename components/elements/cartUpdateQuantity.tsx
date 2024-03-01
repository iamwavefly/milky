import { addToCart, updateQuantity } from "@/store/cartSlice";
import { AppState } from "@/store/store";
import { AddToCartTypes, ProductTypes } from "@/types";
import {
  Box,
  Button,
  Icon,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { MouseEvent } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Styles from "@/styles/cart.module.scss";

export default function CartUpdateQuantity({ ...product }: ProductTypes) {
  const dispatch = useDispatch();

  const cart = useSelector((state: AppState) => state.cart.products);
  const selectedProd = cart.find((item) => item.id === product?.id);

  const handleAddToCart = (type: "increase" | "decrease") => {
    if (selectedProd?.quantity) {
      const { id } = product;
      // Dispatch action to update product quantity to the cart
      dispatch(
        updateQuantity({
          id,
          quantity:
            type === "increase"
              ? selectedProd?.quantity + 1
              : selectedProd?.quantity - 1,
        })
      );
      // toast.success(`Item ${selectedProd ? "Updated in" : "Added to"} cart`);
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      className={Styles.cartUpdateContainer}
    >
      {/* increase product quantity */}
      <IconButton onClick={() => handleAddToCart("increase")}>+</IconButton>
      {/* product quantity */}
      <Box className={Styles.quantityBox}>
        <Typography color="#888888" fontSize="18px" fontWeight={500}>
          {selectedProd?.quantity ?? 0}
        </Typography>
      </Box>
      {/* decrease product quantity */}
      <IconButton
        disabled={(selectedProd?.quantity ?? 0) <= 1}
        onClick={() => handleAddToCart("decrease")}
      >
        -
      </IconButton>
    </Stack>
  );
}
