import { createTheme, ThemeOptions } from "@mui/material/styles";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const breakpoints = createBreakpoints({});

const theme = createTheme({
  typography: {
    color: "#0F1031",
    fontFamily: "Poppins",

    h1: {
      fontSize: 96,
      fontWeight: 700,
      color: "#fff",
      lineHeight: "110%",
      textAlign: "center",
      letterSpacing: "-0.03em",
      [breakpoints.down("sm")]: {
        fontSize: 40,
      },
    },
    h2: {
      fontSize: 36,
      fontWeight: 600,
      lineHeight: "150%",
      color: "#000000",
      [breakpoints.down("xs")]: {
        fontSize: 24,
      },
    },
    h3: {
      fontSize: 24,
      fontWeight: 500,
      lineHeight: "28px",
      color: "#262B40",
      [breakpoints.down("xs")]: {
        fontSize: 18,
      },
    },
    h4: {
      fontSize: 20,
      fontWeight: 400,
      lineHeight: "150%",
      letterSpacing: "0.01em",
      color: "#262B40",
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
  },
  palette: {
    primary: {
      main: "#2E3192",
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
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontSize: "14px",
          fontWeight: 400,
        },
        text: {
          background: "#FFFFFF",
          borderRadius: "100px",
          height: "52px",
          minWidth: "max-content",
          padding: "12px",
          lineHeight: "120%",
          letterSpacing: "0.02em",
          color: "#0E45FB",
          textTransform: "none",
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
          color: "#2E3192 !important",
          textTransform: "none",
          boxShadow: "none",
          border: "1px solid #2E3192 !important",
        },
        contained: {
          background: "#2E3192 !important",
          padding: "7px 24px !important",
          gap: "8px",
          height: "52px",
          minWidth: "max-content",
          lineHeight: "120%",
          letterSpacing: "0.02em",
          color: "#fff !important",
          textTransform: "none",
          boxShadow: "none !important",
          borderRadius: 0,
          ":disabled": {
            background: "#B9BADB !important",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "12px",
          lineHeight: "16px",
          padding: "0 5px",
          opacity: "0.6",
          color: "#69696B",
          top: "20%",
          left: "20px",
          "&.MuiInputLabel-shrink": {
            color: "#9296A1",
            opacity: "0.8",
            top: -4,
            left: 0,
            transform: "scale(1)",
          },
          "&.Mui-error": {
            color: "#EA5851 !important",
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
    MuiInputBase: {
      styleOverrides: {
        input: {
          position: "relative",
          padding: "20px !important",
          fontWeight: 400,
          fontSize: "12px !important",
          lineHeight: "18px",
          color: "#262B40",
          height: "13px",
          width: "100% !important",
          transition: "all 0.4s ease",
          "&::placeholder": {
            color: "#69696B !important",
            fontSize: "12px !important",
          },
          "&.Mui-focused": {
            border: "1px solid #2E3192 !important",
          },
          "&:hover": {
            border: "0 !important",
          },

          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px #F8F8FA inset",
            WebkitTextFillColor: "#4A476F",
          },
        },
        multiline: {
          padding: "0 important",
        },
        root: {
          display: "flex",
          alignItems: "center",
          border: "1px solid rgba(150, 152, 200, 0.2)",
          position: "relative",
          "& .MuiOutlinedInput-root": {
            "& > fieldset": {
              borderRadius: 0,
            },
          },
          "&.Mui-focused": {
            border: "1px solid #2E3192 !important",
          },
          "&.Mui-error": {
            border: "1px solid #EA5851 !important",
          },
          "&::after": {
            border: "0 !important",
          },
          "&::before": {
            border: "0 !important", // use your color
          },
          "&:hover": {},
          "&$focused": {
            // border: "0 !important",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          width: "100%",
          border: "1px solid rgba(10, 9, 3, 0.2) !important",
          borderRadius: "7px !important",
        },
        input: {
          fontWeight: 500,
          borderRadius: "7px !important",
        },
      },
    },
    // MuiInputAdornment: {
    //   styleOverrides: {
    //     root: {
    //       border: 0,
    //       margin: 0,
    //     },
    //   },
    // },
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
          fontSize: "14px",
          textTransform: "none",
          fontWeight: 400,
          borderRadius: 0,
          "&.Mui-selected, &.Mui-selected:hover": {
            color: "#2E3192 !important",
            backgroundColor: "transparent",
            border: "1px solid #2E3192 !important",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0,
          color: "#B7B8BF",
          "& svg": {
            width: "20px",
            height: "20px",
          },
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
          height: "52px",
          cursor: "pointer",
          border: "1px solid transparent",
          "&:hover": {
            backgroundColor: "#F3F3F9",
            borderBottom: "1px solid #E4E8F2",
            borderTop: "1px solid #E4E8F2",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: "#262B40",
        },
        body: {
          color: "#92959F",
          border: 0,
          height: "46px",
        },
        root: {
          fontWeight: 400,
          fontSize: 12,
          paddingTop: "5px",
          paddingBottom: "5px",
        },
      },
    },
    // table pagination
    MuiTablePagination: {
      styleOverrides: {
        root: {
          marginTop: "32px",
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
          padding: "4px",
          gap: "4px",
          border: "1px solid #EDEDED",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "0 !important",
        },
        list: {
          padding: "0",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: "6px 16px",
          gap: "11px",
          height: "36px",
          width: "max-content",
          minWidth: "250px",
          fontSize: "16px",
          "&:hover": {
            background: "#D5D6E9",
          },
        },
        selected: {
          background: "#D5D6E9",
        },
      },
    },
    // drawal
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: "500px",
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
        },
        label: {
          marginLeft: "10px",
          color: "rgba(10, 9, 3, 0.7)",
          fontSize: "16px",
          fontWeight: 500,
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
  },
} as ThemeOptions);

export default theme;
