import Checkbox from "@/components/elements/Checkbox";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import paymentMethod from "@/mocks/paymentMethod";
import {
  FormControl,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export default function PaymentMethods() {
  const [result, setResult] = useState<string[]>([]);
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/payment/options/view`,
    "get"
  );

  const setPaymentOption = useFetch(`${baseUrl}/dashboard/payment/options/set`);
  const removePaymentOption = useFetch(
    `${baseUrl}/dashboard/payment/options/remove`
  );

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    setResult(data?.data);
  }, [data?.data]);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      return setPaymentOption.handleSubmit({
        payment_option: value,
      });
    }
    removePaymentOption.handleSubmit({
      payment_option: value,
    });
  };

  return (
    <FormControl sx={{ gap: "16px" }}>
      {result?.length
        ? paymentMethod.map((name: string, index: number) => {
            const isChecked = result.includes(name);
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    defaultChecked={isChecked}
                    value={name}
                    onChange={handleCheck}
                  />
                }
                label={
                  <Typography
                    fontSize="12px"
                    fontWeight={500}
                    color="#262B40"
                    ml="16px"
                  >
                    {name}
                  </Typography>
                }
              />
            );
          })
        : ""}
    </FormControl>
  );
}
