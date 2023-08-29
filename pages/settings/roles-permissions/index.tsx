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
import Checkbox from "@/components/elements/Checkbox";
import { useDispatch } from "react-redux";
import NewSubsidiary from "@/components/form/newSubsidiary";
import { setDrawalState } from "@/store/appSlice";
import NewRole from "@/components/form/newRole";
import Tabs from "@/components/Tabs";
// icons
import UserIcon from "@/public/icons/user-line.svg";

interface Props {
  id: number;
  name: string;
  tab: string;
  user_count: number;
}

const Index = () => {
  const [activeRole, setActiveRole] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [userPermission, setUserPermission] = useState([]);
  const [roles, setRoles] = useState<Props[]>([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedRole, setSelectedRole] = useState<Props>({} as Props);

  const dispatch = useDispatch();
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/role/users`,
    "get"
  );
  // fetch permission based on role
  const permApi = useFetch(
    `${baseUrl}/dashboard/role/details?roleid=${currentTab}`,
    "get"
  );
  // permissions
  const fetchPermissions = useFetch(
    `${baseUrl}/dashboard/role/permissions`,
    "get"
  );
  // update permission
  const updatePermission = useFetch(`${baseUrl}/dashboard/role/edit`);

  useEffect(() => {
    setCurrentTab(roles?.[0]?.id);
  }, [roles]);

  useEffect(() => {
    const newRole = roles?.find((role) => role.id === currentTab);
    setSelectedRole(newRole as Props);
    console.log({ newRole });
  }, [roles, currentTab]);

  useEffect(() => {
    handleSubmit();
  }, []);

  // fetch roles
  useEffect(() => {
    const newRoles = data?.data?.map(({ id, name, user_count }: Props) => {
      return {
        id,
        tab: name,
        count: user_count ?? 0,
      };
    });
    setRoles(newRoles);
  }, [data?.data]);

  useEffect(() => {
    fetchPermissions?.handleSubmit();
  }, []);

  useEffect(() => {
    currentTab && permApi?.handleSubmit();
  }, [currentTab]);

  useEffect(() => {
    setUserPermission(permApi?.data?.data?.permission);
  }, [permApi?.data]);
  // all permission
  useEffect(() => {
    setPermissions(fetchPermissions?.data?.data);
  }, [permApi?.data]);

  useEffect(() => {
    setUsers(permApi?.data?.data?.users);
  }, [permApi?.data]);

  useEffect(() => {
    setActiveRole(data?.data?.[0]?.id);
  }, [data?.data]);

  useEffect(() => {
    const { error } = updatePermission;
    if (error) {
      permApi?.handleSubmit();
    }
  }, [updatePermission?.error]);

  const handleRoleChange = (
    event: React.MouseEvent<HTMLElement>,
    newRole: string
  ) => {
    setActiveRole(newRole);
  };

  const openDrawal = () => {
    dispatch(
      setDrawalState({
        active: true,
        title: "Add a New Role",
        content: <NewRole reload={handleSubmit} />,
      })
    );
  };

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    let newPermissions: string[] | null = null;
    if (!checked) {
      newPermissions = userPermission?.filter((permission: any) => {
        if (permission.id !== +value) {
          return permission;
        }
      });
    }
    updatePermission?.handleSubmit({
      role_id: activeRole,
      permissions: newPermissions?.map((permission: any) => permission.id) ?? [
        value,
      ],
    });
  };

  return (
    <Dashboard title="Settings">
      <Stack>
        <Stack
          spacing="12px"
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Typography
            fontSize="18px"
            fontWeight={600}
            color="#070F1C"
            lineHeight="26px"
          >
            Roles & Permission
          </Typography>
          <Button variant="containedMedium" sx={{ height: "40px" }}>
            <UserIcon />
            Create custom role
          </Button>
        </Stack>
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
            <Tabs
              tabs={roles as any}
              updateTab={setCurrentTab}
              currentTab={currentTab}
            />
          </ToggleButtonGroup>
        </Stack>
        <Stack direction="row" spacing="88px" mt="46px">
          <Stack spacing="12px" width="342px">
            <Typography fontSize="18px" fontWeight={600} lineHeight="26px">
              {selectedRole?.tab}
            </Typography>
            <Typography
              fontSize="14px"
              lineHeight="24px"
              letterSpacing="0.14px"
            >
              Admin with this role:
            </Typography>
          </Stack>
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
              {permissions?.map((perm: any) => {
                const newPermission = userPermission?.find(
                  (fin: any) => fin.id === perm.id
                ) as any;
                if (newPermission) {
                  return (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      key={newPermission?.id}
                    >
                      <Typography
                        fontSize="14px"
                        fontWeight={500}
                        color="rgba(38, 43, 64, 0.8)"
                      >
                        {newPermission?.permission}
                      </Typography>
                      <Checkbox
                        value={newPermission?.id}
                        defaultChecked
                        onChange={handleCheck}
                      />
                    </Stack>
                  );
                } else {
                  return (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      key={perm?.name}
                    >
                      <Typography
                        fontSize="14px"
                        fontWeight={500}
                        color="rgba(38, 43, 64, 0.8)"
                      >
                        {perm?.name}
                      </Typography>
                      <Checkbox onChange={handleCheck} value={perm?.id} />
                    </Stack>
                  );
                }
              })}
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Dashboard>
  );
};

export default Index;
