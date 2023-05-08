import {
  Box,
  Button,
  Divider,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function NewInvoice({
  steppers,
  active,
}: {
  steppers: string[];
  active: number;
}) {
  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      {/* step */}
      {steppers?.map((stepper: string, index: number) => {
        const current = active === index;
        return (
          <>
            <Stack alignItems="center">
              <Box
                bgcolor={current ? "#fff" : "#E4E8F2"}
                border={`6px solid ${!current ? "#E4E8F2" : "#2E3192"}`}
                width="20px"
                height="20px"
                borderRadius={100}
              />
              <Typography
                mt="14px"
                fontWeight={current ? 500 : 400}
                fontSize="12px"
                color={current ? "#2E3192" : "#92959F"}
              >
                {stepper}
              </Typography>
            </Stack>
            {/* divider */}
            {index < steppers.length - 1 && (
              <Box
                width="244px"
                border="1px dashed #DBDADD"
                height={0}
                m="10px -25px 0 -30px"
              />
            )}
          </>
        );
      })}
    </Stack>
  );
}
