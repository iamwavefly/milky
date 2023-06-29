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
    email: yup
      .string()
      .email()
      .required("Email address is required")
      .nullable(),
    password: yup
      .string()
      .password()
      .required("Password is required")
      .nullable(),
    password2: yup
      .string()
      .password()
      .required("Confirm password is required".nullable())
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
// getStarted
export const getStarted = () =>
  yup.object({
    businessName: yup
      .string("Enter your business name")
      .required("Business name is required")
      .nullable(),
    businessLocation: yup
      .string("Select your business location")
      .required("Business location is required")
      .nullable(),
    businessSize: yup
      .string("Select your business size")
      .required("Business size is required")
      .nullable(),
    businessCategory: yup
      .string("Select your business category")
      .required("Business type is required")
      .nullable(),
    referralCode: yup.string(),
  });
// contact information
export const contactInformation = () =>
  yup.object({
    firstName: yup
      .string("Enter first name")
      .required("First name is required")
      .nullable(),
    lastName: yup
      .string("Enter last name")
      .required("Last name is required")
      .nullable(),
    phoneNumber: yup
      .string("Enter phone number")
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required")
      .nullable(),
  });
// business registration
export const businessRegistration = () =>
  yup.object({
    businessClass: yup
      .string("Select your business class")
      .required("Business class is required")
      .nullable(),
    taxIdNumber: yup
      .string("Enter your business Tax identification number")
      .required("Business Tax identification number is required")
      .nullable(),
  });

const passportSchema = yup.object({});

export const companyOwnershipSchema = () =>
  yup.object({
    fullName: yup
      .string("Enter full name")
      .required("Full name is required")
      .nullable(),
    role: yup.string("Select role").required("Role is required").nullable(),
    ownership: yup
      .string("Enter ownership percentage")
      .required("Ownership percentage required")
      .nullable(),
    dob: yup
      .string("Enter date of birth")
      .required("Date of birth required")
      .nullable(),
    email: yup
      .string("Enter email address")
      .required("Email address is required")
      .nullable(),
    phoneNumber: yup
      .string("Enter phone number")
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required")
      .nullable(),
    address: yup
      .string("Enter address")
      .required("address is required")
      .nullable(),
    nationality: yup
      .string("Select nationality")
      .required("Nationality required")
      .nullable(),
    identityType: yup
      .string("Select identity type")
      .required("Identity type is required")
      .nullable(),

    // ----- Identity types form -----
    countryIssue: yup.string("Select country of issue").when("identityType", {
      is: 1,
      then: yup.string().required("Country of issue is required").nullable(),
    }),
    passportNumber: yup.string("Enter passport number").when("identityType", {
      is: 1,
      then: yup.string().required("Passport number is required").nullable(),
    }),
    passportExpiryDate: yup
      .string("Enter passport expiry date")
      .when("identityType", {
        is: 1,
        then: yup
          .string()
          .required("Passport expiry date is required")
          .nullable(),
      }),

    ssn: yup.string("Enter sssn").when("identityType", {
      is: 2,
      then: yup.string().required("ssn is required").nullable(),
    }),

    acceptPolily: yup
      .string("accept policy")
      .required("Please indicate that you are legally authorized")
      .nullable(),
  });

export const personalInfoSchema = () =>
  yup.object({
    firstName: yup
      .string("Enter first name name")
      .required("First name is required")
      .nullable(),
    lastName: yup
      .string("Enter last name name")
      .required("Last name is required")
      .nullable(),
    email: yup
      .string("Enter email address")
      .email("Invalid email address")
      .required("Email address is required")
      .nullable(),
    phoneNumber: yup
      .string("Enter phone number")
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required")
      .nullable(),
    password: yup
      .string("Enter password")
      .required("Password is required".nullable())
      .password(),
    genPolily: yup
      .string("accept policy")
      .required("Please accept gen policy")
      .nullable(),
    synapsePolily: yup
      .string("accept policy")
      .required("Please accept synapse policy")
      .nullable(),
  });

export const LoginSchema = () =>
  yup.object({
    email: yup
      .string("Enter email address")
      .email("Invalid email address")
      .required("Email address is required")
      .nullable(),
    password: yup
      .string("Enter password")
      .required("Password is required")
      .nullable(),
    remember: yup.bool("check this field"),
  });

export const DocUploadSchema = () =>
  yup.object({
    companyStructure: yup
      .string("Select company structure")
      .required("Company structure is required")
      .nullable(),
  });

// business registration
export const bankDetails = () =>
  yup.object({
    accountType: yup.string().required("Account type is required").nullable(),
    bankName: yup.string().required("Bank name is required").nullable(),
    accountNumber: yup
      .string()
      .required("Account number is required")
      .nullable(),
    accountName: yup.string().required("Account name is required").nullable(),
  });

// business information
export const businessInformation = () =>
  yup.object({
    description: yup.string().required("Description is required").nullable(),
    emailAddress: yup.string().required("Email address is required").nullable(),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required")
      .nullable(),
    address: yup.string().required("Address is required").nullable(),
    city: yup.string().required("City is required").nullable(),
    state: yup.string().required("State is required").nullable(),
    website: yup.string(),
    facebook: yup.string(),
    instagram: yup.string(),
    twitter: yup.string(),
  });
// personal information
export const personalInformation = () =>
  yup.object({
    firstName: yup.string().required("First name is required").nullable(),
    lastName: yup.string().required("Last name is required").nullable(),
    bvn: yup.string().required("BVN is required").nullable(),
    gender: yup.string().required("Gender is required").nullable(),
    dob: yup.string().required("Date of birth required").nullable(),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required")
      .nullable(),
    identificationDocument: yup
      .string()
      .required("Identification document type is required")
      .nullable(),
    identificationNumber: yup
      .string()
      .matches(/^[a-zA-Z0-9]+$/, "Document number is not valid")
      .required("Identification document number is required")
      .nullable(),
  });

// getStarted
export const invoiceBusinessDetails = () =>
  yup.object({
    companyName: yup.string().required("Company name is required").nullable(),
    companyEmail: yup
      .string()
      .email()
      .required("Company email address is required")
      .nullable(),
    customerName: yup.string().required("Customer name is required").nullable(),
    customerEmail: yup
      .string()
      .email()
      .required("Customer email address is required")
      .nullable(),
  });

export const invoiceDetails = () =>
  yup.object({
    invoiceTitle: yup.string().required("Invoice title is required").nullable(),
    dueDate: yup.date().required("Due date is required").nullable(),
    currency: yup.string().required("Currency is required").nullable(),
    note: yup.string(),
    discount: yup.number(),
    tax: yup.number(),
    quantity: yup.number().required("Quantity is required").nullable(),
    amount: yup.number().required("Amount is required").nullable(),
    description: yup.string().required("Description is required").nullable(),
  });

// new customer
export const newCustomer = () =>
  yup.object({
    firstName: yup.string().required("First name is required").nullable(),
    lastName: yup.string(),
    emailAddress: yup.string().required("Email address is required").nullable(),
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
    country: yup.string().required("Country is required").nullable(),
    role: yup.string().required("Role is required").nullable(),
  });
// new role
export const newRole = () =>
  yup.object({
    name: yup.string().required("Role name is required").nullable(),
  });

// new payment link
export const newPaymentLink = () =>
  yup.object({
    linkName: yup.string().required("Link name is required").nullable(),
    description: yup.string(),
    limit: yup.string(),
    paymentType: yup.string().required("Payment type is required").nullable(),
    amount: yup.string().required("Amount is required").nullable(),
  });
// new payment link
export const newTransfer = () =>
  yup.object({
    currency: yup.string().required("Currency is required").nullable(),
    account: yup.string(),
    beneficiary: yup.string().required("Beneficiary is required").nullable(),
    amount: yup.string().required("Transfer amount is required").nullable(),
    beneficiaryName: yup
      .string()
      .required("Beneficiary name is required")
      .nullable(),
    bank: yup.string().required("Bank name is required").nullable(),
    narration: yup.string(),
  });
// new beneficiary
export const beneficiary = () =>
  yup.object({
    currency: yup.string().required("Currency is required").nullable(),
    accountNumber: yup
      .string()
      .required("Account number is required")
      .nullable(),
    accountName: yup.string().required("Account name is required").nullable(),
    bank: yup.string().required("Bank name is required").nullable(),
    type: yup.string(),
  });

// new payment link
export const newVirtualAccount = () =>
  yup.object({
    bvn: yup.string().required("BVN is required").nullable(),
  });

// new refund
export const newRefund = () =>
  yup.object({
    amount: yup.string().required("Amount is required").nullable(),
    reference: yup
      .string()
      .required("Transaction reference is required")
      .nullable(),
    reason: yup.string().required("Reason for refund is required").nullable(),
  });

// new product
export const newProduct = () =>
  yup.object({
    productName: yup.string().required("Product name is required").nullable(),
    productDescription: yup
      .string()
      .required("Product description is required")
      .nullable(),
    price: yup.number().required("Price is required").nullable(),
    quantity: yup.number().required("Quantity is required").nullable(),
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
    businessName: yup.string().required("Business name is required").nullable(),
    businessEmail: yup
      .string()
      .email()
      .required("Business email is required")
      .nullable(),
    businessType: yup.string().required("Business type is required").nullable(),
    country: yup.string().required("Country is required").nullable(),
    industry: yup.string().required("Industry is required").nullable(),
    legalName: yup
      .string()
      .required("Legal business name is required")
      .nullable(),
    description: yup.string().required("Description is required").nullable(),
  });
// change password settings
export const ChangePassword = () =>
  yup.object({
    oldPassword: yup
      .string()
      .password()
      .required("Old password is required")
      .nullable(),
    password: yup
      .string()
      .password()
      .required("Password is required")
      .nullable(),
    password2: yup
      .string()
      .password()
      .required("Confirm password is required".nullable())
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
