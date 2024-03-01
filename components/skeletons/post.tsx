import { Skeleton, Stack } from "@mui/material";
import React from "react";

export default function PostSkeleton() {
  return (
    <Stack>
      <Skeleton
        variant="rectangular"
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
    </Stack>
  );
}
