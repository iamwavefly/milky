import { addToCart } from "@/store/cartSlice";
import { AppState } from "@/store/store";
import { AddToCartTypes, ProductTypes } from "@/types";
import { Button } from "@mui/material";
import React, { MouseEvent } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function AddToCart({
  width,
  height,
  ...product
}: AddToCartTypes) {
  const dispatch = useDispatch();

  const cart = useSelector((state: AppState) => state.cart.products);
  const isItemInCart = cart.some((item) => item.id === product?.id);

  const handleAddToCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (product?.id) {
      const { id, name, description, amount, category, images, subtitle } =
        product;
      // Dispatch action to add product to the cart
      dispatch(
        addToCart({
          id,
          quantity: 1,
          name,
          description,
          amount,
          category,
          images,
          subtitle,
        })
      );
      toast.success(`Item ${isItemInCart ? "Updated in" : "Added to"} cart`);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      variant="contained"
      sx={{ width, height }}
    >
      {isItemInCart ? "Update Cart" : "Add to Cart"}
    </Button>
  );
}
