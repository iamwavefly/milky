import React, { useState } from "react";
import { accountTypes } from "@/utils/signup";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountTypePanel from "../accountTypePanel";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import AddIcon from "@/public/icons/add.svg";

interface Props {
  nextStep: () => void;
}

export default function ContactInformation({ nextStep }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [activePanel, setActivePanel] = useState<undefined | number>(undefined);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/signup`
  );

  return (
    <Box>
      <Box bgcolor="#FFF">
        <Box px="40px" pt="29px" pb="40px">
          <Stack spacing="24px" mt="16px">
            <Stack direction="row" spacing="24px">
              <TextField label="First name" variant="outlined" fullWidth />
              <TextField label="Last name" variant="outlined" fullWidth />
            </Stack>
            <TextField label="Phone number" variant="outlined" />
          </Stack>
        </Box>
        <Stack
          spacing="28px"
          justifyContent="flex-end"
          direction="row"
          px="40px"
          py="16px"
          borderTop="1px solid #E8EAED"
        >
          <Button
            variant="text"
            sx={{ p: 0, fontWeight: 600, bgcolor: "transparent !important" }}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={nextStep}>
            Save & Continue
          </Button>
        </Stack>
      </Box>
      <Stack
        direction="row"
        mt="23px"
        spacing="6px"
        alignItems="center"
        sx={{ cursor: "pointer" }}
      >
        <AddIcon width="18px" height="18px" fill="#0048B1" />
        <Typography
          color="#0048B1"
          fontSize="14px"
          fontWeight={600}
          lineHeight="22px"
        >
          Add another contact
        </Typography>
      </Stack>
    </Box>
  );
}
