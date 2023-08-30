import { createTheme, ThemeOptions } from "@mui/material/styles";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const breakpoints = createBreakpoints({});

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    containedSmall: true;
    containedMedium: true;
    outlinedSmall: true;
  }
}

const theme = createTheme({
  typography: {
    color: "#070F1C",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    h1: {
      fontSize: 32,
      fontWeight: 700,
      lineHeight: "128%",
      [breakpoints.down("sm")]: {
        fontSize: 28,
      },
    },
    h2: {
      fontSize: 28,
      fontWeight: 700,
      lineHeight: "128%",
      letterSpacing: "-0.7px",
      [breakpoints.down("xs")]: {
        fontSize: 24,
      },
    },
    h3: {
      fontSize: 24,
      fontWeight: 700,
      lineHeight: "28px",
      [breakpoints.down("xs")]: {
        fontSize: 18,
      },
    },
    h4: {
      fontSize: 20,
      fontWeight: 700,
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
      fontSize: "12px !important",
      fontWeight: 400,
      color: "#0E093F",
      lineHeight: "15px",
    },
    subtitle1: {
      fontSize: 18,
      fontWeight: 700,
      lineHeight: "26px",
      [breakpoints.down("xs")]: {
        fontSize: 16,
      },
    },
    subtitle2: {
      fontSize: 15,
      fontWeight: 700,
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
      lineHeight: "26px",
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
          props: { variant: "containedSmall" },
          style: {
            height: "36px",
            padding: "12px 16px",
            backgroundColor: "#0048B1 !important",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            textTransform: "none",
            color: "#fff",
            fontSize: "12px",
            fontWeight: 600,
          },
        },
        {
          props: { variant: "outlinedSmall" },
          style: {
            height: "36px",
            padding: "12px 16px",
            backgroundColor: "#fff !important",
            border: "1px solid #DADCE2 !important",
            color: "#162031",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            textTransform: "none",
            fontSize: "12px",
            fontWeight: 600,
            "& > svg": {
              fill: "#586379",
            },
          },
        },
        {
          props: { variant: "containedMedium" },
          style: {
            height: "44px",
            padding: "16px",
            backgroundColor: "#0048B1 !important",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            textTransform: "none",
            fontSize: "14px",
            fontWeight: 600,
            minWidth: "104px",
            "& > svg": {
              fill: "#586379",
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          fontSize: "14px",
          fontWeight: 600,
          borderRadius: "8px",
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
          ":disabled": {
            opacity: 0.2,
            transition: "opacity 0.3s ease",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#070F1C",
          fontSize: "15px",
          // letterSpacing: "0.195px",
          "&.MuiInputLabel-shrink": {
            color: "#586379",
            fontSize: "18px",
            top: -1,
            left: "3px",
            // transform: "translate(15px, -9px) scale(0.75)",
          },
          "&.Mui-focused": {
            color: "#0069D0",
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
          "& > fieldset": {
            borderRadius: "8px !important",
            paddingLeft: "13px",
            "& > legeng": {
              // marginLeft: "3px",
            },
            "& span": {
              // paddingRight: "3px",
            },
          },
          "&.Mui-focused, &:hover": {
            "& > fieldset": {
              borderWidth: "1px !important",
              borderColor: "#0069D0 !important",
            },
          },
        },
        input: {
          color: "#070F1C",
          paddingLeft: "16px",
          paddingRight: "16px",
          fontSize: "15px",
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          gap: "16px",
          flexWrap: "wrap",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          padding: "8px 16px",
          gap: "10px",
          width: "max-content",
          height: "36px",
          border: "1px solid #E4E8F2 !important",
          color: "#92959F !important",
          lineHeight: "20px",
          fontSize: "12px",
          textTransform: "none",
          fontWeight: 400,
          borderRadius: 0,
          "&.Mui-selected, &.Mui-selected:hover": {
            color: "#fff !important",
            backgroundColor: "#0048B1",
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
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root": {},
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          height: "48px",
          cursor: "pointer",
          border: "1px solid transparent",
          "&:hover": {
            backgroundColor: "#F9FAFB",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: "#3C4453",
          lineHeight: "18px",
          letterSpacing: "0.18px",
          fontSize: "12px",
          textTransform: "uppercase",
          backgroundColor: "#F9FAFB",
        },
        body: {
          color: "#070F1C",
          border: 0,
          fontSize: "14px",
          height: "72px",
        },
        root: {
          fontWeight: 500,
          paddingTop: "5px",
          paddingBottom: "5px",
        },
      },
    },
    // table pagination
    MuiTablePagination: {
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "flex-start ",
        },
        displayedRows: {
          color: "#92959F",
        },
        selectLabel: {
          color: "#92959F",
        },
        actions: {
          "& path": {
            color: "#92959F",
          },
        },
      },
    },
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
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: "8px",
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        alternativeLabel: {
          left: "calc(-50% + -248px)",
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          justifyContent: "space-between",
        },
      },
    },
    MuiStep: {
      styleOverrides: {
        root: {
          maxWidth: "max-content",
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        iconContainer: {
          paddingRight: "12px",
          "& > svg": {
            color: "transparent",
            border: "1px solid #DADCE2 !important",
            borderRadius: "50% !important",
            "&.Mui-active": {
              color: "transparent",
              borderColor: "#0089E7",
            },
            "&.Mui-completed": {
              borderWidth: 0,
            },
            "& > text": {
              fontWeight: 500,
              color: "#0048B1",
              fill: "#070F1C",
              fontSize: "13px",
            },
          },
        },
        label: {
          "&.Mui-active": {
            color: "#070F1C !important",
            fontWeight: 500,
          },
          "&.MuiStepLabel-alternativeLabel": {
            marginTop: "8px !important",
          },
          color: "#3C4453 !important",
          fontSize: "13px",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: "44px",
          maxHeight: "44px",
          borderBottom: "1px solid #DADCE2",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          position: "relative",
          height: "44px",
          padding: "0 0 16px 0 !important",
          fontSize: "14px",
          textTransform: "none",
          color: "#3C4453",
          minWidth: "max-content ",
          marginRight: "24px",
          fontWeight: 500,
          "&.Mui-selected": {
            color: "#0048B1 !important",
            fontWeight: 600,
          },
        },
      },
    },
  },
} as ThemeOptions);

export default theme;
