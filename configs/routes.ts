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
    link: "/overview",
    Icon: RestartIcon,
  },
  {
    id: 2,
    name: "Home",
    link: "/dashboard",
    Icon: HomeIcon,
  },
  {
    id: 2,
    name: "Business",
    link: "/business",
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
        link: "/business/payment",
      },
    ],
  },
  {
    id: 3,
    name: "Account",
    link: "/account",
    Icon: FIleCopyIcon,
  },
  {
    id: 4,
    name: "Balance",
    link: "/balance",
    Icon: MoneyBoxIcon,
  },
  {
    id: 5,
    name: "Payouts",
    link: "/payouts",
    Icon: BankCardIcon,
    nest: [
      {
        key: 1,
        name: "Settlements",
        link: "/settlements",
      },
      {
        key: 2,
        name: "Reconciliation",
        link: "/settlements/reconciliation",
      },
      {
        key: 3,
        name: "Pending approval",
        link: "/settlements/pending-approval",
      },
      {
        key: 3,
        name: "Reports",
        link: "/settlements/reports",
      },
    ],
  },
  {
    id: 6,
    name: "Refunds",
    link: "/refunds",
    Icon: NewspaperIcon,
  },
  {
    id: 7,
    name: "Chargeback",
    link: "/chargeback",
    Icon: ArrowLeftRightIcon,
  },
  {
    id: 8,
    name: "Settings",
    link: "/settings",
    Icon: SettingIcon,
  },
  {
    id: 9,
    name: "Sign Out",
    link: "/sign-out",
    func: logoutHandler,
    Icon: LogoutIcon,
  },
];

export default routes;
