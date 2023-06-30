import Cookies from "js-cookie";
import Router from "next/router";
import localforage from "localforage";
import axios from "axios";

import {
  catchErrors,
  notifyErrorHandler,
  resolveErrorMsg,
} from "./catchErrors";
import baseUrl from "./baseUrl";

export const RedirectNonGenUser = (ctx) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: `/?next=${ctx.req.url}` });
    ctx.res.end();
  }
};

export const sendOtp = async (email_address) => {
  const payload = {
    type: "sms",
  };
  try {
    const url = `${baseUrl}/api/v1/customers/customer/login/otp/send/${email_address}`;
    const { status } = await axios.post(url, payload);
    if (status === 200) {
      const toastConfig = {
        type: "success",
        title: `OTP Sent Successfully`,
        msg: `Enter the one-time password sent to you below`,
      };
      // newToast(toastConfig);
    }
  } catch (error) {
    // catchErrors(error, setError);
    notifyErrorHandler({
      type: "error",
      title: "Verification Error",
      msg: error,
      duration: 5000,
    });
  }
};

export const checkNewDevice = (email_address) => {
  // check if device is verified
  const deviceVerified = localStorage.getItem("remember-device");
  if (!deviceVerified || deviceVerified === null) {
    sendOtp(email_address);
    return Router.push("/user/verify");
  }
  return Router.push("/");
};

export const loginHandler = async (data, fundRefId) => {
  clearCacheHandler();
  const { next } = Router.query;

  const { business_type, verification_status } =
    data?.subsidiary_details?.subsidiaries?.find((elem) => elem?.is_default) ??
    {};

  localforage.setItem("user", { ...data });
  localforage.setItem("key", data.token.access_token);

  const tempToken = Cookies.get("token");
  if (tempToken) Cookies.remove("token");

  Cookies.set("token", data.token.access_token);

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${data.token.access_token}`;

  if (verification_status?.toLowerCase() === "active") {
    return Router.push("/dashboard");
  }

  if (data?.route_to_get_started && !business_type) {
    return Router.push("/onboarding");
  }

  return Router.push(
    `/onboarding/setup?type=${
      business_type?.toLowerCase() === "company" ? "registered" : "unregistered"
    }`
  );
};

export const setSignUpToken = async (data, fundRefId) => {
  localforage.setItem("user", { ...data });
  localforage.setItem("key", data.token.access_token);

  const tempToken = Cookies.get("token");
  if (tempToken) Cookies.remove("token");
  Cookies.set("token", data.token.access_token);

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${data.token.access_token}`;

  // --- If the logged in email has a pending fund user request recently ---
  // if (fundRefId !== null && fundRefId.length) {
  //   redirectBackToFundUser(fundRefId)
  // }
};

export const fundingHandler = (data) => {
  localforage.setItem("user", { ...data, key: data.token.access_token });
  const tempToken = Cookies.get("token");
  if (tempToken) Cookies.remove("token");
  Cookies.set("token", data.token.access_token);

  axios.defaults.headers.common["Authorization"] = `Bearer ${
    data.token.access_token ?? "just4"
  }`;

  setTimeout(() => {
    const body = document.querySelector("body");
    const counterBtn = document.getElementById("step-counter-button");
    const counterBar = document.querySelector("#step-counter .step-counter2");
    const counterIndicator = document.querySelector(".progress-1");

    if (body) body.style.background = "#ffffff";
    if (counterBtn) counterBtn.style.background = "#f9e1b8";
    if (counterBar) counterBar.style.background = "#f8f5ff";
    if (counterIndicator) counterIndicator.innerHTML = "1";
    // Router.push('/complete-request')

    console.log("successful...");
  }, 5500);
};

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location).then((r) => {
      console.log("User redirected:", r);
    });
  }
};

export const clearCacheHandler = () => {
  Cookies.remove("token");
  localforage.removeItem("store");
  localforage.removeItem("user");
  localforage.removeItem("key");
};

export const logoutHandler = async () => {
  clearCacheHandler();
  window.location = "/";
};

export const logoutWTokenHandler = async () => {
  try {
    const url = `${baseUrl}/dashboard/logout`;
    const { status } = await axios.post(url);
    if (status === 200) {
      clearCacheHandler();
      window.location = "/";
    }
  } catch (error) {
    catchErrors(error);
    let { errorMsg } = resolveErrorMsg(error);
    notifyErrorHandler({
      type: "error",
      title: errorMsg,
      msg: error,
      duration: 5000,
    });
  }
};

export const censor = (censor) => {
  let i = 0;

  return function (key, value) {
    if (
      i !== 0 &&
      typeof censor === "object" &&
      typeof value == "object" &&
      censor == value
    )
      return "[Circular]";

    if (i >= 29)
      // serialize and clone maximum of 30 serialized objects or return unknown
      return "[Unknown]";

    ++i; // so we know we aren't using the original object anymore

    return value;
  };
};
