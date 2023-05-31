import PayoutTable from "@/components/settings/payouts/payoutTable";
import Dashboard from "@/layouts/dashboard";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const index = () => {
  return (
    <Dashboard title="Settings">
      <Stack px="30px" mt="20px">
        <Typography fontSize="16px" color="#2E3192">
          Payout Accounts
        </Typography>
        <Stack direction="row" mt="32px" justifyContent="space-between">
          <Stack spacing="7px">
            <Typography fontSize="16px" fontWeight={600} color="#262B40">
              Accounts
            </Typography>
            <Typography fontSize="14px" color="rgba(38, 43, 64, 0.8)">
              Which account would you like to get your earning?
            </Typography>
          </Stack>
          <Stack
            bgcolor="#FFFFFF"
            padding="27px"
            width="682px"
            minHeight="110px"
          >
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                sx={{ gap: "16px" }}
                // value={value}
                // onChange={handleChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label={
                    <Typography
                      fontSize="12px"
                      fontWeight={500}
                      color="#262B40"
                      ml="16px"
                    >
                      Settle to Bank
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label={
                    <Typography
                      fontSize="12px"
                      fontWeight={500}
                      color="#262B40"
                      ml="16px"
                    >
                      Settle to Alliance Pay account
                    </Typography>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Stack>
        </Stack>
        <Typography mt="28px" fontSize="14px" color="#262B40">
          Bank Accounts
        </Typography>
        <Box>
          <PayoutTable />
        </Box>
      </Stack>
    </Dashboard>
  );
};

export default index;
