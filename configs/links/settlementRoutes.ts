import { HeaderTab } from "@/types";

const SettlementHeaderRoutes: HeaderTab[] = [
  { id: 1, name: "Settlement Due", link: "/settlements" },
  { id: 2, name: "Reviews settlement", link: "/settlements/review" },
  { id: 3, name: "Failed settlement", link: "/settlements/failed" },
];

export default SettlementHeaderRoutes;
