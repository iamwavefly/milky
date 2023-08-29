import BusinessInformation from "@/components/settings/business/businessInformation";
import PasswordForm from "@/components/settings/business/changePassword";
import Dashboard from "@/layouts/dashboard";
import {
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function Index() {
  const [activeTab, setactiveTab] = useState<null | string>("business");

  const handleTabChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setactiveTab(newAlignment);
  };

  return (
    <Dashboard title="Business">
      <Stack px="30px" mt="20px">
        <Stack direction="row" spacing="88px" width="100%">
          <Box width="342px">
            <Typography fontSize="18px" fontWeight={600} lineHeight="26px">
              Business Information
            </Typography>
            <Typography
              fontSize="14px"
              mt="16px"
              lineHeight="26px"
              letterSpacing="0.14px"
            >
              Enter your business information and ensure they are correct
            </Typography>
          </Box>
          <Box width="648px">
            <BusinessInformation />
          </Box>
        </Stack>
      </Stack>
      <PasswordForm />
    </Dashboard>
  );
}
