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
      id: 2,
      title: "Subsidiary ID",
      key: "SubsidiaryId",
      type: "input",
    },
    {
      id: 3,
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
      id: 2,
      title: "Subsidiary ID",
      key: "SubsidiaryId",
      type: "input",
    },
    {
      id: 3,
      title: "Type",
      key: "Type",
      type: "list",
      options: ["Single Charge", "Subscription Link", "Product"],
    },
    {
      id: 4,
      title: "Status",
      key: "Status",
      type: "list",
      options: ["Active", "Inactive"],
    },
  ],
  virtual: [
    {
      id: 1,
      title: "Account Name",
      key: "AccountName",
      type: "input",
    },
    {
      id: 2,
      title: "Account Number",
      key: "AccountNumber",
      type: "input",
    },
    {
      id: 3,
      title: "Bank Name",
      key: "BankName",
      type: "input",
    },
    {
      id: 4,
      title: "BVN",
      key: "Bvn",
      type: "input",
    },
    {
      id: 5,
      title: "Subsidiary ID",
      key: "SubsidiaryId",
      type: "input",
    },
  ],
  settlements: [
    {
      id: 1,
      title: "Subsidiary Name",
      key: "SubsidiaryName",
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
      title: "Payment Reference",
      key: "PaymentReference",
      type: "input",
    },
    {
      id: 4,
      title: "Transaction Reference",
      key: "TransactionReference",
      type: "input",
    },
    {
      id: 5,
      title: "SettlementStatus",
      key: "SettlementStatus",
      type: "list",
      options: ["Completed", "In Review", "Rejected"],
    },
  ],
  balanceHistory: [
    {
      id: 1,
      title: "Wallet ID",
      key: "WalletId",
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
      title: "Remarks",
      key: "Remarks",
      type: "input",
    },
    {
      id: 4,
      title: "Reference",
      key: "Reference",
      type: "input",
    },
  ],
  rollingReserve: [
    {
      id: 1,
      title: "Amount",
      key: "amount",
      type: "input",
    },
    {
      id: 2,
      title: "ID",
      key: "id",
      type: "input",
    },
    {
      id: 3,
      title: "Status",
      key: "status",
      type: "list",
      options: ["Due", "Not due", "Almost due"],
    },
  ],
  transfers: [
    {
      id: 1,
      title: "ID",
      key: "Id",
      type: "input",
    },
    {
      id: 2,
      title: "Transaction Reference",
      key: "TransactionReference",
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
      title: "Status",
      key: "status",
      type: "list",
      options: ["Approved", "Processing", "Failed"],
    },
  ],
  Refunds: [
    {
      id: 1,
      title: "ID",
      key: "Id",
      type: "input",
    },
    {
      id: 2,
      title: "Customer Name",
      key: "CustomerName",
      type: "input",
    },
    {
      id: 3,
      title: "Email Address",
      key: "Email",
      type: "input",
    },
    {
      id: 4,
      title: "Business Name",
      key: "BusinessName",
      type: "input",
    },
    {
      id: 5,
      title: "Subsidiary ID",
      key: "SubsidiaryId",
      type: "input",
    },
    {
      id: 6,
      title: "Status",
      key: "status",
      type: "list",
      options: ["Approved", "Processing", "Failed"],
    },
  ],
  payoutAccounts: [
    {
      id: 1,
      title: "AccountName",
      key: "Account Name",
      type: "input",
    },
    {
      id: 2,
      title: "Account Number",
      key: "AccountNumber",
      type: "input",
    },
    {
      id: 3,
      title: "Bank Name",
      key: "BankName",
      type: "input",
    },
    {
      id: 4,
      title: "Subsidiary ID",
      key: "BusinessName",
      type: "input",
    },
    {
      id: 5,
      title: "BVN",
      key: "Bvn",
      type: "input",
    },
  ],
  users: [
    {
      id: 1,
      title: "Subsidiary ID",
      key: "SubsidiaryId",
      type: "input",
    },
  ],
  subsidiaries: [
    {
      id: 1,
      title: "Subsidiary ID",
      key: "SubsidiaryId",
      type: "input",
    },
  ],
  audits: [
    {
      id: 1,
      title: "Subsidiary ID",
      key: "SubsidiaryId",
      type: "input",
    },
  ],
};

export default filterOptions;
