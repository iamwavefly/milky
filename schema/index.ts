import * as yup from "yup";

const phoneRegExp = /^\+(?:[0-9]){1,3}[0-9]{8,10}$/;

export const checkoutSchema = () =>
  yup.object({
    firstName: yup.string().required("First name is required").nullable(),
    lastName: yup.string().required("Last name is required").nullable(),
    email: yup
      .string()
      .email()
      .required("Email address is required")
      .nullable(),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(phoneRegExp, "Phone number is not valid"),
    address: yup.string().required("Address is required").nullable(),
    country: yup.string().required("Country is required").nullable(),
    state: yup.string().required("State is required").nullable(),
    city: yup.string().required("City is required").nullable(),
    additionalInfo: yup
      .string()
      .required("Addition information is required")
      .nullable(),
    coupon: yup.string(),
  });
