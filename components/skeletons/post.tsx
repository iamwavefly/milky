import { Skeleton, Stack } from "@mui/material";
import React from "react";
import Styles from "@/styles/product.module.scss";

export default function PostSkeleton() {
  return (
    <Stack
      className={Styles.container}
      border="1px solid rgba(0,0,0,0.03) !important"
      pt="44px"
      alignItems="center"
    >
      <Skeleton
        variant="rounded"
        width={160}
        height={200}
        sx={{ mx: "auto" }}
      />
      <Skeleton
        variant="rectangular"
        width={197}
        height={26}
        sx={{ mt: "18px" }}
      />
      <Skeleton
        variant="rectangular"
        width={205}
        height={40}
        sx={{ mt: "13px" }}
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt="36px"
        width="100%"
      >
        <Skeleton variant="rectangular" width={90} height={26} />
        <Skeleton variant="rounded" width={126} height={37} />
      </Stack>
    </Stack>
  );
}
