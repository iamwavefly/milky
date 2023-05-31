import PayoutTable from "@/components/settings/payouts/payoutTable";
import useFetch from "@/hooks/useFetch";
import Dashboard from "@/layouts/dashboard";
import baseUrl from "@/middleware/baseUrl";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

const Index = () => {
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/payment/fees/view`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <Dashboard title="Settings">
      <Stack px="30px" mt="20px">
        <Typography fontSize="16px" color="#2E3192">
          Preferences
        </Typography>
        {/* Transactions */}
        <Stack direction="row" mt="32px" justifyContent="space-between">
          <Stack spacing="7px">
            <Typography fontSize="16px" fontWeight={600} color="#262B40">
              Transactions
            </Typography>
            <Typography fontSize="14px" color="rgba(38, 43, 64, 0.8)">
              Who would be charged transaction fees?
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
        {/* Payment methods */}
        <Stack direction="row" mt="32px" justifyContent="space-between">
          <Stack spacing="7px">
            <Typography fontSize="16px" fontWeight={600} color="#262B40">
              Payment methods
            </Typography>
            <Typography fontSize="14px" color="rgba(38, 43, 64, 0.8)">
              Payment methods available to customers
            </Typography>
          </Stack>
          <Stack
            bgcolor="#FFFFFF"
            padding="27px"
            width="682px"
            minHeight="110px"
          >
            <FormControl sx={{ gap: "20px" }}>
              <FormControlLabel
                value="female"
                control={<Checkbox />}
                label={
                  <Typography
                    fontSize="12px"
                    fontWeight={500}
                    color="#262B40"
                    ml="16px"
                  >
                    Enable card payment
                  </Typography>
                }
              />
              <FormControlLabel
                value="male"
                control={<Checkbox />}
                label={
                  <Typography
                    fontSize="12px"
                    fontWeight={500}
                    color="#262B40"
                    ml="16px"
                  >
                    Enable bank payment
                  </Typography>
                }
              />
              <FormControlLabel
                value="male"
                control={<Checkbox />}
                label={
                  <Typography
                    fontSize="12px"
                    fontWeight={500}
                    color="#262B40"
                    ml="16px"
                  >
                    Enable USSD
                  </Typography>
                }
              />
              <FormControlLabel
                value="male"
                control={<Checkbox />}
                label={
                  <Typography
                    fontSize="12px"
                    fontWeight={500}
                    color="#262B40"
                    ml="16px"
                  >
                    Enable bank transfer
                  </Typography>
                }
              />
            </FormControl>
          </Stack>
        </Stack>
        {/* Other preferences */}
        <Stack direction="row" mt="32px" justifyContent="space-between">
          <Stack spacing="7px">
            <Typography fontSize="16px" fontWeight={600} color="#262B40">
              Other preferences
            </Typography>
          </Stack>
          <Stack bgcolor="#FFFFFF" padding="27px" width="682px">
            <FormControl sx={{ gap: "20px" }}>
              <FormControlLabel
                value="female"
                control={<Checkbox />}
                label={
                  <Typography
                    fontSize="12px"
                    fontWeight={500}
                    color="#262B40"
                    ml="16px"
                  >
                    Enable two factor authentication for login
                  </Typography>
                }
              />
            </FormControl>
          </Stack>
        </Stack>
      </Stack>
    </Dashboard>
  );
};

export default Index;
