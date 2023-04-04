import React, { useRef, useState } from "react";
import { setDrawalState } from "@/store/appSlice";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import UploadIcon from "../../public/icons/photo-upload.svg";

export default function BusinessInformation() {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();

  const close = () => dispatch(setDrawalState({ active: false }));

  const ref = useRef<any>();
  const handleClick = (e: any) => {
    ref.current.click();
  };

  if (step === 2) {
    return (
      <Box>
        <Box position="absolute">
          <input hidden ref={ref} type="file" />
        </Box>
        <Typography
          fontSize="14px"
          color="rgba(38, 43, 64, 0.8)"
          lineHeight="20px"
        >
          Business logo (optional)
        </Typography>
        <Stack gap="20px" direction="row" mt="60px" alignItems="center">
          <Box
            onClick={handleClick}
            bgcolor="#F5F5F5"
            minWidth="94px"
            height="94px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ cursor: "pointer" }}
          >
            <UploadIcon />
          </Box>
          <Typography fontSize="12px" color="#262B40" lineHeight="18px">
            We use your logo on payment pages to increase the credibility for
            your customers. Please upload a square image of your logo not larger
            than 1mb.
          </Typography>
        </Stack>
        <Stack mt="25px" spacing="13px">
          <TextField label="Website (optional)" variant="standard" />
          <TextField label="Facebook username (optional)" variant="standard" />
          <TextField label="Instagram handle (optional)" variant="standard" />
          <TextField label="Twitter handle (optional)" variant="standard" />
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
      <Stack mt="60px" spacing="13px">
        <TextField label="What you do at Alliance Pay" variant="standard" />
        <TextField label="Business email" variant="standard" />
        <TextField label="Business phone number" variant="standard" />
        <TextField label="Business phone address" variant="standard" />
        <Stack direction="row" width="100%" spacing="25px">
          <TextField label="City" variant="standard" sx={{ flex: 1 }} />
          <TextField label="State" variant="standard" sx={{ flex: 1 }} />
        </Stack>
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
