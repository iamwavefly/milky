import { ColumnDef } from "@tanstack/react-table";
import stringToCurrency from "../../helper/formatCurrency";
import { Box, Checkbox, Chip, Stack, Typography } from "@mui/material";
import moment from "moment";
import {
  ViewTransaction,
  BeneficiaryMenu,
  CustomerMenu,
  PaymentLinkMenu,
  ProductMenu,
  TransferMenu,
  VirtualAccountMenu,
  EmptyMenu,
  UserMenu,
} from "./menu";
import Image from "next/image";

export const BusinessTransactionTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "date_created",
    header: "Date",
    cell: (row: any) => {
      return moment(row.getValue()).format("L");
    },
  },
  {
    accessorKey: "customer_email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.amount).replace(
        "NGN",
        ""
      )}`,
    header: "Amount",
  },
  {
    accessorKey: "payment_type",
    header: "Payment type",
  },
  {
    accessorKey: "order_reference",
    header: "Reference",
  },
  {
    accessorKey: "order_status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()?.replaceAll("-", " ")}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
  {
    header: "actions",
    cell: (props) => (
      <ViewTransaction id={props?.row?.original?.order_reference} />
    ),
  },
];

export const TransactionTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "date_created",
    header: "Date",
    cell: (row: any) => {
      return (
        <Typography color="#92959F" fontSize="12px" width="max-content">
          {moment(row.getValue()).format("L")}
        </Typography>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Merchant ID",
  },
  {
    accessorKey: "customer_email",
    header: "Email address",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.amount).replace(
        "NGN",
        ""
      )}`,
  },
  {
    accessorKey: "payment_type",
    header: "Payment type",
  },
  {
    accessorKey: "order_status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
];

export const CustomersTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "customer_name",
    header: "Customer name",
  },
  {
    accessorKey: "email_address",
    header: "Customer email address",
  },
  {
    accessorKey: "mobile_number",
    header: "Mobile number",
  },
  {
    accessorKey: "country_name",
    header: "Country",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
  {
    header: " ",
    accessorKey: "id",
    cell: (row) => <CustomerMenu id={row.getValue()} />,
  },
];

export const PayoutTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "bank_name",
    header: "Bank Name",
  },
  {
    accessorKey: "account_number",
    header: "Account number",
  },
  {
    accessorKey: "account_name",
    header: "Account name",
  },
  {
    accessorKey: "debit_currency",
    header: "Currency",
  },
  {
    header: "Actions",
    accessorKey: "id",
    cell: (row) => <EmptyMenu id={row.getValue()} />,
  },
];

export const UserTableColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    header: "Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "email_address",
    header: "Email",
  },
  {
    accessorKey: "mobile_number",
    header: "Phone number",
  },
  {
    accessorKey: "debit_currency",
    header: "Country",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
  {
    header: "Actions",
    accessorKey: "user_id",
    cell: (row) => <UserMenu id={row.getValue()} />,
  },
];
// audit trails
export const AuditTrailTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "date_created",
    header: "Time",
    cell: (row: any) => {
      return moment(row.getValue()).calendar();
    },
  },
  {
    accessorKey: "name",
    header: "User",
  },
  {
    accessorKey: "action",
    header: "Activity",
  },
  {
    header: "Actions",
    accessorKey: "user_id",
    cell: (row) => <EmptyMenu id={row.getValue()} />,
  },
];

export const SubsidiaryTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "support_email",
    header: "Email",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "users",
    header: "Number of users",
  },
  {
    accessorKey: "business_type",
    header: "Business type",
  },
];

export const CustomerDetailsTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "customer_name",
    header: "Name",
  },
  {
    accessorKey: "amount",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.amount).replace(
        "NGN",
        ""
      )}`,
    header: "Amount",
  },
  {
    accessorKey: "payment_type",
    header: "Payment type",
  },
  {
    accessorKey: "order_reference",
    header: "Reference",
  },
  {
    accessorKey: "order_status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
];

export const TransactionDetailsTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "date_created",
    header: "Date",
    cell: (row: any) => {
      return moment(row.getValue()).format("L");
    },
  },
  {
    accessorKey: "customer_email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.amount).replace(
        "NGN",
        ""
      )}`,
    header: "Amount",
  },
  {
    accessorKey: "payment_type",
    header: "Channel",
  },
  {
    accessorKey: "order_reference",
    header: "Reference",
  },
  {
    accessorKey: "order_status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
];

export const ProductDetailsTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "name",
    header: "Product name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock count",
  },
  {
    accessorKey: "total_orders",
    header: "Sold",
  },
  {
    header: "Revenue",
    accessorKey: "revenue",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.total_amount).replace(
        "NGN",
        ""
      )}`,
  },
  {
    accessorKey: "status",
    header: "Availability",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
];

export const ProductsTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "name",
    header: "Product name",
    cell: (props) => {
      const { image, name } = props.row.original;
      return (
        <Stack direction="row" alignItems="center" spacing="12px">
          <Image
            src={image}
            alt={name}
            style={{ objectFit: "cover", borderRadius: "8px" }}
            width={44}
            height={44}
          />
          <span className="email">{name}</span>
        </Stack>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.price).replace(
        "NGN",
        ""
      )}`,
  },
  {
    accessorKey: "status",
    header: "Availability",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
  {
    accessorKey: "stock",
    header: "Stock count",
  },
  {
    accessorKey: "total_orders",
    header: "Sold",
  },
  {
    accessorKey: "total_amount",
    header: "Revenue",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.total_amount).replace(
        "NGN",
        ""
      )}`,
  },
  {
    header: "Actions",
    accessorKey: "id",
    cell: (row) => <ProductMenu id={row.getValue()} />,
  },
];

export const AccountVirtualTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "account_name",
    header: "Name",
  },
  {
    accessorKey: "account_number",
    header: "Account Number",
  },
  {
    accessorKey: "bank_name",
    header: "Bank Name",
  },
  {
    accessorKey: "bvn",
    header: "BVN",
  },
  {
    header: "Actions",
    accessorKey: "id",
    cell: (row) => <VirtualAccountMenu id={row.getValue()} />,
  },
];

export const BalanceReserveColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "settlement_amount",
    header: "Settlement amount",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(
        row.settlement_amount
      ).replace("NGN", "")}`,
  },
  {
    accessorKey: "settlement_date",
    header: "Settlement date",
    cell: (row: any) => {
      return (
        <Typography color="#92959F" fontSize="12px" width="max-content">
          {moment(row.getValue()).format("L")}
        </Typography>
      );
    },
  },
  {
    accessorKey: "withheld_amount",
    header: "Withheld amount",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.withheld_amount).replace(
        "NGN",
        ""
      )}`,
  },
  {
    accessorKey: "due_date",
    header: "Due date",
    cell: (row: any) => {
      return (
        <Typography color="#92959F" fontSize="12px" width="max-content">
          {moment(row.getValue()).format("L")}
        </Typography>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
  {
    header: "Actions",
    accessorKey: "id",
    cell: (row) => <VirtualAccountMenu id={row.getValue()} />,
  },
];

export const BalanceHistoryColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "balance",
    header: "Initial balance",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.balance).replace(
        "NGN",
        ""
      )}`,
  },
  {
    accessorKey: "amount",
    header: "Transaction amount",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.amount).replace(
        "NGN",
        ""
      )}`,
  },
  {
    accessorKey: "balance_after",
    header: "Balance after",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.total).replace(
        "NGN",
        ""
      )}`,
  },
  {
    accessorKey: "remarks",
    header: "Transaction details",
  },
  {
    accessorKey: "due_date",
    header: "Due date",
    cell: (row: any) => {
      return moment(row.getValue()).format("L");
    },
  },
  {
    header: "Actions",
    accessorKey: "id",
    cell: (row) => <VirtualAccountMenu id={row.getValue()} />,
  },
];

export const AccountCustomerTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "name",
    header: "Customer name",
  },
  {
    accessorKey: "email_address",
    header: "Email address",
  },
  {
    accessorKey: "mobile_number",
    header: "Mobile number",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "count",
    header: "Transaction count",
  },
];

export const InvoiceTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "customer_name",
    header: "Customer name",
  },
  {
    accessorKey: "customer_email",
    header: "Email address",
  },
  {
    accessorKey: "reference",
    header: "Invoice number",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.amount).replace(
        "NGN",
        ""
      )}`,
  },
  {
    accessorKey: "date_created",
    header: "Date issued",
    cell: (row: any) => {
      return moment(row.getValue()).format("L");
    },
  },
  {
    accessorKey: "due_date",
    header: "Due date",
    cell: (row: any) => {
      return moment(row.getValue()).format("L");
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
];

export const SettlementTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "name",
    header: "Business name",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "id",
    header: "Merchant ID",
  },
  {
    accessorKey: "amount",
    header: "Amount due",
  },
  {
    accessorKey: "date",
    header: "Transaction date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
];

export const ReportTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "id",
    header: "Transaction reference",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "business_name",
    header: "Initiated by",
  },
  {
    accessorKey: "amount",
    header: "Amount due",
  },
  {
    accessorKey: "date",
    header: "Transaction date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
];

export const PendingApprovalTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "amount",
    header: "Amount due",
  },
  {
    accessorKey: "narration",
    header: "Narration",
  },
  {
    accessorKey: "account",
    header: "Account number/bank",
  },
  {
    accessorKey: "business_name",
    header: "Initiated by",
  },
  {
    accessorKey: "reference",
    header: "Reference",
  },
  {
    accessorKey: "code",
    header: "Bank code",
  },
];

export const RefundTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "amount",
    header: "Amount",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.amount).replace(
        "NGN",
        ""
      )}`,
  },
  {
    accessorKey: "customer_id",
    header: "Customer ID",
  },
  {
    accessorKey: "refund_reference",
    header: "Transaction reference",
  },
  {
    accessorKey: "date_created",
    header: "Date",
    cell: (row: any) => {
      return moment(row.getValue()).format("L");
    },
  },
  {
    accessorKey: "refund_status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
  {
    header: "Actions",
    accessorKey: "id",
    cell: (row) => <VirtualAccountMenu id={row.getValue()} />,
  },
];

export const DebitTransferTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "name",
    header: "Business name",
  },
  {
    accessorKey: "amount",
    header: "Transaction amount",
  },
  {
    accessorKey: "id",
    header: "Transaction reference",
  },
  {
    accessorKey: "debit_type",
    header: "Debit type",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
];

export const SettlementDetailsTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "id",
    header: "Customer ID",
  },
  {
    accessorKey: "amount",
    header: "Subaccount’s share",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "payment",
    header: "Payment type",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
];

export const AccountsTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "business_name",
    header: "Business name",
  },
  {
    accessorKey: "email",
    header: "Email address",
  },
  {
    accessorKey: "business_type",
    header: "Business type",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "no_of_subsidiaries",
    header: "Subsidiaries",
  },
];

export const AccountSettlementTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "subsidiary_name",
    header: "Business name",
  },
  {
    accessorKey: "transaction_amount",
    header: "Amount",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(
        row.transaction_amount
      ).replace("NGN", "")}`,
  },
  {
    accessorKey: "fee",
    header: "Settlement fee",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.fee).replace(
        "NGN",
        ""
      )}`,
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "settlement_status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
];

export const TransferTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "account_number",
    header: "Account",
  },
  {
    accessorKey: "bank_name",
    header: "Bank",
  },
  {
    accessorKey: "recipient_name",
    header: "Recepient",
  },
  {
    accessorKey: "payout_reference",
    header: "Reference",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.amount).replace(
        "NGN",
        ""
      )}`,
  },
  {
    accessorKey: "narration",
    header: "Narration",
  },
  {
    accessorKey: "date_initiated",
    header: "Date",
    cell: (row: any) => {
      return moment(row.getValue()).format("L");
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
  {
    header: " ",
    accessorKey: "id",
    cell: (row) => <TransferMenu id={row.getValue()} />,
  },
];

export const TransferPendingTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "amount",
    header: "Amount",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.amount).replace(
        "NGN",
        ""
      )}`,
  },
  {
    accessorKey: "narration",
    header: "Narration",
  },
  {
    accessorKey: "recipient_name",
    header: "Recepient",
  },
  {
    accessorKey: "date_initiated",
    header: "Date",
    cell: (row: any) => {
      return (
        <Typography color="#92959F" fontSize="12px" width="max-content">
          {moment(row.getValue()).format("L")}
        </Typography>
      );
    },
  },
  {
    header: "Actions",
    accessorKey: "id",
    cell: (row) => <CustomerMenu id={row.getValue()} />,
  },
];

export const FundingHistoryTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "amount",
    header: "Amount",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.amount).replace(
        "NGN",
        ""
      )}`,
  },
  {
    accessorKey: "",
    header: "Method",
  },
  {
    accessorKey: "fee",
    header: "Fee",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.fee).replace(
        "NGN",
        ""
      )}`,
  },
  {
    accessorKey: "date_initiated",
    header: "Date",
    cell: (row: any) => {
      return moment(row.getValue()).format("L");
    },
  },
  // {
  //   header: "Actions",
  //   accessorKey: "id",
  //   cell: (row) => <CustomerMenu id={row.getValue()} />,
  // },
];

export const BeneficiaryTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "account_number",
    header: "Account number",
  },
  {
    accessorKey: "date_created",
    header: "Date",
    cell: (row: any) => {
      return moment(row.getValue()).format("L");
    },
  },
  {
    header: "Actions",
    accessorKey: "id",
    cell: (row) => <BeneficiaryMenu id={row.getValue()} />,
  },
];

export const AccountsTxnTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "name",
    header: "Business name",
  },
  {
    accessorKey: "email",
    header: "Email address",
  },
  {
    accessorKey: "amount",
    header: "Transaction amount",
  },
  {
    accessorKey: "payment",
    header: "Payment channel",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
];

export const AccountSubsidiariesColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "name",
    header: "Business name",
  },
  {
    accessorKey: "email_address",
    header: "Email address",
  },
  {
    accessorKey: "type",
    header: "Business type",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "users",
    header: "# of users",
  },
  {
    accessorKey: "subsidiaries",
    header: "Subsidiaries",
  },
];

export const AccountSubDetailsColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "name",
    header: "Subsidiary name",
  },
  {
    accessorKey: "email_address",
    header: "Email address",
  },
  {
    accessorKey: "type",
    header: "Business type",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "users",
    header: "Number of users",
  },
];

export const AccountSettlementColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "name",
    header: "Business name",
  },
  {
    accessorKey: "amount",
    header: "Settlement amount",
  },
  {
    accessorKey: "fee",
    header: "Settlement fee",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "cycle",
    header: "Settlement cycle",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
];

export const PaymentLinkColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "name",
    header: "Link name",
  },
  {
    accessorKey: "payment_type",
    header: "Type",
  },
  {
    accessorKey: "limit",
    header: "Limit",
  },
  {
    accessorKey: "amount",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.amount).replace(
        "NGN",
        ""
      )}`,
    header: "Amount",
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row?.getValue() ? "Active" : "Inactive"}
          className={`chip ${row.getValue() ? "active" : "fail"}`}
        />
      );
    },
  },
  {
    header: "Actions",
    accessorKey: "id",
    cell: (row) => <PaymentLinkMenu id={row.getValue()} />,
  },
];

export const PayoutCreditColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "type",
    header: "Payment type",
  },
  {
    accessorKey: "name",
    header: "Business name",
  },
  {
    accessorKey: "amount",
    header: "Transaction amount",
  },
  {
    accessorKey: "reference",
    header: "Transaction reference",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];

export const DebiTansfertColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "type",
    header: "Payment type",
  },
  {
    accessorKey: "name",
    header: "Business name",
  },
  {
    accessorKey: "amount",
    header: "Transaction amount",
  },
  {
    accessorKey: "reference",
    header: "Transaction reference",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];

export const DisputeColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "merchant_name",
    header: "Business name",
  },
  {
    accessorKey: "transaction_reference",
    header: "Transaction reference",
  },
  {
    accessorKey: "amount",
    header: "Transaction amount",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.amount).replace(
        "NGN",
        ""
      )}`,
  },
  {
    accessorKey: "date_created",
    header: "Date created",
    cell: (row: any) => {
      return (
        <Typography color="#92959F" fontSize="12px" width="max-content">
          {moment(row.getValue()).format("L")}
        </Typography>
      );
    },
  },
  {
    accessorKey: "due_date",
    header: "Due date",
    cell: (row: any) => {
      return (
        <Typography color="#92959F" fontSize="12px" width="max-content">
          {moment(row.getValue()).format("L")}
        </Typography>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
];

export const CreditSummaryColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "name",
    header: "Merchant name",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "amount",
    header: "Amount funded",
  },
];

export const ProviderSummaryColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "due_date",
    header: "Due date",
  },
  {
    accessorKey: "id",
    header: "Merchant ID",
  },
  {
    accessorKey: "name",
    header: "Business name",
  },
  {
    accessorKey: "amount",
    header: "Amount refunded",
  },
  {
    accessorKey: "amount_charged",
    header: "Amount charged",
  },
  {
    accessorKey: "transaction_ref",
    header: "Transaction reference",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
];

export const ChargebackColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "ref",
    header: "Transaction ref",
  },
  {
    accessorKey: "email",
    header: "Customer email",
  },
  {
    accessorKey: "due",
    header: "Due",
  },
  {
    accessorKey: "Date",
    header: "Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
];

export const AwaitingResponseColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "ref",
    header: "Transaction ref",
  },
  {
    accessorKey: "email",
    header: "Customer email",
  },
  {
    accessorKey: "Date",
    header: "Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
];

export const WonChargebackColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "ref",
    header: "Transaction ref",
  },
  {
    accessorKey: "email",
    header: "Customer email",
  },
  {
    accessorKey: "Date",
    header: "Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
];

export const AssessmentChargebackColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "ref",
    header: "Reason for assessment",
  },
  {
    accessorKey: "email",
    header: "Wallet debited",
  },
  {
    accessorKey: "Date",
    header: "Date",
  },
];

export const FeesTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "payment_type",
    header: "Payment type",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "fee",
    header: "Fee",
  },
];

export const LimitCollectionTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "business_type",
    header: "Business type",
  },
  {
    accessorKey: "currency",
    header: "Country/Currency",
  },
  {
    accessorKey: "minimum_amount",
    header: "Min. amount/txn",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.minimum_amount).replace(
        "NGN",
        ""
      )}`,
  },
  {
    accessorKey: "maximum_amount",
    header: "Max. amount/txn",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.maximum_amount).replace(
        "NGN",
        ""
      )}`,
  },
  {
    accessorKey: "cumm_daily",
    header: "Cumulative daily",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.cumm_daily).replace(
        "NGN",
        ""
      )}`,
  },
  {
    accessorKey: "risk_category",
    header: "Risk category",
  },
  {
    accessorKey: "compliance_status",
    header: "Compliance status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
];

export const LimitTransferTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "transaction_type",
    header: "Transaction type",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "frequency",
    header: "Frequency limit",
  },
  {
    accessorKey: "Transfer limit",
    header: "transfer_limit",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(row.transfer_limit).replace(
        "NGN",
        ""
      )}`,
  },
  {
    accessorKey: "cummulative_daily",
    header: "Cumulative daily",
    accessorFn: (row) =>
      `${row.currency ?? "NGN"} ${stringToCurrency(
        row.cummulative_daily
      ).replace("NGN", "")}`,
  },
];

export const ProviderTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "provider",
    header: "Provider name",
  },
  {
    accessorKey: "short_name",
    header: "Provider short name",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
];

export const ApprovalSetupTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "provider",
    header: "Provider name",
  },
  {
    accessorKey: "short_name",
    header: "Provider short name",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
];

export const ApprovalFeesTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "date_created",
    header: "Request date",
    cell: (row: any) => {
      return (
        <Typography color="#92959F" fontSize="12px" width="max-content">
          {moment(row.getValue()).format("L")}
        </Typography>
      );
    },
  },
  {
    accessorKey: "short_name",
    header: "Provider short name",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
];

export const SettingsTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "email",
    header: "Email address",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
];

export const SettingRoleTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "email",
    header: "Email address",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Total amount funded",
  },
  {
    accessorKey: "amount",
    header: "Cost",
  },
  {
    accessorKey: "amount",
    header: "Income",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];

export const MerchantTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "id",
    header: "Merchant ID",
  },
  {
    accessorKey: "payment",
    header: "Payment method",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "card_type",
    header: "Card type",
  },
  {
    accessorKey: "bank",
    header: "Channel bank",
  },
  {
    accessorKey: "MID",
    header: "Channel MID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row: any) => {
      return (
        <Chip
          label={row.getValue()}
          className={`chip ${row
            .getValue()
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}`}
        />
      );
    },
  },
];
