import Dashboard from "@/layouts/dashboard";
import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import UserIcon from "remixicon-react/User6LineIcon";

export default function Index() {
  return (
    <Dashboard title="Get Started">
      <Stack mt="88px" direction="row" justifyContent="center" spacing="67px">
        <Stack spacing="8px">
          <Typography
            fontSize="24px"
            fontWeight={500}
            color="#2E3192"
            lineHeight="32px"
          >
            Tell us about your business
          </Typography>
          <Typography fontSize="14px" color="rgba(38, 43, 64, 0.8)">
            A few more things to help us set up your dashboard
          </Typography>
        </Stack>
        <Divider orientation="vertical" />
        <Stack
          gap="24px"
          padding="30px"
          width="546px"
          minHeight="646px"
          bgcolor="#FFFFFF"
        >
          {/* Unregistered/Individual */}
          <Stack
            border="1.5px solid #2E3192"
            height="87px"
            padding="19px 16px 19px 21px"
            alignItems="center"
            direction="row"
            gap="10px"
          >
            <Box width="30px" height="35px" display="flex" alignItems="center">
              <UserIcon size={"38"} color="#2E3192" />
            </Box>
            <Stack spacing="5px">
              <Typography color="#2E3192" fontWeight={500} fontSize="16px">
                Unregistered/Individual
              </Typography>
              <Typography color="#2E3192" fontSize="14px" lineHeight="20px">
                An unregistered business e.g freelancers and sole traders
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Dashboard>
  );
}
