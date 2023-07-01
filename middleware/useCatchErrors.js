import { setToastState } from "@/store/appSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const useCatchErrors = (type, title, msg) => {
  const dispatch = useDispatch();

  let errorMsg = null;

  if (typeof msg === "object") {
    const message = JSON.parse(JSON.stringify(msg));

    if (message?.message === "Network Error") {
      errorMsg = "Network Error. Please check your internet connection";
    } else if (msg?.response?.status === 401) {
      logoutHandler();
      return;
    } else if (Object.entries(msg).length === 0) {
      errorMsg = String(msg);
      return;
    } else if (msg.response) {
      errorMsg = msg?.response?.data?.message;
    } else {
      errorMsg = String(msg);
    }
  }

  const toastConfig = {
    theme: type,
    title,
    active: true,
  };

  dispatch(setToastState(toastConfig));

  return toastConfig;
};

export default useCatchErrors;
