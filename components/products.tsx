import { ProductsTypes } from "@/types";
import { _products } from "@/mocks";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Product from "./product";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";
import PostSkeleton from "./skeletons/post";

export default function Products({ limit, ...others }: ProductsTypes) {
  const [loading, setLoading] = useState(true);
  const searchQuery = useSelector((state: AppState) => state.cart.searchQuery);

  const filteredProducts = _products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Grid container {...others} spacing="18px">
      {filteredProducts?.slice(0, limit)?.map((product) => (
        <Grid item key={product?.id} md={3}>
          {loading ? <PostSkeleton /> : <Product {...product} />}
        </Grid>
      ))}
    </Grid>
  );
}
