import React, { ChangeEvent, useState } from "react";
import { Box, TextField } from "@mui/material";

const InputCode = ({ ...others }) => {
  const [otp, setOTP] = useState("");

  const handleOTPChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Remove any non-digit characters from the input
    const inputOTP = event.target.value.replace(/[^0-9]/g, "");

    // Limit the input to 6 digits
    const sanitizedOTP = inputOTP.slice(0, 6);

    // Add hyphen after the third digit
    const formattedOTP =
      sanitizedOTP.length > 3
        ? sanitizedOTP.slice(0, 3) + " - " + sanitizedOTP.slice(3)
        : sanitizedOTP;

    setOTP(formattedOTP);
    others.onChange(event);
  };

  return (
    <TextField
      label="OTP"
      variant="filled"
      {...others}
      value={otp}
      onChange={handleOTPChange}
      InputProps={{
        disableUnderline: true,
      }}
    />
  );
};

export default InputCode;
