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

export default function BankDetails({ nextStep }: Props) {
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
        <Box px="40px" pt="29px" pb="14px">
          <Stack spacing="24px" mt="16px">
            <TextField label="Account type" variant="outlined" select>
              <MenuItem sx={{ width: "100%" }} value="Lagos">
                Current
              </MenuItem>
            </TextField>
            <TextField label="Bank name" variant="outlined" select>
              <MenuItem sx={{ width: "100%" }} value="Lagos">
                Access bank
              </MenuItem>
            </TextField>
            <TextField label="Account number" variant="outlined" />
          </Stack>
          <Typography
            mt="8px"
            fontSize="12px"
            lineHeight="18px"
            textAlign="right"
          >
            ZEE ADEBUKOLA ADEKOYA
          </Typography>
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
    </Box>
  );
}
