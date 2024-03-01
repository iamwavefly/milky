import { createTheme, ThemeOptions } from "@mui/material/styles";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const breakpoints = createBreakpoints({});

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    containedSmall: true;
    containedMedium: true;
    outlinedMedium: true;
    outlinedSmall: true;
  }
}

const theme = createTheme({
  typography: {
    color: "#070F1C",
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontSize: 40,
      fontWeight: 500,
      lineHeight: "128%",
      [breakpoints.down("sm")]: {
        fontSize: 36,
      },
    },
    h2: {
      fontSize: 36,
      fontWeight: 500,
      lineHeight: "128%",
      [breakpoints.down("xs")]: {
        fontSize: 24,
      },
    },
    h3: {
      fontSize: 17,
      lineHeight: "28px",
      [breakpoints.down("xs")]: {
        fontSize: 18,
      },
    },
    h4: {
      fontSize: 16,
      lineHeight: "140%",
      [breakpoints.down("xs")]: {
        fontSize: 16,
      },
    },
    h5: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: "20px",
      [breakpoints.down("xs")]: {
        fontSize: 12,
      },
    },
    h6: {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: "15px",
    },
    subtitle1: {
      fontSize: 18,
      lineHeight: "26px",
      [breakpoints.down("xs")]: {
        fontSize: 16,
      },
    },
    subtitle2: {
      fontSize: 15,
      lineHeight: "26px",
      [breakpoints.down("xs")]: {
        fontSize: 14,
      },
    },
    body1: {
      fontSize: 17,
      fontWeight: 400,
      lineHeight: "28px",
      [breakpoints.down("xs")]: {
        fontSize: 14,
      },
    },
    body2: {
      fontSize: 15,
      fontWeight: 400,
      color: "#838383",
      [breakpoints.down("xs")]: {
        fontSize: 14,
      },
    },
  },
  palette: {
    primary: {
      main: "#003480",
    },
    grey: {
      main: "#92959F",
    },
    action: {
      disabled: "#B9BADB",
      disabledBackground: "#F4F4F4",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            height: "37px",
            minWidth: "126px",
            backgroundColor: "#FF1A71 !important",
            textTransform: "none",
            color: "#fff",
            fontSize: "14px",
            fontWeight: 500,
            transition: "0.3s ease !important",
            "&:hover": {
              boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.2) !important",
            },
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            height: "37px",
            minWidth: "126px",
            border: "1px solid #FF1A71 !important",
            textTransform: "none",
            color: "#FF1A71 !important",
            fontSize: "14px",
            fontWeight: 500,
            transition: "0.3s ease !important",
            "&:hover": {
              boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.2) !important",
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          fontSize: "14px",
          fontWeight: 600,
          borderRadius: "8px",
          ":disabled": {
            opacity: 0.2,
            transition: "opacity 0.3s ease",
          },
        },
        text: {
          background: "transparent !important",
          borderRadius: 0,
          height: "32px",
          minWidth: "max-content",
          padding: "0 !important",
          lineHeight: "120%",
          letterSpacing: "0.02em",
          color: "#0048B1",
          textTransform: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          "&:hover": {
            background: "#eee",
          },
        },
        outlined: {
          padding: "13px 24px !important",
          gap: "8px",
          height: "52px",
          minWidth: "max-content",
          lineHeight: "120%",
          letterSpacing: "0.02em",
          color: "#0048B1 !important",
          textTransform: "none",
          boxShadow: "none",
          border: "1px solid #0048B1 !important",
        },
        contained: {
          background: "#0048B1 !important",
          padding: "0 16px !important",
          gap: "8px",
          height: "48px",
          minWidth: "max-content",
          lineHeight: "120%",
          letterSpacing: "0.02em",
          color: "#fff !important",
          textTransform: "none",
          boxShadow: "none !important",
          opacity: 1,
          transition: "opacity 0.3s ease",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          opacity: 1,
          "&.Mui-disabled": {
            opacity: 0.4,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#A3A3A3",
          fontSize: "15px",
          transform: "translate(18px, 10px)",
          "&.MuiInputLabel-shrink": {
            fontSize: "18px",
            transform: "translate(18px, -10px) scale(0.75)",
          },
          "&.Mui-focused": {
            color: "#FF1A71",
          },
          "&.Mui-error": {
            color: "#E84A5F !important",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          display: "flex",
          gap: "10px",
          padding: "17px !important",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          minWidth: "100% !important",
          // maxHeight: "43px !important",
          "& > fieldset": {
            borderRadius: "10px !important",
            padding: "0 14px",
          },
          "&.Mui-focused, &:hover": {
            "& > fieldset": {
              borderWidth: "1px !important",
              borderColor: "#FF1A71 !important",
            },
          },
        },
        input: {
          color: "#070F1C",
          padding: "11px 18px !important",
          fontSize: "15px",
          borderRadius: "10px",
          borderColor: "#BCBCBC",
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#EDEDED",
          borderRadius: "10px",
          width: "100%",
          minWidth: "289px",
          height: "53px",
        },
        input: {
          color: "#070F1C",
          padding: "14px 18px",
          fontSize: "18px",
          fontWeight: 400,
          "&::placeholder": {
            color: "#A3A3A3",
            fontSize: "18px",
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          width: 20,
          height: 20,
          padding: 0,
          color: "#DADCE2",
          "&.Mui-checked": {
            color: "#0048B1",
            "& .MuiSvgIcon-root": {
              "&:last-child": {
                transform: "scale(0.9)",
              },
            },
          },
          "& .MuiSvgIcon-root": {
            width: "20px",
            height: "20px",
            "&:first-child": {
              transform: "scale(1.2)",
            },
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          borderRadius: "40px !important",
          width: 20,
          height: 20,
          padding: 0,
          color: "#DADCE2",
          "&.Mui-checked": {
            color: "#0048B1",
          },
          "& .MuiSvgIcon-root": {
            width: "20px",
            height: "20px",
            transform: "scale(1.2)",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#E8EAED",
        },
      },
    },
    // table
    // menu
    MuiMenu: {
      styleOverrides: {
        paper: {
          padding: "8px 0",
          gap: "4px",
          minWidth: "218px",
          border: "1px solid #EDEDED",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px !important",
        },
        list: {
          padding: "0",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: "8px 20px",
          gap: "11px",
          height: "40px",
          width: "max-content",
          minWidth: "218px",
          fontSize: "14px",
          color: "#162031",
          "&:hover": {
            background: "#F0F9FF",
          },
        },
        selected: {
          background: "#F0F9FF",
        },
      },
    },
    // drawal
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: "560px",
        },
      },
    },
    MuiFormGroup: {
      styleOverrides: {
        root: {
          gap: "8px",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          margin: 0,
          height: "max-height",
          padding: 0,
        },
        label: {
          position: "relative",
          marginLeft: "12px",
          color: "#162031",
          fontSize: "15px",
          fontWeight: 400,
          lineHeight: 0,
          top: -1,
        },
      },
    },
  },
} as ThemeOptions);

export default theme;
