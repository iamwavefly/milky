import baseUrl from "@/middleware/baseUrl";
import axios from "axios";

const filterOptions = {
  orders: [
    {
      id: 1,
      title: "Amount",
      key: "Amount",
      type: "input",
    },
    {
      id: 2,
      title: "Order Reference",
      key: "OrderReference",
      type: "input",
    },
    {
      id: 3,
      title: "Payment Reference",
      key: "PaymentReference",
      type: "input",
    },
    {
      id: 4,
      title: "Subsidiary Id",
      key: "SubsidiaryId",
      type: "input",
    },
    {
      id: 5,
      title: "Customer Id",
      key: "BusinessType",
      type: "input",
    },
    {
      id: 5,
      title: "Payment Link Id",
      key: "PaymentLinkId",
      type: "input",
    },
    {
      id: 6,
      title: "Status",
      key: "Status",
      type: "list",
      options: ["Successful", "Initiated", "Failed"],
    },
  ],
  merchantChannel: [
    {
      id: 3,
      title: "Status",
      key: "Status",
      type: "list",
      options: ["Active", "Inactive"],
    },
  ],
  transactions: [
    {
      id: 1,
      title: "Customer Name",
      key: "CustomerName",
      type: "input",
    },
    {
      id: 2,
      title: "Order Reference",
      key: "OrderReference",
      type: "input",
    },
    {
      id: 2,
      title: "Payment Reference",
      key: "PaymentReference",
      type: "input",
    },
    {
      id: 3,
      title: "Email Address",
      key: "Email",
      type: "input",
    },
    {
      id: 3,
      title: "Subsidiary ID",
      key: "SubsidiaryId",
      type: "input",
    },
    {
      id: 3,
      title: "Customer ID",
      key: "CustomerId",
      type: "input",
    },
    {
      id: 3,
      title: "Status",
      key: "Status",
      type: "list",
      options: ["Successful", "Initiated", "Failed"],
    },
  ],
  customers: [
    {
      id: 3,
      title: "Email Address",
      key: "Email",
      type: "input",
    },
    {
      id: 3,
      title: "Business ID",
      key: "BusinessId",
      type: "input",
    },
    {
      id: 3,
      title: "Subsidiary ID",
      key: "SubsidiaryId",
      type: "input",
    },
    {
      id: 3,
      title: "Customer ID",
      key: "Id",
      type: "input",
    },
    {
      id: 3,
      title: "Status",
      key: "Status",
      type: "list",
      options: ["Active", "Initiated", "Failed"],
    },
  ],
  business: [
    {
      id: 2,
      title: "Business Name",
      key: "Name",
      type: "input",
    },
  ],
  disputes: [
    {
      id: 2,
      title: "Status",
      key: "Status",
      type: "list",
      options: ["New", "Lost", "Won"],
    },
    {
      id: 1,
      title: "Transaction Reference",
      key: "reference",
      type: "input",
    },
  ],
  refunds: [
    {
      id: 1,
      title: "Status",
      key: "Status",
      type: "list",
      options: ["Approved", "Processing", "Awaiting Response", "Declined"],
    },
    {
      id: 2,
      title: "Customer Name",
      key: "CustomerName",
      type: "input",
    },
    {
      id: 2,
      title: "Payment Reference",
      key: "PaymentReference",
      type: "input",
    },
  ],
  users: [
    {
      id: 2,
      title: "Name",
      key: "Name",
      type: "input",
    },
    {
      id: 2,
      title: "Email Address",
      key: "Email",
      type: "input",
    },
    {
      id: 1,
      title: "Status",
      key: "Status",
      type: "list",
      options: ["Active", "Inactive"],
    },
  ],
};

export default filterOptions;
