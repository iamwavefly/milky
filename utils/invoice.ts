import BusinessDetails from "@/components/business/invoices/BusinessDetails";
import InvoiceDetails from "@/components/business/invoices/InvoiceDetails";

export const formStepLabel = [
  {
    id: 1,
    name: "Business details",
    Form: BusinessDetails,
  },
  {
    id: 2,
    name: "Invoice details",
    Form: InvoiceDetails,
  },
];
