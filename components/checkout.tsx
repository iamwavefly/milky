import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import PadlockIcon from "@/public/icons/padlock.svg";
import Styles from "@/styles/checkout.module.scss";
import Router from "next/router";
import { useFormik } from "formik";
import { checkoutSchema } from "@/schema";
import { useDispatch, useSelector } from "react-redux";
import { addToOrder } from "@/store/orderSlice";
import { AppState } from "@/store/store";
import { calculateTotal } from "@/utils/calculator";
import stringToCurrency from "@/utils/currency";
import { clearCart } from "@/store/cartSlice";

export default function Checkout() {
  const cart = useSelector((state: AppState) => state.cart.products);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      state: "",
      city: "",
      additionalInfo: "",
      coupon: "",
    },
    validationSchema: checkoutSchema,
    onSubmit: (data) => {
      dispatch(addToOrder({ customer: data, products: cart }));
      dispatch(clearCart());
      Router.push("/order/complete");
    },
  });

  const totalAmount = stringToCurrency(calculateTotal(cart));

  return (
    <Box className={Styles.container}>
      <Typography fontSize="30px" fontWeight={600}>
        Checkout
      </Typography>
      <Typography mt="4px" variant="subtitle2" fontWeight={500} color="#949494">
        Complete your purchase by filling the information below
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack gap="22px" mt="40px">
          <Stack direction="row" gap="22px" flex={1}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Stack>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            label="Phone"
            variant="outlined"
            placeholder="+2348068125905"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          {/* title */}
          <Typography variant="h3" fontWeight={500}>
            Shipping Address
          </Typography>
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          <TextField
            fullWidth
            label="Country"
            variant="outlined"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
          />
          <Stack direction="row" gap="22px" flex={1}>
            <TextField
              fullWidth
              label="State"
              variant="outlined"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
            <TextField
              fullWidth
              label="City"
              variant="outlined"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Stack>
          <TextField
            fullWidth
            label="Additional Information"
            variant="outlined"
            multiline
            name="additionalInfo"
            value={formik.values.additionalInfo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.additionalInfo &&
              Boolean(formik.errors.additionalInfo)
            }
            helperText={
              formik.touched.additionalInfo && formik.errors.additionalInfo
            }
          />
          {/* coupon */}
          <Typography variant="h5">Coupon (Optional)</Typography>
          <TextField
            fullWidth
            variant="outlined"
            name="coupon"
            value={formik.values.coupon}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.coupon && Boolean(formik.errors.coupon)}
            helperText={formik.touched.coupon && formik.errors.coupon}
          />
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
        {/* pay btn */}
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: "50px" }}
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
        >
          Pay N{totalAmount}
        </Button>
        <Typography
          variant="h5"
          sx={{
            mt: "14px",
            textAlign: "center",
            color: "#A7A7A7",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <PadlockIcon /> Payments are secure and encrypted
        </Typography>
      </form>
    </Box>
  );
}
