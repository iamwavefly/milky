import { setDrawalState } from "@/store/appSlice";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

export default function ContactInformation() {
  const dispatch = useDispatch();

  const close = () => dispatch(setDrawalState({ active: false }));

  return (
    <Box>
      <Typography
        fontSize="14px"
        color="rgba(38, 43, 64, 0.8)"
        lineHeight="20px"
      >
        Besides your business information, we need contact details of one person
        at the company. This can be the owner or anyone else we can contact when
        we need to.
      </Typography>
      <Stack mt="60px" spacing="13px">
        <TextField label="First Name" variant="standard" />
        <TextField label="Last Name" variant="standard" />
        <TextField label="Phone number" variant="standard" />
      </Stack>
      <Button onClick={close} variant="contained" fullWidth sx={{ mt: "60px" }}>
        Save Changes
      </Button>
      <Button onClick={close} variant="outlined" fullWidth sx={{ mt: "25px" }}>
        Cancel
      </Button>
      <Typography
        sx={{ textAlign: "center" }}
        mt="43px"
        color="rgba(38, 43, 64, 0.8)"
        fontSize="12px"
      >
        Add another contact
      </Typography>
    </Box>
  );
}
