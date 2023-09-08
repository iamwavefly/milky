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
