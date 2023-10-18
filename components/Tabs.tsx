import * as React from "react";
import MuiTabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Badge, Grid, Skeleton, Stack } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
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

interface Props {
  tabs: {
    id: number;
    tab: string;
    Form?: any;
    count?: null;
  }[];
  updateTab?: (tab: number) => void;
  currentTab?: number;
}

export default function Tabs({ tabs, updateTab, currentTab }: Props) {
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    updateTab && updateTab(value);
  }, [value]);

  React.useEffect(() => {
    currentTab && setValue(currentTab);
  }, [currentTab]);

  const Component = tabs?.[value - 1]?.Form;

  return (
    <Box>
      <Box>
        <MuiTabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            sx: {
              bgcolor: "#0048B1",
              height: "3px",
              borderRadius: "20px",
            },
          }}
        >
          {tabs?.map(({ id, tab, count }) => {
            const isActive = value === id;
            return (
              <Tab
                value={id}
                key={id}
                label={
                  <Stack direction="row" alignItems="center" gap="6px">
                    <Typography
                      fontSize="14px"
                      fontWeight={isActive ? 600 : 500}
                    >
                      {tab}
                    </Typography>
                    {typeof count === "number" && (
                      <Stack
                        width="24px"
                        height="24px"
                        bgcolor={isActive ? "#0048B1" : "#DADCE2"}
                        borderRadius="50%"
                        fontSize="12px"
                        fontWeight={600}
                        color={isActive ? "#fff" : "#3C4453"}
                        justifyContent="center"
                        lineHeight="100%"
                      >
                        {count}
                      </Stack>
                    )}
                  </Stack>
                }
                {...a11yProps(id)}
              />
            );
          })}
        </MuiTabs>
      </Box>
      <CustomTabPanel value={value} index={value}>
        {Component ? (
          <Component currentTab={value} />
        ) : (
          <Stack spacing="18px" direction="row" mb="33px" mt="51px">
            <Skeleton variant="rounded" height={160} width="100%" />
            <Skeleton variant="rounded" height={160} width="100%" />
            <Skeleton variant="rounded" height={160} width="100%" />
          </Stack>
        )}
      </CustomTabPanel>
    </Box>
  );
}
