import BankDetails from "@/components/setup/BankDetails";
import ContactInformation from "@/components/setup/ContactInformation";
import BusinessRegistration from "@/components/setup/BusinessRegistration";
import InformationBusiness from "@/components/setup/BusinessInformation";
import BusinessInformation from "@/components/setup/BusinessInformation";
import Legal from "@/components/setup/Legal";
import PersonalInformation from "@/components/setup/PersonalInformation";

export const merchants = {
  store: [
    {
      key: "merchantId",
      name: "Merchant ID",
      variant: "copy",
      value: "AP000000001",
    },
    {
      key: "country",
      name: "Country",
      variant: "copy",
      value: "Kenya",
    },
    {
      key: "date_created",
      name: "Sign Up Date",
      variant: "copy",
      value: "15/03/2023",
    },
    {
      key: "status",
      name: "Status",
      variant: "status",
      value: "Approved",
    },
  ],
  contact: [
    {
      key: "first_name",
      name: "First name",
      variant: "copy",
      value: "Rachel",
    },
    {
      key: "last_name",
      name: "Last name",
      variant: "copy",
      value: "Washington",
    },
    {
      key: "phone_number",
      name: "Phone number",
      variant: "copy",
      value: "(+234) 8122345678",
    },
  ],
  personal: [
    {
      key: "bvn",
      name: "BVN",
      variant: "copy",
      value: "12345678901",
    },
    {
      key: "first_name",
      name: "First name",
      variant: "copy",
      value: "Ibukun",
    },
    {
      key: "last_name",
      name: "Last name",
      variant: "copy",
      value: "Arifalo",
    },
    {
      key: "gender",
      name: "Gender",
      variant: "copy",
      value: "Female",
    },
    {
      key: "dob",
      name: "Date of Birth",
      variant: "copy",
      value: "03/08/1994",
    },
    {
      key: "phone_number",
      name: "Phone number",
      variant: "copy",
      value: "(+234) 8123456789",
    },
    {
      key: "identification_document",
      name: "Identification document",
      variant: "download",
      value: "IDdoc.pdf",
    },
    {
      key: "identification_number",
      name: "Identification number",
      variant: "copy",
      value: "8123456789",
    },
    {
      key: "identification",
      name: "Identification",
      variant: "download",
      value: "Identification.pdf",
    },
    {
      key: "passport_photograph",
      name: "Passport photograph ",
      variant: "download",
      value: "mypassport.pdf",
    },
    {
      key: "proof_address",
      name: "Proof of address",
      variant: "download",
      value: "myproofofaddress.png",
    },
  ],
  registration: [
    {
      key: "business_class",
      name: "Business class",
      variant: "copy",
      value: "12345678901",
    },
    {
      key: "tax_number",
      name: "Tax identification number",
      variant: "copy",
      value: "21234578984245797",
    },
    {
      key: "certificate_incorporation",
      name: "Certificate of incorporation",
      variant: "copy",
      value: "03/08/1994",
    },
    {
      key: "particulars_director",
      name: "Particulars of director",
      variant: "copy",
      value: "89983456789",
    },
    {
      key: "statement_shares",
      name: "Statement of return on allotment of shares",
      variant: "download",
      value: "IDdoc.pdf",
    },
    {
      key: "proof_address",
      name: "Proof of address",
      variant: "download",
      value: "myproofofaddress.png",
    },
    {
      key: "director1",
      name: "Director 1",
      variant: "download",
      value: "chairmanID.pdf",
    },
    {
      key: "director2",
      name: "Director 2",
      variant: "download",
      value: "chairmanID.pdf",
    },
    {
      key: "operating_license",
      name: "Operating license",
      variant: "download",
      value: "file.pdf",
    },
    {
      key: "Stakeholder1",
      name: "Stakeholder 1",
      variant: "download",
      value: "Raymond Simon.pdf",
    },
    {
      key: "stakeholder2",
      name: "Stakeholder 2",
      variant: "download",
      value: "Fredrick Harret.pdf",
    },
  ],
  business_information: [
    {
      key: "about",
      name: "What do you do at Alliance Pay",
      variant: "copy",
      value: "I am a merchant and I have made use to of their POS services",
    },
    {
      key: "email",
      name: "Business email",
      variant: "copy",
      value: "madamgoodnessstore@gmail.com",
    },
    {
      key: "phone_number",
      name: "Business phone number",
      variant: "copy",
      value: "(+234) 8123456789",
    },
    {
      key: "address",
      name: "Business address",
      variant: "copy",
      value: "18, Aisisat Lanre street, Lagos",
    },
    {
      key: "city",
      name: "City",
      variant: "copy",
      value: "Ikeja",
    },
    {
      key: "state",
      name: "State",
      variant: "copy",
      value: "Lagos",
    },
    {
      key: "website",
      name: "Website",
      variant: "copy",
      value: "goodnessstrore.com",
    },
    {
      key: "facebook",
      name: "Facebook",
      variant: "copy",
      value: "Goodness store",
    },
    {
      key: "instagram",
      name: "Instagram",
      variant: "copy",
      value: "goodness_stores",
    },
    {
      key: "twitter",
      name: "Twitter",
      variant: "copy",
      value: "goodness_stores",
    },
    {
      key: "logo",
      name: "Business logo",
      variant: "img",
    },
  ],
  bank: [
    {
      key: "type",
      name: "Account type",
      variant: "copy",
      value: "Corporate",
    },
    {
      key: "bank_name",
      name: "Bank name",
      variant: "copy",
      value: "Zenith Bank",
    },
    {
      key: "number",
      name: "Account number",
      variant: "copy",
      value: "00122345678",
    },
    {
      key: "name",
      name: "Account name",
      variant: "copy",
      value: "Rachel Washington",
    },
  ],
};

export const transactions = {
  customer: [
    { key: 1, name: "Customer name", value: "Rachel Seun", variant: "copy" },
    {
      key: 2,
      name: "Customer email",
      value: "rachelseun@gmail.com",
      variant: "copy",
    },
    { key: 3, name: "Customer phone", value: "+234812345678", variant: "copy" },
    { key: 4, name: "Country", value: "Nigeria", variant: "copy" },
  ],
};

export const settlements = {
  details: [
    {
      key: 1,
      name: "Transaction date",
      value: "09 Jan, 2021  08:32pm",
      variant: "copy",
    },
    {
      key: 2,
      name: "Settlement date",
      value: "09 Jan, 2021  08:32pm",
      variant: "copy",
    },
    {
      key: 3,
      name: "Merchant ID",
      value: "AP-ab84jk03",
      variant: "copy",
    },
    {
      key: 4,
      name: "Merchant name",
      value: "Rachel Washington",
      variant: "copy",
    },
    {
      key: 5,
      name: "Total transaction amount",
      value: "NGN 900,000",
      variant: "copy",
    },
    {
      key: 6,
      name: "Total fee",
      value: "NGN 900,000",
      variant: "copy",
    },
    {
      key: 7,
      name: "Settlement type",
      value: "Bank account",
      variant: "copy",
    },
    {
      key: 8,
      name: "Settlement bank",
      value: "Zenith bank",
      variant: "copy",
    },
    {
      key: 9,
      name: "Bank code",
      value: "977",
      variant: "copy",
    },
    {
      key: 10,
      name: "Account number",
      value: "1234567890",
      variant: "copy",
    },
  ],
};

// account setup
export const accountRegisterSetup = [
  {
    id: 1,
    title: "Verify your email address",
    desc: "Click on the verification link sent to your email address. You can resend the link if you did not get it.",
  },
  {
    id: 2,
    title: "Contact Information",
    desc: "Please provide details for a contact person if we need to get in touch.",
    Component: ContactInformation,
    drawalTitle: "Contact Information",
  },
  {
    id: 3,
    title: "Business Registration (KYC)",
    desc: "Please provide your business’ registration documents.",
    Component: BusinessRegistration,
    drawalTitle: "Business Registration",
  },
  {
    id: 4,
    title: "Business Information",
    Component: BusinessInformation,
    drawalTitle: "Business Information",
    desc: "Please provide a few details to help us verify your identity.",
  },
  {
    id: 5,
    title: "Bank Details",
    desc: "Please provide bank details of your preferred settlement account.",
    Component: BankDetails,
    drawalTitle: "Bank Details",
  },
  {
    id: 6,
    title: "Terms and Conditions",
    desc: "Read and agree to our terms and conditions of use.",
    Component: Legal,
    drawalTitle: "Terms and Conditions",
  },
  {
    id: 7,
    title: "Take dashboard tour (optional)",
    desc: "Learn about the awesome things that you can do on your new dashboard.",
  },
];

// account setup
export const accountPersonalSetup = [
  {
    id: 1,
    title: "Verify your email address",
    desc: "Click on the verification link sent to your email address. You can resend the link if you did not get it.",
  },
  {
    id: 2,
    title: "Personal Information",
    desc: "Please provide a few details to help us verify your identity.",
    Component: PersonalInformation,
    drawalTitle: "Personal Information",
  },
  {
    id: 3,
    title: "Business Information",
    Component: BusinessInformation,
    drawalTitle: "Business Information",
    desc: "Please provide a few details to help us verify your identity.",
  },
  {
    id: 4,
    title: "Bank Details",
    desc: "Please provide bank details of your preferred settlement account.",
    Component: BankDetails,
    drawalTitle: "Bank Details",
  },
  {
    id: 5,
    title: "Terms and Conditions",
    desc: "Read and agree to our terms and conditions of use.",
    Component: Legal,
    drawalTitle: "Terms and Conditions",
  },
  {
    id: 6,
    title: "Take dashboard tour (optional)",
    desc: "Learn about the awesome things that you can do on your new dashboard.",
  },
];
