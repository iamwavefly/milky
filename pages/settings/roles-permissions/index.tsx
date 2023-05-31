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

interface Props {
  id: number;
  name: string;
  user_count: number;
}

const Index = () => {
  const [activeRole, setActiveRole] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [users, setUsers] = useState([]);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/role/users`,
    "get"
  );

  const permApi = useFetch(
    `${baseUrl}/dashboard/role/details?roleid=${activeRole}`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    activeRole && permApi?.handleSubmit();
  }, [activeRole]);

  useEffect(() => {
    setPermissions(permApi?.data?.data?.permission);
  }, [permApi?.data]);

  useEffect(() => {
    setUsers(permApi?.data?.data?.users);
  }, [permApi?.data]);

  useEffect(() => {
    setActiveRole(data?.data?.[0]?.id);
  }, [data?.data]);

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
          Roles and Permissions
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mt="32px"
        >
          <ToggleButtonGroup
            value={activeRole}
            exclusive
            onChange={handleRoleChange}
            aria-label="text alignment"
          >
            {data?.data?.map(({ id, name, user_count }: Props) => (
              <ToggleButton value={id} key={id}>
                {name} ({user_count})
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <Button
            sx={{ height: "40px", fontSize: "12px", fontWeight: 500 }}
            variant="outlined"
          >
            <BoxPlusIcon size={18} />
            Create custom role
          </Button>
        </Stack>
        <Typography mt="20px" fontSize="12px" color="rgba(38, 43, 64, 0.8)">
          Admins with this role:{" "}
          {users?.length
            ? users?.map(({ id, name }) => name).join(", ")
            : "N/A"}
        </Typography>
        <Box
          padding="25px 34px"
          width="100%"
          height="auto"
          maxWidth="788px"
          minHeight="432px"
          bgcolor="#fff"
          mt="35px"
        >
          <Typography fontWeight={600} fontSize="14px" color="#262B40">
            Permissions
          </Typography>
          <Stack mt="22px" spacing="20px">
            {permissions?.length ? (
              permissions?.map(
                ({ id, permission }: { id: number; permission: string }) => (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    key={id}
                  >
                    <Typography
                      fontSize="14px"
                      fontWeight={500}
                      color="rgba(38, 43, 64, 0.8)"
                    >
                      {permission}
                    </Typography>
                    <CheckboxIcon color="#2E3192" size={20} />
                  </Stack>
                )
              )
            ) : (
              <Typography
                fontSize="14px"
                fontWeight={500}
                color="rgba(38, 43, 64, 0.8)"
              >
                No result found
              </Typography>
            )}
          </Stack>
        </Box>
        <Button
          sx={{
            height: "40px",
            width: "max-content",
            fontSize: "12px",
            fontWeight: 500,
            mt: "27px",
          }}
          variant="outlined"
        >
          <PenIcon size={18} />
          Edit role
        </Button>
      </Stack>
    </Dashboard>
  );
};

export default Index;
