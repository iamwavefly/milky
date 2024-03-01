import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import Styles from "@/styles/order.module.scss";
import Logo from "@/public/icons/logo.png";
import Image from "next/image";
import moment from "moment";
import ProductOrder from "./productOrder";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";
import PrintIcon from "@/public/icons/printer.svg";
import CheckIcon from "@/public/icons/check.svg";
import stringToCurrency from "@/utils/currency";
import { calculateTotal } from "@/utils/calculator";
import { OrderReceiptType } from "@/types";

export default function OrderReceipt({
  customer,
  products,
  id,
}: OrderReceiptType) {
  const {
    additionalInfo,
    address,
    city,
    country,
    coupon,
    email,
    firstName,
    lastName,
    phone,
    state,
  } = customer;
  const totalAmount = stringToCurrency(calculateTotal(products));

  return (
    <Stack className={Styles.container}>
      {/* logo */}
      <Box className={Styles.logo}>
        <Image src={Logo} alt="milky logo" width={146} height={135} />
      </Box>
      {/* order number */}
      <Typography mx="auto" fontSize="30px" fontWeight={600} mt="13px">
        Order #{id}
      </Typography>
      {/* order status */}
      <Stack direction="row" gap="40px" mx="auto" mt="14px">
        <Stack direction="row" gap="6px">
          <Typography variant="subtitle1">Status:</Typography>
          <Stack direction="row" alignItems="center" gap="4px">
            <CheckIcon />
            <Typography variant="subtitle1" color="#AAAAAA">
              Paid
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" gap="6px">
          <Typography variant="subtitle1">Date:</Typography>
          <Typography variant="subtitle1" color="#AAAAAA">
            1-02-2024
          </Typography>
        </Stack>
      </Stack>
      {/* heading */}
      <Box className={Styles.heading} mt="32px">
        <Typography variant="subtitle1" component="h2">
          Order Summary
        </Typography>
      </Box>
      {/* cart items */}
      <Stack mt="28px" gap="22px">
        {products?.map((product) => (
          <ProductOrder {...product} key={product.id} />
        ))}
      </Stack>
      {/* details */}
      <Stack mt="44px" gap="8px">
        {/* Subtotal */}
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h3" fontWeight={500}>
            Subtotal
          </Typography>
          <Typography variant="h3" fontWeight={500}>
            N{totalAmount}
          </Typography>
        </Stack>
        {/* Shipping */}
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h3" fontWeight={500}>
            Shipping
          </Typography>
          <Typography variant="h3" fontWeight={500}>
            N0.00
          </Typography>
        </Stack>
        {/* Discount */}
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h3" fontWeight={500}>
            Discount
          </Typography>
          <Typography variant="h3" fontWeight={500}>
            N0.00
          </Typography>
        </Stack>
      </Stack>
      {/* total */}
      <Stack direction="row" justifyContent="space-between" mt="24px">
        <Typography fontSize="24px" fontWeight={600}>
          Total
        </Typography>
        <Typography fontSize="24px" fontWeight={600}>
          N{totalAmount}
        </Typography>
      </Stack>
      {/* heading */}
      <Box className={Styles.heading} mt="52px">
        <Typography variant="subtitle1" component="h2">
          Account Summary
        </Typography>
      </Box>
      <Stack gap="8px" mt="28px">
        {/* First Name */}
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h3" fontWeight={500}>
            First Name
          </Typography>
          <Typography variant="h3" fontWeight={500}>
            {firstName}
          </Typography>
        </Stack>
        {/* Last Name */}
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h3" fontWeight={500}>
            Last Name
          </Typography>
          <Typography variant="h3" fontWeight={500}>
            {lastName}
          </Typography>
        </Stack>
        {/* Email */}
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h3" fontWeight={500}>
            Email
          </Typography>
          <Typography variant="h3" fontWeight={500}>
            {email}
          </Typography>
        </Stack>
        {/* Phone */}
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h3" fontWeight={500}>
            Phone
          </Typography>
          <Typography variant="h3" fontWeight={500}>
            {phone}
          </Typography>
        </Stack>
        {/* Address */}
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h3" fontWeight={500}>
            Address
          </Typography>
          <Typography variant="h3" fontWeight={500}>
            {address}
          </Typography>
        </Stack>
      </Stack>
      {/* print */}
      <IconButton
        sx={{
          mt: "100px",
          textAlign: "center",
          color: "#A7A7A7",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "4px",
          padding: 0,
          width: "70px",
          mx: "auto",
        }}
      >
        <PrintIcon /> <Typography variant="h5">Print</Typography>
      </IconButton>
    </Stack>
  );
}
