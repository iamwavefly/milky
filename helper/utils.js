import { createStyles, createTheme, makeStyles } from "@material-ui/core";

import { currencyList } from "../localDb/currencyList";
import baseUrl from "../middleware/baseUrl";
import {
  catchErrors,
  notifyErrorHandler,
  resolveErrorMsg,
} from "../middleware/catchErrors";

const moment = require("moment");

export const dataUrlToFile = (dataUrl, fileName) => {
  var arr = dataUrl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
};

export const getFormattedTimeAndDate = (timestamp) => {
  return {
    time: moment(timestamp).format("H:mm a"),
    date: moment(timestamp).format("MMM Do, YYYY"),
  };
};

export const getYearDiff = (timestamp) => {
  console.log("date diff", moment().diff(timestamp, "years", true));
  return moment().diff(timestamp, "years", true);
};

export const checkBelow18YrsDate = (timestamp) => {
  // return moment().diff(timestamp, "years",false);

  if (moment().diff(timestamp, "years", false) < 18) {
    return true;
  }

  return false;
};

export const preventFutureDate = (timestamp) => {
  return {
    time: moment(timestamp).format("H:mm a"),
    date: moment(timestamp).format("MMM Do, YYYY"),
  };
};

export const getTodayAndYesterdayDates = (timestamp) => {
  return {
    today: moment().format("MMM Do, YYYY"),
    yesterday: moment().subtract(1, "days").format("MMM Do, YYYY"),
  };
};

export const getCurrencySymbol = (currency) => {
  let selectedCur = currencyList[currency];
  if (selectedCur === null) {
    // --- return default ---
    return "$";
  }

  return selectedCur?.symbol ? selectedCur?.symbol : "$";
};

export const getLastInflowPercent = (balance, lastInflow) => {
  let prevBalance = balance - lastInflow;
  let rise = (lastInflow * 100) / prevBalance;
  rise = rise.toFixed(1);
  return lastInflow ? `${rise}%` : '0%';
};

export const reArrangeRequestsByDay = (fundRequests) => {
  let today = [];
  let yesterday = [];
  let otherDays = [];
  let last7Days = [];
  let last1Month = [];
  let over1Month = [];

  let todayAndYesterday = getTodayAndYesterdayDates();
  fundRequests.map((item) => {
    let noOfPastDaysBehind = moment().diff(item.date_created, "days", false);
    console.log("notes", item, "days past", noOfPastDaysBehind);

    if (
      moment(item.date_created).format("MMM Do, YYYY") ===
      todayAndYesterday.today
    ) {
      today.push(item);
    } else if (noOfPastDaysBehind === 1) {
      yesterday.push(item);
    } else if (noOfPastDaysBehind >= 2 && noOfPastDaysBehind <= 7) {
      // otherDays.push(item);
      last7Days.push(item);
    } else if (noOfPastDaysBehind > 7 && noOfPastDaysBehind < 30) {
      last1Month.push(item);
    } else {
      over1Month.push(item);
    }
  });

  let response = {
    today,
    yesterday,
    otherDays,
    last1Month,
    last7Days,
    over1Month,
  };

  return response;
};
// --- Created this since we may have multiple instances of flutterwave but same action ---
export const payFlutter = async (
  requestDetails,
  error,
  setError,
  setLoading
) => {
  // payConfig, error, setError, customerDetails,

  const triggerFlutter = async () => {
    try {
      const url = `${baseUrl}​/api/v1/fund/initiate`;
      const payload = {
        amount: String(requestDetails?.request_amount),
        currency: requestDetails?.currency,
        provider_type: "flutterwave",
        type: "web",
      };
      const response = await axios.post(url, payload);
      if (
        response.data.status === "success" &&
        response.data.status_code === "00"
      ) {
        flutterWavePayment(response.data, requestDetails);
      }
    } catch (error) {
      catchErrors(error, setError);
      notifyErrorHandler({
        type: "error",
        title: "Funds Initiate Error",
        msg: error,
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return await triggerFlutter();
};

function customCheckbox(theme) {
  return {
    "& .MuiCheckbox-root svg": {
      width: 16,
      height: 16,
      backgroundColor: "transparent",
      border: `1px solid ${
        theme.palette.mode === "light" ? "#d9d9d9" : "rgb(67, 67, 67)"
      }`,
      borderRadius: 2,
    },
    "& .MuiCheckbox-root svg path": {
      display: "none",
    },
    "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
      backgroundColor: "#1890ff",
      borderColor: "#1890ff",
    },
    "& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after": {
      position: "absolute",
      display: "table",
      border: "2px solid #fff",
      borderTop: 0,
      borderLeft: 0,
      transform: "rotate(45deg) translate(-50%,-50%)",
      opacity: 1,
      transition: "all .2s cubic-bezier(.12,.4,.29,1.46) .1s",
      content: '""',
      top: "50%",
      left: "39%",
      width: 5.71428571,
      height: 9.14285714,
    },
    "& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after":
      {
        width: 8,
        height: 8,
        backgroundColor: "#1890ff",
        transform: "none",
        top: "39%",
        border: 0,
      },
  };
}

const customTheme = {
  palette: { mode: "light" },
};

const defaultTheme = createTheme(customTheme);

export const dataTableStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        border: "none !important",
        background: theme.palette.mode === "light" ? "white" : "#1d1d1d",
        color: theme.palette.mode === "light" ? "#0E093F" : "white",
        fontFamily: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(","),
        WebkitFontSmoothing: "auto",
        letterSpacing: "normal",
        "& .MuiDataGrid-columnsContainer": {
          backgroundColor: theme.palette.mode === "light" ? "white" : "#1d1d1d",
        },
        "& .MuiDataGrid-iconSeparator": {
          display: "none",
        },
        "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
          borderRight: `1px solid ${
            theme.palette.mode === "light" ? "white" : "#303030"
          }`,
        },
        "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
          borderBottom: `1px solid ${
            theme.palette.mode === "light" ? "#F4F4F6" : "#303030"
          }`,
        },
        "& .MuiDataGrid-cell": {
          color: theme.palette.mode === "light" ? "#0E093F" : "white",
          // padding: "4em 1.2em !important",
          // marginBottom:'2em',

          // height:'64px !important',
          fontFamily:
            theme.palette.mode === "light"
              ? "Helonik-Regular, monospace !important"
              : "Helonik-Regular, monospace !important",
        },
        "& .MuiPaginationItem-root": {
          borderRadius: 0,
        },
        ...customCheckbox(theme),
      },
    }),
  { defaultTheme }
);
