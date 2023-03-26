const VISA_ICON = "/themes/icons/visa.svg";
const AMERICAN_EXPRESS_ICON = "";
const MASTER_CARD_ICON = "/themes/icons/mastercard.svg";
const DISCOVER_ICON = "";
const DINERS_CLUB_ICON = "";
const JCB_ICON = "";

export const OTHERCARDS = [
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];
export const AMERICANEXPRESS = [
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];
export const EXPIRYDATE = [/[0-9]/, /\d/, "/", /\d/, /\d/];
export const CVC = [/[0-9]/, /\d/, /\d/, /\d/];

export const CARDICON = {
  VISA: VISA_ICON,
  MASTERCARD: MASTER_CARD_ICON,
  DISCOVER: DISCOVER_ICON,
  AMERICAN_EXPRESS: AMERICAN_EXPRESS_ICON,
  DINERS_CLUB: DINERS_CLUB_ICON,
  JCB: JCB_ICON,
};

export const CARDARR = [
  "VISA",
  "MASTERCARD",
  "AMERICAN_EXPRESS",
  "DISCOVER",
  "DINERS_CLUB",
  "JCB",
];

export const COLORARR = [
  ["#20bdff", "#5433ff"],
  ["#ff4b1f", "#ff9068"],
  ["#ffb347", "#ffcc33"],
  ["#D38312", "#A83279"],
  ["#83a4d4", "#b6fbff"],
  ["#fbd3e9", "#bb377d"],
];
// background: #141e30;
// background: -webkit-linear-gradient(to right, #141e30, #243b55);
// background: linear-gradient(to right, #141e30, #243b55);
