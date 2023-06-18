import * as yup from "yup";

import YupPassword from "yup-password";
import "yup-phone";

YupPassword(yup);
// getStarted
export const signup = () =>
  yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email().required("Email address is required"),
    password: yup.string().password().required("Password is required"),
    password2: yup
      .string()
      .password()
      .required("Confirm password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
// getStarted
export const getStarted = () =>
  yup.object({
    businessName: yup
      .string("Enter your business name")
      .required("Business name is required"),
    businessLocation: yup
      .string("Select your business location")
      .required("Business location is required"),
    businessSize: yup
      .string("Select your business size")
      .required("Business size is required"),
    businessCategory: yup
      .string("Select your business category")
      .required("Business type is required"),
    referralCode: yup.string(),
  });
// contact information
export const contactInformation = () =>
  yup.object({
    firstName: yup
      .string("Enter first name")
      .required("First name is required"),
    lastName: yup.string("Enter last name").required("Last name is required"),
    phoneNumber: yup
      .string("Enter phone number")
      .required("Phone number is required"),
  });
// business registration
export const businessRegistration = () =>
  yup.object({
    businessClass: yup
      .string("Select your business class")
      .required("Business class is required"),
    taxIdNumber: yup
      .string("Enter your business Tax identification number")
      .required("Business Tax identification number is required"),
  });

const passportSchema = yup.object({});

export const companyOwnershipSchema = () =>
  yup.object({
    fullName: yup.string("Enter full name").required("Full name is required"),
    role: yup.string("Select role").required("Role is required"),
    ownership: yup
      .string("Enter ownership percentage")
      .required("Ownership percentage required"),
    dob: yup.string("Enter date of birth").required("Date of birth required"),
    email: yup
      .string("Enter email address")
      .required("Email address is required"),
    phoneNumber: yup
      .string("Enter phone number")
      .phone("errorMessage", true, "Invalid phone number")
      .required("Phone number is required"),
    address: yup.string("Enter address").required("address is required"),
    nationality: yup
      .string("Select nationality")
      .required("Nationality required"),
    identityType: yup
      .string("Select identity type")
      .required("Identity type is required"),

    // ----- Identity types form -----
    countryIssue: yup.string("Select country of issue").when("identityType", {
      is: 1,
      then: yup.string().required("Country of issue is required"),
    }),
    passportNumber: yup.string("Enter passport number").when("identityType", {
      is: 1,
      then: yup.string().required("Passport number is required"),
    }),
    passportExpiryDate: yup
      .string("Enter passport expiry date")
      .when("identityType", {
        is: 1,
        then: yup.string().required("Passport expiry date is required"),
      }),

    ssn: yup.string("Enter sssn").when("identityType", {
      is: 2,
      then: yup.string().required("ssn is required"),
    }),

    acceptPolily: yup
      .string("accept policy")
      .required("Please indicate that you are legally authorized"),
  });

export const personalInfoSchema = () =>
  yup.object({
    firstName: yup
      .string("Enter first name name")
      .required("First name is required"),
    lastName: yup
      .string("Enter last name name")
      .required("Last name is required"),
    email: yup
      .string("Enter email address")
      .email("Invalid email address")
      .required("Email address is required"),
    phoneNumber: yup
      .string("Enter phone number")
      .phone("errorMessage", true, "Invalid phone number")
      .required("Phone number is required"),
    password: yup
      .string("Enter password")
      .required("Password is required")
      .password(),
    genPolily: yup.string("accept policy").required("Please accept gen policy"),
    synapsePolily: yup
      .string("accept policy")
      .required("Please accept synapse policy"),
  });

export const LoginSchema = () =>
  yup.object({
    email: yup
      .string("Enter email address")
      .email("Invalid email address")
      .required("Email address is required"),
    password: yup.string("Enter password").required("Password is required"),
    remember: yup.bool("check this field"),
  });

export const DocUploadSchema = () =>
  yup.object({
    companyStructure: yup
      .string("Select company structure")
      .required("Company structure is required"),
  });

// business registration
export const bankDetails = () =>
  yup.object({
    accountType: yup.string().required("Account type is required"),
    bankName: yup.string().required("Bank name is required"),
    accountNumber: yup.string().required("Account number is required"),
    accountName: yup.string().required("Account name is required"),
  });

// business information
export const businessInformation = () =>
  yup.object({
    description: yup.string().required("Description is required"),
    emailAddress: yup.string().required("Email address is required"),
    phoneNumber: yup.string().required("Phone number is required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    website: yup.string(),
    facebook: yup.string(),
    instagram: yup.string(),
    twitter: yup.string(),
  });
// personal information
export const personalInformation = () =>
  yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    bvn: yup.string().required("BVN is required"),
    gender: yup.string().required("Gender is required"),
    dob: yup.string().required("Date of birth required"),
    phoneNumber: yup.string().required("Phone number is required"),
    identificationDocument: yup
      .string()
      .required("Identification document type is required"),
    identificationNumber: yup
      .string()
      .required("Identification document number is required"),
  });

// getStarted
export const invoiceBusinessDetails = () =>
  yup.object({
    companyName: yup.string().required("Company name is required"),
    companyEmail: yup
      .string()
      .email()
      .required("Company email address is required"),
    customerName: yup.string().required("Customer name is required"),
    customerEmail: yup
      .string()
      .email()
      .required("Customer email address is required"),
  });

export const invoiceDetails = () =>
  yup.object({
    invoiceTitle: yup.string().required("Invoice title is required"),
    dueDate: yup.date().required("Due date is required"),
    currency: yup.string().required("Currency is required"),
    note: yup.string(),
    discount: yup.number(),
    tax: yup.number(),
    quantity: yup.number().required("Quantity is required"),
    amount: yup.number().required("Amount is required"),
    description: yup.string().required("Description is required"),
  });

// new customer
export const newCustomer = () =>
  yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string(),
    emailAddress: yup.string().required("Email address is required"),
    phoneNumber: yup.string(),
  });

// new user
export const newUser = () =>
  yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    emailAddress: yup.string().required("Email address is required"),
    phoneNumber: yup.string().required("Phone number is required"),
    country: yup.string().required("Country is required"),
    role: yup.string().required("Role is required"),
  });
// new role
export const newRole = () =>
  yup.object({
    name: yup.string().required("Role name is required"),
  });

// new payment link
export const newPaymentLink = () =>
  yup.object({
    linkName: yup.string().required("Link name is required"),
    description: yup.string(),
    paymentType: yup.string().required("Payment type is required"),
    amount: yup.string().required("Amount is required"),
  });
// new payment link
export const newTransfer = () =>
  yup.object({
    currency: yup.string().required("Currency is required"),
    account: yup.string().required("Account is required"),
    beneficiary: yup.string().required("Beneficiary is required"),
    amount: yup.string().required("Transfer amount is required"),
    beneficiaryName: yup.string().required("Beneficiary name is required"),
    bank: yup.string().required("Bank name is required"),
    narration: yup.string(),
  });

// new payment link
export const newVirtualAccount = () =>
  yup.object({
    bvn: yup.string().required("BVN is required"),
  });

// new refund
export const newRefund = () =>
  yup.object({
    amount: yup.string().required("Amount is required"),
    reference: yup.string().required("Transaction reference is required"),
    reason: yup.string().required("Reason for refund is required"),
  });

// new product
export const newProduct = () =>
  yup.object({
    productName: yup.string().required("Product name is required"),
    productDescription: yup
      .string()
      .required("Product description is required"),
    price: yup.number().required("Price is required"),
    quantity: yup.number().required("Quantity is required"),
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
    businessName: yup.string().required("Business name is required"),
    businessEmail: yup.string().email().required("Business email is required"),
    businessType: yup.string().required("Business type is required"),
    country: yup.string().required("Country is required"),
    industry: yup.string().required("Industry is required"),
    legalName: yup.string().required("Legal business name is required"),
    description: yup.string().required("Description is required"),
  });
// change password settings
export const ChangePassword = () =>
  yup.object({
    oldPassword: yup.string().password().required("Old password is required"),
    password: yup.string().password().required("Password is required"),
    password2: yup
      .string()
      .password()
      .required("Confirm password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
