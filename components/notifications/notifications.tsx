import { selectUserState } from "@/store/authSlice";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Notification from "./notification";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      mt="24px"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Notifications() {
  const [value, setValue] = React.useState(0);

  const { notifications } = useSelector(selectUserState);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box width="344px" minHeight="462px">
      {/* header */}
      <Stack
        height="44px"
        boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)"
        borderBottom="1px solid #F3F3F9"
        padding="0 24px"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography fontWeight={500} fontSize="14px">
          Notifications
        </Typography>
        <Typography fontSize="10px" color="#2E3192" sx={{ cursor: "pointer" }}>
          Mark all as read
        </Typography>
      </Stack>
      {/* content */}
      <Stack padding="24px">
        <Box sx={{ width: "100%" }}>
          <Box>
            <Tabs value={value} onChange={handleChange}>
              <Tab
                label={
                  <Stack direction="row" alignItems="center">
                    <Typography fontSize="10px">All</Typography>
                    <Typography
                      padding="2px"
                      bgcolor="#F3F3F9"
                      component="span"
                      fontSize="10px"
                      ml="4px"
                      color="#EA5851"
                    >
                      {notifications?.length > 9 ? "9+" : notifications?.length}
                    </Typography>
                  </Stack>
                }
                {...a11yProps(0)}
              />
              <Tab
                label={
                  <Stack direction="row" alignItems="center">
                    <Typography fontSize="10px">Unread messages</Typography>
                  </Stack>
                }
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          {notifications?.length ? (
            notifications?.map((notif, index) => (
              <TabPanel key={notif?.id} value={value} index={index}>
                <Notification details={notif} />
              </TabPanel>
            ))
          ) : (
            <TabPanel value={value} index={0}>
              <Typography fontSize="12px" lineHeight="16px" color="#262B40">
                Nothing found!
              </Typography>
            </TabPanel>
          )}
          <TabPanel value={value} index={1}>
            {/* <Notification details={notif} /> */}
            <Typography fontSize="12px" lineHeight="16px" color="#262B40">
              Nothing found!
            </Typography>
          </TabPanel>
        </Box>
      </Stack>
    </Box>
  );
}
