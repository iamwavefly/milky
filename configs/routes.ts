import { logoutHandler } from "@/middleware/auth";
// icons
import RestartIcon from "remixicon-react/RestartLineIcon";
import HomeIcon from "remixicon-react/Home4LineIcon";
import BriefcaseIcon from "remixicon-react/Briefcase3LineIcon";
import FIleCopyIcon from "remixicon-react/FileCopy2LineIcon";
import MoneyBoxIcon from "remixicon-react/MoneyDollarBoxLineIcon";
import BankCardIcon from "remixicon-react/BankCardLineIcon";
import NewspaperIcon from "remixicon-react/NewspaperLineIcon";
import ArrowLeftRightIcon from "remixicon-react/ArrowLeftRightLineIcon";
import SettingIcon from "remixicon-react/Settings2LineIcon";
import LogoutIcon from "remixicon-react/LogoutBoxLineIcon";

const routes = [
  {
    id: 1,
    name: "Get Started",
    link: "/onboarding",
    Icon: RestartIcon,
  },
  {
    id: 2,
    name: "Home",
    Icon: HomeIcon,
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
    Icon: BriefcaseIcon,
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
        key: 3,
        name: "Products",
        link: "/business/products",
      },
      {
        key: 4,
        name: "Payment Links",
        link: "/business/payment-links",
      },
    ],
  },
  {
    id: 4,
    name: "Account",
    Icon: FIleCopyIcon,
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
    link: "/settings",
    Icon: SettingIcon,
  },
  {
    id: 10,
    name: "Sign Out",
    link: "/sign-out",
    func: logoutHandler,
    Icon: LogoutIcon,
  },
];

export default routes;
