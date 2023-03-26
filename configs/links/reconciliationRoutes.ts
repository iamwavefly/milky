import { HeaderTab } from "@/interfaces";

const ReconciliationHeaderRoutes: HeaderTab[] = [
  {
    id: 1,
    name: "Settlement transactions",
    link: "/settlements/reconciliation?tab=transactions",
  },
  {
    id: 2,
    name: "Settlement transactions summary",
    link: "/settlements/reconciliation?tab=transactions-summary",
  },
  {
    id: 3,
    name: "Acquirer/Provider summary",
    link: "/settlements/reconciliation?tab=provider-summary",
  },
];

export default ReconciliationHeaderRoutes;
