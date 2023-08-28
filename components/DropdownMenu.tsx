import {
  Box,
  Fade,
  IconButton,
  Menu,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import { DateRange } from "materialui-daterange-picker";
import React, { SetStateAction, useState } from "react";
import CarretIcon from "../public/icons/arrow-down.svg";
import FilterContent from "./filterContent";

interface Props {
  updateFilter?: React.Dispatch<SetStateAction<{}>>;
  title?: string;
  selector?: string;
}

export default function DropdownMenu({ updateFilter, title, selector }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [form, setForm] = useState<any>(null);
  const [dateRange, setDateRange] = React.useState<DateRange>({});
  const [selectedFilters, setSelectedFilters] = useState<any>({});
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box width="max-content">
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <FilterContent
          updateFilter={updateFilter}
          selector={selector}
          handleClose={handleClose}
          setForm={setForm}
          form={form}
          dateRange={dateRange}
          selectedFilters={selectedFilters}
          setDateRange={setDateRange}
          setSelectedFilters={setSelectedFilters}
        />
      </Menu>
      <Stack
        width="max-content"
        minWidth="103px"
        minHeight="40px"
        bgcolor="#fff"
        border="1px solid #DADCE2"
        direction="row"
        borderRadius="8px"
      >
        <Box
          px="16px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRight="1px solid #DADCE2"
        >
          <Typography fontSize="14px" color="#162031" fontWeight={500}>
            {title}
          </Typography>
        </Box>
        <IconButton
          sx={{ flex: 1, minWidth: "35px" }}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <CarretIcon height="18px" width="18px" fill="#586379" />
        </IconButton>
      </Stack>
    </Box>
  );
}
