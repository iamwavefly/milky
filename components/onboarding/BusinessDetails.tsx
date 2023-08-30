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
import Router from "next/router";

interface Props {
  nextStep: () => void;
}

export default function BusinessDetails({ nextStep }: Props) {
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
      <Typography
        fontWeight={600}
        fontSize="20px"
        lineHeight="28px"
        textAlign="center"
        variant="h4"
        letterSpacing="0.5px"
        mt="20px"
      >
        GET STARTED
      </Typography>
      <Box width="515px" mx="auto" mt="24px" bgcolor="#FFF">
        <Stack
          height="70px"
          justifyContent="center"
          px="40px"
          borderBottom="1px solid #E8EAED"
        >
          <Typography variant="subtitle1" fontWeight={500}>
            Business Details
          </Typography>
        </Stack>
        <Box px="40px" py="24px">
          <Typography color="#3C4453" fontSize="13px" fontWeight={500}>
            What type of business do you do?
          </Typography>
          <Stack spacing="20px" mt="16px">
            {accountTypes?.map(({ name, subtitle, id, Icon }) => (
              <AccountTypePanel
                key={id}
                clickHandler={() => setActivePanel(id)}
                active={activePanel === id}
                title={name}
                subtitle={subtitle}
                icon={<Icon />}
              />
            ))}
          </Stack>
          <Typography
            color="#3C4453"
            fontSize="13px"
            fontWeight={500}
            mt="24px"
            lineHeight="21px"
          >
            Other details
          </Typography>
          <Stack spacing="24px" mt="16px">
            <TextField label="Business location" variant="outlined" select>
              <MenuItem sx={{ width: "100%" }} value="Lagos">
                Lagos
              </MenuItem>
            </TextField>
            <TextField label="Business size" variant="outlined" select>
              <MenuItem sx={{ width: "100%" }} value="Lagos">
                Large
              </MenuItem>
            </TextField>
            <TextField label="Business category" variant="outlined" select>
              <MenuItem sx={{ width: "100%" }} value="Lagos">
                Retail
              </MenuItem>
            </TextField>
            <TextField
              label="Are you a software developer"
              variant="outlined"
              select
            >
              <MenuItem sx={{ width: "100%" }} value="Lagos">
                Yes
              </MenuItem>
              <MenuItem sx={{ width: "100%" }} value="Lagos">
                No
              </MenuItem>
            </TextField>
            <TextField label="Referral code (optional)" variant="outlined" />
          </Stack>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: "40px" }}
            onClick={() => Router.push("/onboarding")}
          >
            Proceed to my dashboard
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
