import { logoutHandler, logoutWTokenHandler } from "@/middleware/auth";
// icons
import GetStartedIcon from "@/public/icons/briefcase.svg";
import HomeIcon from "@/public/icons/home.svg";
import BusinessIcon from "@/public/icons/shop.svg";
import AccountIcon from "@/public/icons/user.svg";
import MoneyBoxIcon from "@/public/icons/card.svg";
import BankCardIcon from "@/public/icons/payout.svg";
import NewspaperIcon from "@/public/icons/refund.svg";
import ArrowLeftRightIcon from "@/public/icons/chargeback.svg";
import SettingIcon from "@/public/icons/setting.svg";
import LogoutIcon from "@/public/icons/signout.svg";

const routes = {
  login: "/",
};

export const dashboard = [
  {
    id: 1,
    name: "Get Started",
    link: "/onboarding/setup",
    Icon: GetStartedIcon,
  },
  {
    id: 2,
    name: "Home",
    Icon: HomeIcon,
    link: "/dashboard",
    header: true,
    nest: [
      {
        key: 1,
        name: "Dashboard",
        link: "/dashboard",
      },
    ],
  },
  {
    id: 3,
    name: "Business",
    Icon: BusinessIcon,
    link: "/business/transactions",
    header: true,
    nest: [
      {
        key: 1,
        name: "Transactions",
        link: "/business/transactions",
      },
      {
        key: 2,
        name: "Invoice",
        link: "/business/invoice",
      },
      {
        key: 3,
        name: "Customers",
        link: "/business/customers",
      },
      {
        key: 4,
        name: "Products",
        link: "/business/products",
      },
      {
        key: 5,
        name: "Payment Links",
        link: "/business/payment-links",
      },
    ],
  },
  {
    id: 4,
    name: "Account",
    Icon: AccountIcon,
    link: "/account/virtual",
    header: true,
    nest: [
      {
        key: 1,
        name: "Virtual Account",
        link: "/account/virtual",
      },
      {
        key: 2,
        name: "Settlements",
        link: "/account/settlements",
      },
    ],
  },
  {
    id: 5,
    name: "Balance",
    Icon: MoneyBoxIcon,
    link: "/balance/main",
    header: true,
    nest: [
      {
        key: 1,
        name: "Balance",
        link: "/balance/main",
      },
      {
        key: 2,
        name: "Balance History",
        link: "/balance/history",
      },
      {
        key: 3,
        name: "Rolling Reserve History",
        link: "/balance/reserve",
      },
    ],
  },
  {
    id: 6,
    name: "Payouts",
    Icon: BankCardIcon,
    link: "/payouts/transfers",
    header: true,
    nest: [
      {
        key: 1,
        name: "Transfers",
        link: "/payouts/transfers",
      },
      {
        key: 2,
        name: "Pending Approval",
        link: "/payouts/pending-approval",
      },
      {
        key: 3,
        name: "Beneficiaries",
        link: "/payouts/beneficiaries",
      },
      {
        key: 4,
        name: "Funding History",
        link: "/payouts/funding-history",
      },
    ],
  },
  {
    id: 7,
    name: "Refunds",
    link: "/refunds",
    Icon: NewspaperIcon,
  },
  {
    id: 8,
    name: "Chargeback",
    Icon: ArrowLeftRightIcon,
    link: "/chargeback/all",
    header: true,
    nest: [
      {
        key: 1,
        name: "All chargebacks",
        link: "/chargeback/all",
      },
      {
        key: 2,
        name: "Pending",
        link: "/chargeback/pending",
      },
      {
        key: 3,
        name: "Awaiting response",
        link: "/chargeback/awaiting-response",
      },
      {
        key: 4,
        name: "Won",
        link: "/chargeback/won",
      },
      {
        key: 5,
        name: "Lost",
        link: "/chargeback/lost",
      },
      {
        key: 6,
        name: "Assessment",
        link: "/chargeback/assessment",
      },
    ],
  },
  {
    id: 9,
    name: "Settings",
    Icon: SettingIcon,
    link: "/settings/business",
    header: true,
    nest: [
      {
        key: 1,
        name: "Business",
        link: "/settings/business",
      },
      {
        key: 2,
        name: "Payout Accounts",
        link: "/settings/payout-accounts",
      },
      {
        key: 3,
        name: "Roles & Permissions",
        link: "/settings/roles-permissions",
      },
      {
        key: 4,
        name: "Users & Subsidiaries",
        link: "/settings/users-subsidiaries",
      },
      {
        key: 5,
        name: "Preferences",
        link: "/settings/preferences",
      },
      {
        key: 6,
        name: "Audit Trails",
        link: "/settings/audit-trails",
      },
      {
        key: 7,
        name: "API Keys & Webhooks",
        link: "/settings/api-keys-webhooks",
      },
    ],
  },
  {
    id: 10,
    name: "Sign Out",
    link: "/sign-out",
    func: logoutWTokenHandler,
    Icon: LogoutIcon,
  },
];

export default routes;
