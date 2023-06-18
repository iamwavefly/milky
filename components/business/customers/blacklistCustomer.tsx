import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { bankDetails, newCustomer } from "@/schema";
import { setDrawalState } from "@/store/appSlice";
import { LoadingButton } from "@mui/lab";
import { Box, capitalize, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

interface Props {
  emailAddress: string;
  action: string;
}

export default function BlacklistCustomer({ emailAddress, action }: Props) {
  const [reason, setReason] = useState("");
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/customer/blacklist-whitelist`,
    "post"
  );

  const dispatch = useDispatch();
  const close: any = () => dispatch(setDrawalState({ active: false }));

  useEffect(() => {
    const { status, message } = data;
    if (status === "success") {
      close();
      Router.reload();
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
    <Box>
      <Stack spacing="13px">
        <TextField
          label="Reason*"
          variant="standard"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </Stack>
      <Stack spacing="25px" mt="60px">
        <LoadingButton
          variant="contained"
          fullWidth
          onClick={blacklistHandler}
          loading={loading}
          disabled={!reason.length}
          sx={{
            bgcolor: action === "blacklist" ? "#EA5851 !important" : "",
            fontSize: "14px",
            height: "52px",
            "&.Mui-disabled": {
              bgcolor: action === "blacklist" ? "#EA5851 !important" : "",
              opacity: "0.6",
            },
          }}
        >
          {capitalize(action)}
        </LoadingButton>
        <LoadingButton
          variant="outlined"
          fullWidth
          onClick={close}
          sx={{
            color: action === "blacklist" ? "#EA5851 !important" : "",
            border:
              action === "blacklist" ? "1px solid #EA5851 !important" : "",
            fontSize: "14px",
            height: "52px",
          }}
        >
          Cancel
        </LoadingButton>
      </Stack>
    </Box>
  );
}
