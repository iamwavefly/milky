import * as React from "react";
import MuiTabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
    Form: any;
  }[];
  updateTab?: (tab: number) => void;
}

export default function Tabs({ tabs, updateTab }: Props) {
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
          {tabs?.map(({ id, tab }) => (
            <Tab value={id} key={id} label={tab} {...a11yProps(id)} />
          ))}
        </MuiTabs>
      </Box>
      <CustomTabPanel value={value} index={value}>
        {Component && <Component currentTab={value} />}
      </CustomTabPanel>
    </Box>
  );
}
