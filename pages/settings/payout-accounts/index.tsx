import PayoutTable from "@/components/settings/payouts/payoutTable";
import useFetch from "@/hooks/useFetch";
import Dashboard from "@/layouts/dashboard";
import baseUrl from "@/middleware/baseUrl";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const Index = () => {
  const [whoBearFee, setWhoBearFee] = useState<string | undefined>("");
  // fees bearer
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/settlement/details/get`,
    "get"
  );

  const FeeBearerReq = useFetch(
    `${baseUrl}/dashboard/settlement/details`,
    "post"
  );

  useEffect(() => {
    const bearer = data?.data;
    return setWhoBearFee(bearer);
  }, [data?.data]);

  useEffect(() => {
    handleSubmit();
  }, []);

  const feeBearerHandler = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setWhoBearFee(value);
    FeeBearerReq?.handleSubmit({
      settlement_type: value,
    });
  };

  return (
    <Dashboard title="Settings">
      <Stack mt="48x">
        <Stack spacing="28px" justifyContent="space-between">
          <Stack spacing="12px">
            <Typography
              fontSize="18px"
              fontWeight={600}
              color="#070F1C"
              lineHeight="26px"
            >
              Accounts
            </Typography>
            <Typography
              fontSize="14px"
              color="#3C4453"
              lineHeight="24px"
              letterSpacing="0.14px"
            >
              Which account would you like to get your earnings?
            </Typography>
          </Stack>
          <Stack
            bgcolor="#FFFFFF"
            padding="24px"
            width="100%"
            height="64px"
            direction="row"
            alignItems="center"
          >
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                sx={{ gap: "72px" }}
                value={whoBearFee}
                onChange={feeBearerHandler}
                row
              >
                <FormControlLabel
                  value="bank"
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
                  value="wallet"
                  control={<Radio />}
                  label={
                    <Typography
                      fontSize="12px"
                      fontWeight={500}
                      color="#262B40"
                      ml="16px"
                    >
                      Settle to Arca account
                    </Typography>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Stack>
        </Stack>
        <Box mt="40px">
          <PayoutTable />
        </Box>
      </Stack>
    </Dashboard>
  );
};

export default Index;
