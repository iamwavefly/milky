import UserIcon from "@/public/icons/user.svg";
import BriefcaseIcon from "@/public/icons/briefcase.svg";
import ContactInformation from "@/components/onboarding/ContactInformation";
import BusinessRegistration from "@/components/onboarding/BusinessRegistration";
import BankDetails from "@/components/onboarding/BankDetails";
import PersonalInformation from "@/components/onboarding/PersonalInformation";
import TermsConditions from "@/components/onboarding/TermsConditions";
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
