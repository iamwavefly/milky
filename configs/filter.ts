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
      title: "Subsidiary ID",
      key: "SubsidiaryId",
      type: "input",
    },
    {
      id: 5,
      title: "Customer ID",
      key: "BusinessType",
      type: "input",
    },
    {
      id: 5,
      title: "Payment Link ID",
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
  invoice: [
    {
      id: 1,
      title: "Invoice ID",
      key: "InvoiceId",
      type: "input",
    },
    {
      id: 1,
      title: "Subsidiary ID",
      key: "SubsidiaryId",
      type: "input",
    },
    {
      id: 6,
      title: "Status",
      key: "Status",
      type: "list",
      options: ["Paid", "Pending", "Failed"],
    },
  ],
  customers: [
    {
      id: 1,
      title: "Email Address",
      key: "Email",
      type: "input",
    },
    {
      id: 1,
      title: "Customer Name",
      key: "CustomerName",
      type: "input",
    },
    {
      id: 1,
      title: "Customer ID",
      key: "Id",
      type: "input",
    },
    {
      id: 1,
      title: "Mobile Number",
      key: "MobileNumber",
      type: "input",
    },
    {
      id: 1,
      title: "Subsidiary ID",
      key: "SubsidiaryId",
      type: "input",
    },
    {
      id: 1,
      title: "Country",
      key: "Country",
      type: "input",
    },
    {
      id: 6,
      title: "Status",
      key: "Status",
      type: "list",
      options: ["Active", "Inactive"],
    },
  ],
  products: [
    {
      id: 1,
      title: "Product ID",
      key: "ProductId",
      type: "input",
    },
    {
      id: 2,
      title: "Subsidiary ID",
      key: "SubsidiaryId",
      type: "input",
    },
    {
      id: 3,
      title: "Payment Link ID",
      key: "Id",
      type: "input",
    },
    {
      id: 4,
      title: "Available",
      key: "Available",
      type: "list",
      options: ["True", "False"],
    },
    {
      id: 5,
      title: "Status",
      key: "Status",
      type: "list",
      options: ["Available", "Archived"],
    },
  ],
  paymentLinks: [
    {
      id: 1,
      title: "Payment Link ID",
      key: "Id",
      type: "input",
    },
    {
      id: 1,
      title: "Subsidiary ID",
      key: "SubsidiaryId",
      type: "input",
    },
    {
      id: 2,
      title: "Type",
      key: "Type",
      type: "list",
      options: ["Product", "Single Charge"],
    },
    {
      id: 5,
      title: "Status",
      key: "Status",
      type: "list",
      options: ["Active", "Inactive"],
    },
  ],
};

export default filterOptions;
