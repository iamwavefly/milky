import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { bankDetails, newCustomer } from "@/schema";
import { reloadPercentage, setDrawalState } from "@/store/appSlice";
import { LoadingButton } from "@mui/lab";
import { Box, Button, capitalize, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

interface Props {
  emailAddress: string;
  action: string;
  close: () => void;
}

export default function BlacklistCustomer({
  emailAddress,
  close,
  action,
}: Props) {
  const [reason, setReason] = useState("");
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/customer/blacklist-whitelist`,
    "post"
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const { status } = data;
    if (status === "success") {
      close();
      dispatch(reloadPercentage());
    }
  }, [data]);

  const blacklistHandler = () => {
    const payload = {
      customer_email: emailAddress,
      reason,
      action,
    };
    handleSubmit(payload);
  };

  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Stack spacing="24px" py="32px" px="40px">
        <TextField
          label="Reason*"
          variant="outlined"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </Stack>
      <Stack
        direction="row"
        spacing="28px"
        px="40px"
        py="16px"
        mt="44px"
        borderTop="1px solid #E8EAED"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Button
          variant="outlined"
          onClick={close}
          sx={{
            color: action === "blacklist" ? "#EA5851 !important" : "",
            border:
              action === "blacklist" ? "1px solid #EA5851 !important" : "",
          }}
        >
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          onClick={blacklistHandler}
          loading={loading}
          disabled={!reason.length}
          sx={{
            bgcolor: action === "blacklist" ? "#EA5851 !important" : "",
            "&.Mui-disabled": {
              bgcolor: action === "blacklist" ? "#EA5851 !important" : "",
              opacity: "0.6",
            },
          }}
        >
          {capitalize(action)}
        </LoadingButton>
      </Stack>
    </Box>
  );
}
