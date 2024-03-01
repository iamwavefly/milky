import { ProductsTypes } from "@/types";
import { _products } from "@/mocks";
import { Grid } from "@mui/material";
import React from "react";
import Product from "./product";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";

export default function Products({ limit, ...others }: ProductsTypes) {
  const searchQuery = useSelector((state: AppState) => state.cart.searchQuery);

  const filteredProducts = _products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Grid container {...others} spacing="18px">
      {filteredProducts?.slice(0, limit)?.map((product) => (
        <Grid item key={product?.id} md={3}>
          <Product {...product} />
        </Grid>
      ))}
    </Grid>
  );
}
