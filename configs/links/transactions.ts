import { HeaderTab } from "@/types";

const TransactionHeaderRoutes: HeaderTab[] = [
  { id: 1, name: "All Transaction", link: "/transactions" },
  { id: 2, name: "Customers", link: "/transactions/customers" },
  { id: 3, name: "Invoices", link: "/transactions/invoices" },
];

export default TransactionHeaderRoutes;
