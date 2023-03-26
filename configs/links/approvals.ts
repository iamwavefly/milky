import { HeaderTab } from "@/interfaces";

const ApprovalRoutes: HeaderTab[] = [
  { id: 1, name: "Providers setup approval", link: "/approvals?tab=setup" },
  { id: 2, name: "Fees approval", link: "/approvals?tab=fees" },
  { id: 2, name: "Limits approval", link: "/approvals?tab=limits" },
];

export default ApprovalRoutes;
