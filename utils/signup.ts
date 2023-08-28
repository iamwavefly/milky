import UserIcon from "@/public/icons/user.svg";
import BriefcaseIcon from "@/public/icons/briefcase.svg";
import BusinessDetails from "@/components/onboarding/BusinessDetails";
import ContactInformation from "@/components/onboarding/ContactInformation";
import BusinessRegistration from "@/components/onboarding/BusinessRegistration";
import BankDetails from "@/components/onboarding/BankDetails";
import PersonalInformation from "@/components/onboarding/PersonalInformation";
import TermsConditions from "@/components/onboarding/TermsConditions";

export const formStepLabel = [
  {
    id: 1,
    name: "Business details",
  },
  {
    id: 2,
    name: "Contact information",
  },
  {
    id: 3,
    name: "Business registration",
  },
  {
    id: 4,
    name: "Bank details",
  },
  {
    id: 5,
    name: "Personal information",
  },
  {
    id: 6,
    name: "Terms & conditions",
  },
];

export const accountTypes = [
  {
    id: 1,
    name: "Starter / Individual",
    subtitle: "An unregistered business e.g Freelancers & Sole traders",
    Icon: UserIcon,
  },
  {
    id: 2,
    name: "Registered",
    subtitle: "A registered business with a corporate bank account",
    Icon: BriefcaseIcon,
  },
];

export const formComponents = [
  {
    id: 1,
    Form: BusinessDetails,
  },
  {
    id: 2,
    name: "Contact information",
  },
  {
    id: 3,
    name: "Business registration",
  },
  {
    id: 4,
    name: "Bank details",
  },
  {
    id: 5,
    name: "Personal information",
  },
  {
    id: 6,
    name: "Terms & conditions",
  },
];

export const onboardingForm = [
  {
    id: 1,
    Form: ContactInformation,
    title: "Contact information",
    subtitle:
      "We need contact details of one person at your company. This can be the owner or anyone else we can contact when we need to.",
  },
  {
    id: 2,
    Form: BusinessRegistration,
    title: "Business Registration",
    subtitle:
      "We need this information to give us an idea of the kind of business you run, the type of product / services you will need to maximize this portal and how we can generally serve you better.",
  },
  {
    id: 3,
    Form: BankDetails,
    title: "Bank details",
    subtitle:
      "This is the primary bank account we will send your settlements to.",
  },
  {
    id: 4,
    Form: PersonalInformation,
    title: "Personal information",
    subtitle:
      "This helps us confirm your identity. We use the details you provide for the verification purposes only and it will not be visible to anyone on your team or business.",
  },
  {
    id: 5,
    Form: TermsConditions,
    title: "Terms & conditions",
    subtitle:
      "These are all the terms of use and conditions surrounding the Arcapay payment solution. Kindly read through and accept.`",
  },
];
