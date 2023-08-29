import PayoutTable from "@/components/settings/payouts/payoutTable";
import useFetch from "@/hooks/useFetch";
import Dashboard from "@/layouts/dashboard";
import baseUrl from "@/middleware/baseUrl";
import {
  Box,
  Button,
  Checkbox,
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
import { useDispatch } from "react-redux";
import NewSubsidiary from "@/components/form/newSubsidiary";
import { setDrawalState } from "@/store/appSlice";
import NewRole from "@/components/form/newRole";
import Tabs from "@/components/Tabs";

interface Props {
  id: number;
  name: string;
  user_count: number;
}

const Index = () => {
  const [activeRole, setActiveRole] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [userPermission, setUserPermission] = useState([]);
  const [roles, setRoles] = useState([]);

  const dispatch = useDispatch();
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/role/users`,
    "get"
  );
  // fetch permission based on role
  const permApi = useFetch(
    `${baseUrl}/dashboard/role/details?roleid=${activeRole}`,
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
    handleSubmit();
  }, []);

  // fetch roles
  useEffect(() => {
    const newRoles = data?.data?.map(
      ({ id, name }: { id: number; name: string }) => {
        return {
          id,
          tab: name,
        };
      }
    );
    console.log({ newRoles });
    setRoles(newRoles);
  }, [data?.data]);

  useEffect(() => {
    fetchPermissions?.handleSubmit();
  }, []);

  useEffect(() => {
    activeRole && permApi?.handleSubmit();
  }, [activeRole]);

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
            {/* {roles?.map(({ id, name, user_count }: Props) => (
              <ToggleButton value={id} key={id}>
                {name} ({user_count})
              </ToggleButton>
            ))} */}
            <Tabs tabs={roles} />
          </ToggleButtonGroup>
          <Button
            sx={{ height: "40px", fontSize: "12px", fontWeight: 500 }}
            variant="outlined"
            onClick={openDrawal}
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
            {/* {permissions?.length ? (
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
            )} */}
          </Stack>
        </Box>
        {/* <Button
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
        </Button> */}
      </Stack>
    </Dashboard>
  );
};

export default Index;
