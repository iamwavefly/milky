import { HeaderTab } from "@/interfaces";

const LimitRoutes: HeaderTab[] = [
  { id: 1, name: "Collection limits", link: "/limits?tab=collection" },
  { id: 2, name: "Transfer limits", link: "/limits?tab=transfer" },
];

export default LimitRoutes;
