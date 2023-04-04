import { setDrawalState } from "@/store/appSlice";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FileUpload from "../FileUpload";

export default function BusinessRegistration() {
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
          All documents must be in either .jpg, .jpeg, .png or .pdf format with
          max size of 10mb.
        </Typography>
        <Stack mt="60px" gap="25px">
          <Stack direction="row" gap="25px">
            <FileUpload title={"Means of identification"} />
            <FileUpload title={"Upload proof of address"} />
          </Stack>
          <Stack direction="row" gap="25px">
            <FileUpload title={"Particulars of Directors (optional)"} />
            <FileUpload title={"Statement of return on allotment of shares"} />
          </Stack>
        </Stack>
        <Typography
          fontSize="14px"
          color="rgba(38, 43, 64, 0.8)"
          lineHeight="20px"
          mt="60px"
        >
          Primary identification documents of all shareholders with 5% ownership
          and above
        </Typography>
        <Stack mt="25px" gap="25px">
          <Stack direction="row" gap="25px">
            <FileUpload title={"Chairman 1"} />
            <FileUpload title={"Chairman 2"} />
          </Stack>
          <Stack direction="row" gap="25px">
            <FileUpload title={"Operating License (Optional)"} />
          </Stack>
        </Stack>
        <Typography
          fontSize="14px"
          color="rgba(38, 43, 64, 0.8)"
          lineHeight="20px"
          mt="60px"
        >
          1 out of 1 added
        </Typography>
        <Stack mt="14px">
          <TextField variant="standard" label="Name of stakeholder" />
        </Stack>
        <Button
          onClick={close}
          variant="contained"
          fullWidth
          sx={{ mt: "60px" }}
        >
          Save
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
        We need this information to give us an idea of the kind of business you
        run, the type of product/services you will need to maximize this portal
        and how we can generally serve you better.
      </Typography>
      <Stack mt="60px" gap="13px">
        <TextField label="Business class" variant="standard" select />
        <TextField label="Tax identification number" variant="standard" />
      </Stack>
      <Button
        onClick={() => setStep(2)}
        variant="contained"
        fullWidth
        sx={{ mt: "60px" }}
      >
        Next
      </Button>
      <Button onClick={close} variant="outlined" fullWidth sx={{ mt: "25px" }}>
        Cancel
      </Button>
    </Box>
  );
}
