import { HeaderTab } from "@/interfaces";

const FeeRoutes: HeaderTab[] = [
  { id: 1, name: "Collection fees", link: "/fees?tab=collection" },
  { id: 2, name: "Transfer fees", link: "/fees?tab=transfer" },
];

export default FeeRoutes;
