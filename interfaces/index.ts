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
