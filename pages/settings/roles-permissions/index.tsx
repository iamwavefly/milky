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
import UserCard from "@/components/cards/User";
import Modal from "@/components/modal/modal";

interface Props {
  id: number;
  name: string;
  tab: string;
  user_count: number;
}

interface UserProps {
  id: number;
  name: string;
}

const Index = () => {
  const [activeRole, setActiveRole] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [userPermission, setUserPermission] = useState([]);
  const [roles, setRoles] = useState<Props[]>([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedRole, setSelectedRole] = useState<Props>({} as Props);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
      <Modal
        title="New customer"
        isOpen={openModal}
        close={handleCloseModal}
        onClose={handleCloseModal}
      >
        <NewRole reload={handleSubmit} close={handleCloseModal} />
      </Modal>
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
          <Button
            variant="containedMedium"
            sx={{ height: "40px" }}
            onClick={handleOpenModal}
          >
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
          <Tabs
            tabs={roles as any}
            updateTab={setCurrentTab}
            currentTab={currentTab}
          />
        </Stack>
        <Stack direction="row" spacing="88px" mt="46px">
          <Box width="342px">
            <Typography fontSize="18px" fontWeight={600} lineHeight="26px">
              {selectedRole?.tab}
            </Typography>
            <Typography
              fontSize="14px"
              lineHeight="24px"
              letterSpacing="0.14px"
              mt="12px"
            >
              Admin with this role:
            </Typography>
            <Stack mt="32px" spacing="16px">
              {users?.length
                ? users?.map(({ id, name }: UserProps) => (
                    <UserCard key={id} name={name} />
                  ))
                : "N/A"}
            </Stack>
          </Box>
          <Box
            width="100%"
            height="auto"
            maxWidth="788px"
            minHeight="432px"
            bgcolor="#fff"
            mt="35px"
            border="1px solid #E8EAED"
            borderRadius="8px"
          >
            <Stack
              height="72px"
              justifyContent="center"
              borderBottom="1px solid #E8EAED"
              px="40px"
            >
              <Typography fontWeight={700} fontSize="15px" color="#070F1C">
                Permissions
              </Typography>
            </Stack>
            <Stack>
              {permissions?.map(({ id, name }: any) => {
                const newPermission = userPermission?.find(
                  (fin: any) => fin.id === id
                ) as any;

                if (newPermission) {
                  return (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      key={newPermission?.id}
                      height="60px"
                      borderBottom="1px solid #E8EAED"
                      px="40px"
                      alignItems="center"
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
                      key={name}
                      height="60px"
                      borderBottom="1px solid #E8EAED"
                      px="40px"
                      alignItems="center"
                    >
                      <Typography
                        fontSize="14px"
                        fontWeight={500}
                        color="rgba(38, 43, 64, 0.8)"
                      >
                        {name}
                      </Typography>
                      <Checkbox onChange={handleCheck} value={id} />
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
