import React, { useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import Styles from "./toast.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectAppState, setToastState } from "@/store/appSlice";

export default function Toast() {
  const dispatch = useDispatch();
  const { toast } = useSelector(selectAppState);

  const themes = {
    success: { color: "#097122", bgcolor: "#E8FAF0" },
    error: { color: "#EA5851", bgcolor: "#FFF6F6" },
    warning: { color: "", bgcolor: "#E8FAF0" },
  };

  const { bgcolor, color } = themes[toast.theme] ?? {};

  useEffect(() => {
    if (toast.active) {
      setTimeout(() => {
        dispatch(
          setToastState({
            active: false,
            title: toast.title,
            theme: toast.theme,
          })
        );
      }, 4000);
    }
  }, [toast]);

  return (
    <Stack
      position="sticky"
      top={0}
      left={0}
      direction="row"
      width="100%"
      alignItems="center"
      justifyContent="center"
      bgcolor={bgcolor}
      zIndex={3}
      spacing="24px"
      className={`${Styles.toast} ${toast?.active ? Styles.active : ""}`}
    >
      <Typography fontSize="14px">{toast.title}</Typography>
      <Typography fontSize="14px" color={color} sx={{ cursor: "pointer" }}>
        Dismiss
      </Typography>
    </Stack>
  );
}
