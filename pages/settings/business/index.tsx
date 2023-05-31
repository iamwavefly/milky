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
    <Dashboard title="Settings | Business">
      <Stack px="30px" mt="20px">
        <Typography fontSize="16px" color="#2E3192">
          Business
        </Typography>
        {/* button group */}
        <ToggleButtonGroup
          sx={{ mt: "32px" }}
          value={activeTab}
          exclusive
          onChange={handleTabChange}
        >
          <ToggleButton value="business">Business Information</ToggleButton>
          <ToggleButton value="password">Password</ToggleButton>
        </ToggleButtonGroup>
        <Typography fontSize="12px" color="rgba(38, 43, 64, 0.8)" mt="20px">
          Enter your business information to ensure they are correct
        </Typography>
        <Stack maxWidth="788px" mt="35px" bgcolor="#FFFFFF" p="25px 34px">
          {activeTab === "business" ? (
            <BusinessInformation />
          ) : (
            <PasswordForm />
          )}
        </Stack>
      </Stack>
    </Dashboard>
  );
}
