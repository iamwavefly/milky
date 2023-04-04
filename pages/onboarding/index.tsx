import AccountTypePanel from "@/components/accountTypePanel";
import Dashboard from "@/layouts/dashboard";
import {
  Box,
  Button,
  Collapse,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UserIcon from "remixicon-react/User6LineIcon";
import FileIcon from "remixicon-react/FileList2LineIcon";
import AccountSetup from "@/layouts/setup";
import Router from "next/router";

const panels = [
  {
    id: 1,
    name: "Unregistered/Individual",
    subtitle: "An unregistered business e.g freelancers and sole traders",
    icon: <UserIcon size={"38"} color="#69696B" />,
  },
  {
    id: 2,
    name: "Registered",
    subtitle: "A registered business with a corporate bank account",
    icon: <FileIcon size={"38"} color="#69696B" />,
  },
];

export default function Index() {
  const [activePanel, setActivePanel] = useState<undefined | number>(undefined);

  useEffect(() => {
    console.log(activePanel);
  }, [activePanel]);

  const nextRoute = () => {
    Router.push(
      `/onboarding/setup?type=${
        activePanel === 2 ? "registered" : "unregistered"
      }`
    );
  };

  return (
    <AccountSetup activePanel={Boolean(activePanel !== undefined)}>
      <Stack gap="24px" padding="30px" bgcolor="#FFFFFF">
        {panels?.map(({ name, subtitle, id, icon }) => (
          <AccountTypePanel
            key={id}
            clickHandler={() => setActivePanel(id)}
            active={activePanel === id}
            title={name}
            subtitle={subtitle}
            icon={icon}
          />
        ))}
        <Collapse in={Boolean(activePanel !== undefined)}>
          <Stack spacing="16px">
            <TextField variant="standard" label="Business/Company name" />
            <TextField variant="standard" label="Location of business" />
            <Stack direction="row" spacing="22px">
              <TextField
                sx={{ flex: 1 }}
                variant="standard"
                label="Business size"
              />
              <TextField
                sx={{ flex: 1 }}
                variant="standard"
                label="Business size"
              />
            </Stack>
          </Stack>
          <Button
            onClick={nextRoute}
            variant="contained"
            fullWidth
            sx={{ mt: "22px", flex: 1 }}
          >
            Proceed to my dashboard
          </Button>
        </Collapse>
      </Stack>
    </AccountSetup>
  );
}
