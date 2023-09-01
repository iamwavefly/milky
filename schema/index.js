import * as yup from "yup";

import YupPassword from "yup-password";

const phoneRegExp = /^\+(?:[0-9]){1,3}[0-9]{8,10}$/;

YupPassword(yup);
// getStarted
export const signup = () =>
  yup.object({
    businessName: yup.string().required("Business name is required").nullable(),
    firstName: yup.string().required("First name is required").nullable(),
    lastName: yup.string().required("Last name is required").nullable(),
    emailAddress: yup
      .string()
      .email()
      .nullable()
      .required("Email address is required"),
    password: yup
      .string()
      .password()
      .nullable()
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .password()
      .nullable()
      .required("Confirm password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
// getStarted
export const getStarted = () =>
  yup.object({
    businessLocation: yup
      .string("Select your business location")
      .nullable()
      .required("Business location is required"),
    businessSize: yup
      .string("Select your business size")
      .nullable()
      .required("Business size is required"),
    businessCategory: yup
      .string("Select your business category")
      .nullable()
      .required("Business type is required"),
    isDeveloper: yup.string().nullable(),
    referralCode: yup.string().nullable(),
  });
// contact information
export const contactInformation = () =>
  yup.object({
    firstName: yup
      .string("Enter first name")
      .nullable()
      .required("First name is required"),
    lastName: yup
      .string("Enter last name")
      .nullable()
      .required("Last name is required"),
    phoneNumber: yup
      .string("Enter phone number")
      .matches(phoneRegExp, "Phone number is not valid")
      .nullable()
      .required("Phone number is required"),
  });
// business registration
export const businessRegistration = () =>
  yup.object({
    businessClass: yup
      .string("Select your business class")
      .nullable()
      .required("Business class is required"),
    taxIdNumber: yup
      .string("Enter your business Tax identification number")
      .nullable()
      .required("Business Tax identification number is required"),
  });

const passportSchema = yup.object({});

export const companyOwnershipSchema = () =>
  yup.object({
    fullName: yup
      .string("Enter full name")
      .nullable()
      .required("Full name is required"),
    role: yup.string("Select role").required("Role is required").nullable(),
    ownership: yup
      .string("Enter ownership percentage")
      .nullable()
      .required("Ownership percentage required"),
    dob: yup
      .string("Enter date of birth")
      .nullable()
      .required("Date of birth required"),
    email: yup
      .string("Enter email address")
      .nullable()
      .required("Email address is required"),
    phoneNumber: yup
      .string("Enter phone number")
      .matches(phoneRegExp, "Phone number is not valid")
      .nullable()
      .required("Phone number is required"),
    address: yup
      .string("Enter address")
      .nullable()
      .required("address is required"),
    nationality: yup
      .string("Select nationality")
      .nullable()
      .required("Nationality required"),
    identityType: yup
      .string("Select identity type")
      .nullable()
      .required("Identity type is required"),

    // ----- Identity types form -----
    countryIssue: yup.string("Select country of issue").when("identityType", {
      is: 1,
      then: yup.string().nullable().required("Country of issue is required"),
    }),
    passportNumber: yup.string("Enter passport number").when("identityType", {
      is: 1,
      then: yup.string().nullable().required("Passport number is required"),
    }),
    passportExpiryDate: yup
      .string("Enter passport expiry date")
      .when("identityType", {
        is: 1,
        then: yup
          .string()
          .nullable()
          .required("Passport expiry date is required"),
      }),

    ssn: yup.string("Enter sssn").when("identityType", {
      is: 2,
      then: yup.string().nullable().required("ssn is required"),
    }),

    acceptPolily: yup
      .string("accept policy")
      .nullable()
      .required("Please indicate that you are legally authorized"),
  });

export const personalInfoSchema = () =>
  yup.object({
    firstName: yup
      .string("Enter first name name")
      .nullable()
      .required("First name is required"),
    lastName: yup
      .string("Enter last name name")
      .nullable()
      .required("Last name is required"),
    email: yup
      .string("Enter email address")
      .email("Invalid email address")
      .nullable()
      .required("Email address is required"),
    phoneNumber: yup
      .string("Enter phone number")
      .matches(phoneRegExp, "Phone number is not valid")
      .nullable()
      .required("Phone number is required"),
    password: yup
      .string("Enter password")
      .password()
      .required("Password is required".nullable()),
    genPolily: yup
      .string("accept policy")
      .nullable()
      .required("Please accept gen policy"),
    synapsePolily: yup
      .string("accept policy")
      .nullable()
      .required("Please accept synapse policy"),
  });

export const LoginSchema = () =>
  yup.object({
    email: yup
      .string("Enter email address")
      .email("Invalid email address")
      .nullable()
      .required("Email address is required"),
    password: yup
      .string("Enter password")
      .nullable()
      .required("Password is required"),
    remember: yup.bool("check this field"),
  });

export const DocUploadSchema = () =>
  yup.object({
    companyStructure: yup
      .string("Select company structure")
      .nullable()
      .required("Company structure is required"),
  });

// business registration
export const bankDetails = () =>
  yup.object({
    accountType: yup.string().nullable().required("Account type is required"),
    bankName: yup.string().nullable().required("Bank name is required"),
    accountNumber: yup
      .string()
      .nullable()
      .required("Account number is required"),
    accountName: yup.string().nullable().required("Account name is required"),
  });

// business information
export const businessInformation = () =>
  yup.object({
    description: yup.string().nullable().required("Description is required"),
    emailAddress: yup.string().nullable().required("Email address is required"),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .nullable()
      .required("Phone number is required"),
    address: yup.string().nullable().required("Address is required"),
    city: yup.string().nullable().required("City is required"),
    state: yup.string().nullable().required("State is required"),
    website: yup.string(),
    facebook: yup.string(),
    instagram: yup.string(),
    twitter: yup.string(),
  });
// personal information
export const personalInformation = () =>
  yup.object({
    firstName: yup.string().nullable().required("First name is required"),
    lastName: yup.string().nullable().required("Last name is required"),
    bvn: yup.string().nullable().required("BVN is required"),
    gender: yup.string().nullable().required("Gender is required"),
    dob: yup.string().nullable().required("Date of birth required"),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .nullable()
      .required("Phone number is required"),
    identificationDocument: yup
      .string()
      .nullable()
      .required("Identification document type is required"),
    identificationNumber: yup
      .string()
      .matches(/^[a-zA-Z0-9]+$/, "Document number is not valid")
      .nullable()
      .required("Identification document number is required"),
  });

// getStarted
export const invoiceBusinessDetails = () =>
  yup.object({
    companyName: yup.string().required("Company name is required").nullable(),
    companyEmail: yup
      .string()
      .email()
      .nullable()
      .required("Company email address is required"),
    customerName: yup.string().required("Customer name is required").nullable(),
    customerEmail: yup
      .string()
      .email()
      .nullable()
      .required("Customer email address is required"),
  });

export const invoiceDetails = () =>
  yup.object({
    invoiceTitle: yup.string().nullable().required("Invoice title is required"),
    dueDate: yup.date().nullable().required("Due date is required"),
    currency: yup.string().nullable().required("Currency is required"),
    note: yup.string(),
    discount: yup.number(),
    tax: yup.number(),
    quantity: yup.number().nullable().required("Quantity is required"),
    amount: yup.number().nullable().required("Amount is required"),
    description: yup.string().nullable().required("Description is required"),
  });

// new customer
export const newCustomer = () =>
  yup.object({
    firstName: yup.string().nullable().required("First name is required"),
    lastName: yup.string(),
    emailAddress: yup.string().nullable().required("Email address is required"),
    phoneNumber: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  });

// new user
export const newUser = () =>
  yup.object({
    firstName: yup.string().required("First name is required").nullable(),
    lastName: yup.string().required("Last name is required").nullable(),
    emailAddress: yup.string().required("Email address is required").nullable(),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required")
      .nullable(),
    country: yup.string().nullable().required("Country is required"),
    role: yup.string().nullable().required("Role is required"),
  });
// new user
export const newSubsidiary = () =>
  yup.object({
    name: yup.string().nullable().required("Subsidiary name is required"),
    emailAddress: yup
      .string()
      .email()
      .nullable()
      .required("Email address is required"),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .nullable()
      .required("Phone number is required"),
    country: yup.string().nullable().required("Country is required"),
    businessType: yup.string().nullable().required("Business type is required"),
    description: yup.string().nullable().required("Description is required"),
    default: yup.boolean().nullable(),
  });
// new role
export const newRole = () =>
  yup.object({
    name: yup.string().nullable().required("Role name is required"),
  });

// new payment link
export const newPaymentLink = () =>
  yup.object({
    linkName: yup.string().nullable().required("Link name is required"),
    description: yup.string(),
    limit: yup.string(),
    paymentType: yup.string().nullable().required("Payment type is required"),
    amount: yup.string().nullable().required("Amount is required"),
    currency: yup.string().nullable().required("Currency is required"),
  });
// new payment link
export const newTransfer = () =>
  yup.object({
    currency: yup.string().nullable().required("Currency is required"),
    account: yup.string(),
    beneficiary: yup.string().nullable().required("Beneficiary is required"),
    amount: yup.string().nullable().required("Transfer amount is required"),
    beneficiaryName: yup
      .string()
      .nullable()
      .required("Beneficiary name is required"),
    bank: yup.string().nullable().required("Bank name is required"),
    narration: yup.string(),
  });
// new beneficiary
export const beneficiary = () =>
  yup.object({
    currency: yup.string().nullable().required("Currency is required"),
    accountNumber: yup
      .string()
      .nullable()
      .required("Account number is required"),
    accountName: yup.string().nullable().required("Account name is required"),
    bank: yup.string().nullable().required("Bank name is required"),
    type: yup.string(),
  });

// new payment link
export const newVirtualAccount = () =>
  yup.object({
    bvn: yup.string().nullable().required("BVN is required"),
  });

// new refund
export const newRefund = () =>
  yup.object({
    amount: yup.string().nullable().required("Amount is required"),
    reference: yup
      .string()
      .nullable()
      .required("Transaction reference is required"),
    reason: yup.string().nullable().required("Reason for refund is required"),
  });

// new product
export const newProduct = () =>
  yup.object({
    productName: yup.string().nullable().required("Product name is required"),
    productDescription: yup
      .string()
      .nullable()
      .required("Product description is required"),
    price: yup.number().nullable().required("Price is required"),
    quantity: yup.number().nullable().required("Quantity is required"),
    containsPhysicalGoods: yup.boolean(),
    deliveryAddressRequired: yup.boolean(),
    deliveryNoteRequired: yup.boolean(),
    onDeal: yup.boolean(),
    dealPrice: yup.number(),
    url: yup.string(),
  });
// business information settings
export const settingBusiness = () =>
  yup.object({
    businessName: yup.string().nullable().required("Business name is required"),
    businessEmail: yup
      .string()
      .email()
      .nullable()
      .required("Business email is required"),
    businessType: yup.string().nullable().required("Business type is required"),
    country: yup.string().nullable().required("Country is required"),
    industry: yup.string().nullable().required("Industry is required"),
    legalName: yup
      .string()
      .nullable()
      .required("Legal business name is required"),
    description: yup.string().nullable().required("Description is required"),
  });
// change password settings
export const ChangePassword = () =>
  yup.object({
    oldPassword: yup
      .string()
      .password()
      .nullable()
      .required("Old password is required"),
    password: yup
      .string()
      .password()
      .nullable()
      .required("Password is required"),
    password2: yup
      .string()
      .password()
      .nullable()
      .required("Confirm password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
