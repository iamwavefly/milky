import { ColumnDef } from "@tanstack/react-table";
import stringToCurrency from "../../helper/formatCurrency";
import { Checkbox, Chip, Typography } from "@mui/material";
import moment from "moment";

export const BusinessTransactionTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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
    accessorKey: "customer_email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (row: any) => {
      return (
        <Typography color="#92959F" fontSize="12px" width="max-content">
          NGN {stringToCurrency(row.getValue())}
        </Typography>
      );
    },
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
    accessorKey: "settlement_status",
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
];

export const TransactionTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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
    cell: (row: any) => {
      return (
        <Typography color="#92959F" fontSize="12px" width="max-content">
          {stringToCurrency(row.getValue())}
        </Typography>
      );
    },
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
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
  {
    accessorKey: "customer_name",
    header: "Name",
  },
  {
    accessorKey: "email_address",
    header: "Email",
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
];

export const ProductsTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
  {
    accessorKey: "product_name",
    header: "Product name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock_count",
    header: "Stock count",
  },
  {
    accessorKey: "sold",
    header: "Sold",
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
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

export const AccountCustomerTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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
    cell: (row: any) => {
      return (
        <Typography color="#92959F" fontSize="12px" width="max-content">
          {stringToCurrency(row.getValue())}
        </Typography>
      );
    },
  },
  {
    accessorKey: "date_created",
    header: "Date issued",
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

export const SettlementTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
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
    accessorKey: "customer_id",
    header: "Merchant ID",
  },
  {
    accessorKey: "merchant_name",
    header: "Business name",
  },
  {
    accessorKey: "amount",
    header: "Amount refunded",
    cell: (row: any) => {
      return (
        <Typography color="#92959F" fontSize="12px" width="max-content">
          {stringToCurrency(row.getValue())}
        </Typography>
      );
    },
  },
  {
    accessorKey: "transaction_reference",
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

export const DebitTransferTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
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
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
  {
    accessorKey: "business_name",
    header: "Business name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (row: any) => {
      return (
        <Typography color="#92959F" fontSize="12px" width="max-content">
          {stringToCurrency(row.getValue())}
        </Typography>
      );
    },
  },
  {
    accessorKey: "fee",
    header: "Settlement fee type",
    cell: (row: any) => {
      return (
        <Typography color="#92959F" fontSize="12px" width="max-content">
          {stringToCurrency(row.getValue())}
        </Typography>
      );
    },
  },
  {
    accessorKey: "currency",
    header: "Currency",
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

export const AccountsTxnTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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

export const PayoutCreditColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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
    cell: (row: any) => {
      return (
        <Typography color="#92959F" fontSize="12px" width="max-content">
          {stringToCurrency(row.getValue())}
        </Typography>
      );
    },
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
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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

export const FeesTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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
    cell: (row: any) => {
      return (
        <Typography color="#92959F" fontSize="12px" width="max-content">
          {stringToCurrency(row.getValue())}
        </Typography>
      );
    },
  },
  {
    accessorKey: "maximum_amount",
    header: "Max. amount/txn",
    cell: (row: any) => {
      return (
        <Typography color="#92959F" fontSize="12px" width="max-content">
          {stringToCurrency(row.getValue())}
        </Typography>
      );
    },
  },
  {
    accessorKey: "cumm_daily",
    header: "Cumulative daily",
    cell: (row: any) => {
      return (
        <Typography color="#92959F" fontSize="12px" width="max-content">
          {stringToCurrency(row.getValue())}
        </Typography>
      );
    },
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
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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
    cell: (row: any) => {
      return (
        <Typography color="#92959F" fontSize="12px" width="max-content">
          {stringToCurrency(row.getValue())}
        </Typography>
      );
    },
  },
  {
    accessorKey: "cummulative_daily",
    header: "Cumulative daily",
    cell: (row: any) => {
      return (
        <Typography color="#92959F" fontSize="12px" width="max-content">
          {stringToCurrency(row.getValue())}
        </Typography>
      );
    },
  },
];

export const ProviderTableColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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
    accessorKey: "checkbox",
    header: (<Checkbox />) as any,
    cell: (row: any) => {
      return <Checkbox />;
    },
  },
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