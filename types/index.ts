import { SwitchProps, GridProps, BoxProps, ButtonProps } from "@mui/material";

export type ProductsTypes = {
  limit?: number;
} & GridProps;

export type ProductTypes = {
  id: number;
  quantity?: number;
  name: string;
  subtitle: string;
  description: string;
  amount: number;
  category: string;
  images?: string[];
};

export type CheckoutTypes = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  state: string;
  city: string;
  additionalInfo: string;
  coupon: string;
};

export type AddToCartTypes = {
  width?: number;
  height?: number;
} & ProductTypes;
