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
import SubsidiaryTable from "@/components/settings/user-subsidiaries/subsidiaryTable";
import Tabs from "@/components/Tabs";

interface Props {
  id: number;
  name: string;
  user_count: number;
}

const tabs = [
  {
    id: 1,
    tab: "Users",
  },
  {
    id: 2,
    tab: "Subsidiaries",
  },
];

const Index = () => {
  const [activeRole, setActiveRole] = useState("users");
  const [currentTab, setCurrentTab] = useState(0);

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
      <Stack>
        <Stack>
          <Tabs tabs={tabs} updateTab={setCurrentTab} currentTab={currentTab} />
        </Stack>
        <Box mt="24px">
          {currentTab === 1 ? <UserTable /> : <SubsidiaryTable />}
        </Box>
      </Stack>
    </Dashboard>
  );
};

export default Index;
