// import Dues from "@/components/table/settlements/dues/Dues";
import TabHeader from "@/components/TabHeader";
import RoleTable from "@/components/table/settings/roleTable";
import SettingsTable from "@/components/table/settings/settingsTable";
import SettingRoutes from "@/configs/links/SettingRoutes";
import SettlementHeaderRoutes from "@/configs/links/settlementRoutes";
import Dashboard from "@/layouts/dashboard";
import { roles } from "@/mocks";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  SwitchProps,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
import { styled } from "@mui/material/styles";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { setToastState } from "@/store/appSlice";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  marginRight: "12px",
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#2E3192",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const Index = () => {
  const [notification, setNotification] = useState([]);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/notification/user/get`,
    "get"
  );

  const dispatch = useDispatch();
  const updateNotifApi = useFetch(`${baseUrl}/notification/user/update`);

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    if (data) {
      setNotification(data?.data);
    }
  }, [data]);

  useEffect(() => {
    const { status, message } = updateNotifApi?.data;
    if (status === "success") {
      handleSubmit();
    }
  }, [updateNotifApi?.data]);

  const changeHandler = (type: string, id: string | null, check: boolean) => {
    const payload = {
      [type]: check,
      notification_type_id: id,
    };
    updateNotifApi?.handleSubmit(payload);
  };

  return (
    <Dashboard title="Settings">
      <TabHeader routes={SettingRoutes} />
      <Stack direction="row" justifyContent="flex-end" spacing="16px" mt="32px">
        <LoadingButton
          // loading={updateNotifApi?.loading}
          variant="contained"
          onClick={() => changeHandler("update_all_push", null, true)}
        >
          Turn on all push
        </LoadingButton>
        <LoadingButton
          // loading={updateNotifApi?.loading}
          variant="contained"
          onClick={() => changeHandler("update_all_email", null, true)}
        >
          Turn on all email
        </LoadingButton>
      </Stack>
      <Box bgcolor="#fff" width="795px" ml="auto" mr="auto" mt="24px" py="38px">
        {notification?.map(
          ({ name, id, description, email, push }: any, index: number) => {
            return (
              <>
                <Stack
                  key={id}
                  px="24px"
                  direction="row"
                  justifyContent="space-between"
                >
                  <Stack spacing="4px">
                    <Typography fontSize="16px">{name}</Typography>
                    <Typography
                      fontSize="14px"
                      color="#92959F"
                      maxWidth="484px"
                    >
                      {description}
                    </Typography>
                  </Stack>
                  <FormGroup sx={{ gap: "20px" }}>
                    <FormControlLabel
                      sx={{ fontSize: "1px" }}
                      checked={push}
                      disabled={updateNotifApi?.loading}
                      control={
                        <IOSSwitch
                          defaultChecked={push}
                          onChange={(e) =>
                            changeHandler("update_push", id, e.target.checked)
                          }
                        />
                      }
                      label="Push"
                    />
                    <FormControlLabel
                      checked={email}
                      disabled={updateNotifApi?.loading}
                      control={
                        <IOSSwitch
                          defaultChecked={email}
                          onChange={(e) =>
                            changeHandler("update_email", id, e.target.checked)
                          }
                        />
                      }
                      label="Email"
                    />
                  </FormGroup>
                </Stack>
                {index < data?.data?.length - 1 ? (
                  <Divider sx={{ my: "24px" }} />
                ) : (
                  ""
                )}
              </>
            );
          }
        )}
      </Box>
    </Dashboard>
  );
};

export default Index;
