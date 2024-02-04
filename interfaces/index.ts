import { SwitchProps } from "@mui/material";
export interface Card {
  id: string | number;
  title?: string | number;
  subtitle?: string | number;
  member?: string | number;
  settlement?: string | number;
  btn_name?: string | number;
}
export interface HeaderTab {
  id: number;
  name: string;
  link?: string;
}

export interface MenuProps {
  name: string;
  id: number;
  short_name?: string;
  allowed?: string;
  descriptions?: string;
}

export interface stakeholderProps {
  first_name: string;
  last_name: string;
  gender: string;
  mobile_number: string;
  date_of_birth: string;
  bvn: string;
  id: number;
}

export interface walletProps {
  currency_name: string;
  currency_short_name: string;
  available_balance: number;
  available_balance_change: number;
  wallet_id: number;
  total_transfer: number;
  successful_transfer: number;
}

export interface UserProps {
  user_id: number;
  first_name: string;
  last_name: string;
  mobile_number: string;
  role: string;
  status: string;
}

export interface ResultProps {
  items: [];
  total_items: number;
  total_pages: number;
}
export interface ResultPageProps {
  items: [];
  page: {
    total: number;
    total_page: number;
  };
}

export interface Product {
  availability: string;
  can_be_delivered: boolean;
  date_created: string;
  description: string;
  discount: number;
  id: number;
  image: string;
  is_delivery_note: boolean;
  is_on_deal: boolean;
  is_physical: boolean;
  name: string;
  payment_link: string;
  price: number;
  status: string;
  stock: number;
  summary: string;
  total_amount: number;
  total_orders: number;
}

export interface ItemsProps {
  item: string;
  id: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface CurrencyProps {
  id: number;
  is_allowed: boolean;
  name: string;
  short_name: string;
  symbol: string;
}
export interface WalletProps {
  account_details: {
    account_name: string;
    account_number: string;
    bank_code: string;
    bank_name: string;
  };
  available_balance: number;
  available_balance_change: number;
  currency_name: string;
  currency_short_name: string;
  ledger_balance: number;
  ledger_balance_change: number;
  overdraft_limit: number;
  successful_transfer: number;
  total_transfer: number;
  wallet_id: number;
  wallet_restriction: string;
  wallet_type: string;
}

export type InvoiceTypes = {
  id?: number;
  subsidiary_id: number;
  amount: number;
  company_email: string;
  company_name: string;
  currency: string;
  customer_email: string;
  customer_name: string;
  date_created: string;
  description: string;
  discount: number;
  due_date: string;
  logo: string;
  payment_link: string;
  reference: string;
  status: string;
  tax: number;
  title: string;
  bank_name: string;
  payment_reference: string;
  payment_type: string;
  card_type: string;
  card_number: string;
  ip_address: string;
  fee: string;
  invoice_items: [
    {
      item: string;
      amount: number;
      quantity: number;
    }
  ];
};

export type ArcaSwitchProps = {} & SwitchProps;
