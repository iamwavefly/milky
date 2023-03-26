import * as yup from "yup";

import YupPassword from "yup-password";
import "yup-phone";

YupPassword(yup);

export const companyInfoSchema = () =>
  yup.object({
    companyName: yup
      .string("Enter your company name")
      .required("Company name is required"),
    companyType: yup
      .string("Select your company type")
      .required("Company type is required"),
    formationDate: yup
      .string("Select your company formation date")
      .required("Company formation date is required"),
    ein: yup
      .string("Enter your company EIN")
      .required("Company EIN is required"),
    duns: yup
      .string("Enter your company DUNS")
      .required("Company DUNS is required"),
    address: yup
      .string("Enter your business address")
      .required("Business address is required"),
    phoneNumber: yup
      .string("Enter your business phone number")
      .phone("errorMessage", true, "Invalid phone number")
      .required("Company phone number is required"),
    industry: yup
      .string("Select industry")
      .required("Company industry is required"),
    bio: yup
      .string("Enter your company bio")
      .min(20, "Bio cannot be less than 20 characters or more than 280")
      .max(280, "Bio cannot be less than 20 characters or more than 280")
      .required("Bio is required"),
    acceptPolily: yup
      .bool("Check this field")
      .required("Please indicate that you are legally authorized"),
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
