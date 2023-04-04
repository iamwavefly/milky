import { setDrawalState } from "@/store/appSlice";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FileUpload from "../FileUpload";

export default function PersonalInformation() {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const close = () => dispatch(setDrawalState({ active: false }));

  if (step === 2) {
    return (
      <Box>
        <Typography
          fontSize="14px"
          color="rgba(38, 43, 64, 0.8)"
          lineHeight="20px"
        >
          Please upload any of the following means of identification:
          International Passport, Driver’s License, National ID or Voter’s ID.
          All files must be an image (.jpg, .jpeg, .png or .pdf) with max size
          of 10mb.
        </Typography>
        <Stack mt="60px" gap="25px">
          <FileUpload height={82} title={"Upload means of identification"} />
          <FileUpload height={82} title={"Upload passport"} />
          <FileUpload height={82} title={"Upload proof of address"} />
        </Stack>
        <Button
          onClick={close}
          variant="contained"
          fullWidth
          sx={{ mt: "60px" }}
        >
          Save Changes
        </Button>
        <Button
          onClick={close}
          variant="outlined"
          fullWidth
          sx={{ mt: "25px" }}
        >
          Cancel
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        fontSize="14px"
        color="rgba(38, 43, 64, 0.8)"
        lineHeight="20px"
      >
        This helps us confirm your identity. We use the details you provide for
        verification only and it will not be visible to anyone else on your
        team/business.
      </Typography>
      <Stack mt="60px" spacing="13px">
        <Stack direction="row" spacing="25px">
          <TextField label="First Name" variant="standard" sx={{ flex: 1 }} />
          <TextField label="Last Name" variant="standard" sx={{ flex: 1 }} />
        </Stack>
        <TextField label="BVN" variant="standard" />
        <Stack direction="row" spacing="25px">
          <TextField
            label="Gender"
            variant="standard"
            sx={{ flex: 1 }}
            select
          />
          <TextField
            label="Date of Birth"
            variant="standard"
            sx={{ flex: 1 }}
          />
        </Stack>
        <TextField label="Phone Number" variant="standard" />
        <TextField label="Identification Document" variant="standard" select />
        <TextField label="Identification Number" variant="standard" />
      </Stack>
      <Button
        onClick={() => setStep(2)}
        variant="contained"
        fullWidth
        sx={{ mt: "60px" }}
      >
        Next
      </Button>
    </Box>
  );
}
