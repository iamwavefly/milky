import { closeModal, setDrawalState } from "@/store/appSlice";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { ButtonProps, Stack } from "@mui/material";
import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";

type Props = {
  children: ReactNode;
  close?: () => void;
} & LoadingButtonProps;

export default function Footer({ children, close, ...others }: Props) {
  const dispatch = useDispatch();
  const closePopover = () => {
    close && close();
    dispatch(closeModal());
    dispatch(setDrawalState({ active: false }));
  };

  return (
    <Stack
      position="sticky"
      bottom={0}
      left={0}
      direction="row"
      spacing="28px"
      px="40px"
      py="16px"
      mt="44px"
      borderTop="1px solid #E8EAED"
      alignItems="center"
      justifyContent="flex-end"
      bgcolor="#fff"
    >
      <LoadingButton variant="text" onClick={closePopover}>
        Cancel
      </LoadingButton>
      <LoadingButton
        sx={{ height: "44px", fontSize: "14px" }}
        variant="contained"
        type="submit"
        {...others}
      >
        {children}
      </LoadingButton>
    </Stack>
  );
}
