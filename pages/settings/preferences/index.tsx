import PayoutTable from "@/components/settings/payouts/payoutTable";
import PaymentMethods from "@/components/settings/preferences/paymentMethods";
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
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Index = () => {
  const [enabled2FA, setEnabled2FaA] = useState(false);
  const [whoBearFee, setWhoBearFee] = useState<string | undefined>("");
  // 2fa authentication endpoint
  const TwoFaReqEnabled = useFetch(
    `${baseUrl}/dashboard/2fa/login/view`,
    "get"
  );
  const Enable2faReq = useFetch(`${baseUrl}/dashboard/2fa/login/set`);
  // fees bearer
  const FeeBearerView = useFetch(
    `${baseUrl}/dashboard/payment/fees/view`,
    "get"
  );
  const FeeBearerReq = useFetch(`${baseUrl}/dashboard/payment/fees/set`);


  useEffect(() => {
    TwoFaReqEnabled?.handleSubmit();
  }, []);

  useEffect(() => {
    const bearer =
      FeeBearerView?.data?.data?.who_bears_fee === "Customer" ? "CBF" : "SBF";
    return setWhoBearFee(bearer);
  }, [FeeBearerView?.data?.data]);

  useEffect(() => {
    FeeBearerView.handleSubmit();
  }, []);

  useEffect(() => {
    setEnabled2FaA(TwoFaReqEnabled?.data?.data?.is_two_fa_enabled);
  }, [TwoFaReqEnabled?.data?.data]);

  const toggle2FaHandler = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    const { checked } = e.target;
    setEnabled2FaA(checked);
    Enable2faReq?.handleSubmit({ two_fa: checked ? "yes" : "no" });
  };

  const feeBearerHandler = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setWhoBearFee(value);
    FeeBearerReq?.handleSubmit({
      fee_bearer: value,
    });
  };

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const { value, checked } = event.target;
    // let newPermissions: string[] | null = null;
    // if (!checked) {
    //   newPermissions = userPermission?.filter((permission: any) => {
    //     if (permission.id !== +value) {
    //       return permission;
    //     }
    //   });
    // }
    // updatePermission?.handleSubmit({
    //   role_id: activeRole,
    //   permissions: newPermissions?.map((permission: any) => permission.id) ?? [
    //     value,
    //   ],
    // });
  };

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
                sx={{ gap: "16px" }}
                value={whoBearFee}
                onChange={feeBearerHandler}
              >
                <FormControlLabel
                  value="SBF"
                  control={<Radio />}
                  label={
                    <Typography
                      fontSize="12px"
                      fontWeight={500}
                      color="#262B40"
                      ml="16px"
                    >
                      Charge me the transaction fees
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="CBF"
                  control={<Radio />}
                  label={
                    <Typography
                      fontSize="12px"
                      fontWeight={500}
                      color="#262B40"
                      ml="16px"
                    >
                      Charge my customers the transaction fees
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
            <PaymentMethods />
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
                control={
                  <Checkbox checked={enabled2FA} onChange={toggle2FaHandler} />
                }
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
