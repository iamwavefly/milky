import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import Styles from "@/styles/receipt.module.scss";
import Image from "next/image";
import { ProductReceiptTypes, ProductTypes } from "@/types";
import ArrowRightIcon from "@/public/icons/arrow-right.svg";

export default function ProductReceipt({
  name,
  image,
  subtitle,
  onClick,
  active,
}: ProductReceiptTypes) {
  return (
    <Stack
      direction="row"
      className={`${Styles.prodContainer} ${active ? Styles.active : ""}`}
      onClick={onClick}
    >
      <Stack direction="row" alignItems="center">
        {/* product thumbnail */}
        <Box className={Styles.thumbnail}>
          {image && (
            <Image
              src={require(`@/public/images${image}.png`)}
              alt={name ?? "Product"}
              height={83}
              width={83}
            />
          )}
        </Box>
        {/* product title */}
        <Stack ml="15px">
          <Typography variant="subtitle2">{name}</Typography>
          <Typography fontSize="13px" color="#9A9A9A" lineHeight="140%">
            {subtitle}
          </Typography>
        </Stack>
      </Stack>
      <IconButton>
        <ArrowRightIcon />
      </IconButton>
    </Stack>
  );
}
