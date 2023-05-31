import PayoutTable from "@/components/settings/payouts/payoutTable";
import useFetch from "@/hooks/useFetch";
import Dashboard from "@/layouts/dashboard";
import baseUrl from "@/middleware/baseUrl";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BoxPlusIcon from "remixicon-react/AddBoxLineIcon";
import PenIcon from "remixicon-react/EditLineIcon";
import CheckboxIcon from "remixicon-react/CheckboxLineIcon";
import UserTable from "@/components/settings/user-subsidiaries/userTable";

interface Props {
  id: number;
  name: string;
  user_count: number;
}

const Index = () => {
  const [activeRole, setActiveRole] = useState("user");
  const [permissions, setPermissions] = useState([]);
  const [users, setUsers] = useState([]);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/role/users`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleRoleChange = (
    event: React.MouseEvent<HTMLElement>,
    newRole: string
  ) => {
    setActiveRole(newRole);
  };

  return (
    <Dashboard title="Settings">
      <Stack px="30px" mt="20px">
        <Typography fontSize="16px" color="#2E3192">
          Users & Subsidiaries
        </Typography>
        <ToggleButtonGroup
          value={activeRole}
          exclusive
          onChange={handleRoleChange}
          aria-label="text alignment"
          sx={{ mt: "32px" }}
        >
          <ToggleButton value="user">Users</ToggleButton>
          <ToggleButton value="subsidiaries">Subsidiaries</ToggleButton>
        </ToggleButtonGroup>
        <Box>
          <UserTable />
        </Box>
      </Stack>
    </Dashboard>
  );
};

export default Index;
