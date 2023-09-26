import {
  Box,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import { DateRange } from "materialui-daterange-picker";
import React, { SetStateAction, useEffect, useState } from "react";
import CarretIcon from "../public/icons/arrow-down.svg";
import FilterContent from "./filterContent";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";

interface Props {
  updateFilter?: React.Dispatch<SetStateAction<{}>>;
  title?: string;
  selector?: string;
}

export default function FilterCurrencyMenu({
  updateFilter,
  title,
  selector,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currencies, setCurrencies] = useState([]);
  const [setselectedCurrencies, setSetselectedCurrencies] = useState(0);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/service/currencies`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    const fnCurrencies = data?.data?.filter(
      ({ is_allowed }: { is_allowed: boolean }) => is_allowed
    );
    setCurrencies(fnCurrencies);
  }, [data?.data]);

  const onSelectionChanged = (id: number) => {
    setSetselectedCurrencies(id);
    handleClose();
  };

  return (
    <Box width="max-content">
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {currencies?.map(({ short_name, id }: any) => (
          <MenuItem
            onClick={() => onSelectionChanged(id)}
            selected={setselectedCurrencies === id}
            value={id}
            key={id}
            sx={{ width: "100%" }}
          >
            {short_name}
          </MenuItem>
        ))}
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
