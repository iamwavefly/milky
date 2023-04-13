// @ts-nocheck
import {
  Box,
  Button,
  OutlinedInput,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { SetStateAction, useEffect, useState } from "react";
import ChipFilter from "../chips/filter";
import PlusIcon from "../../public/icons/plus-circle.svg";
import ResetIcon from "../../public/icons/reset.svg";
import ArrowRightUpIcon from "../../public/icons/arrow-right-up.svg";
import Modal from "../modal/modal";
import { DateRangePicker, DateRange } from "materialui-daterange-picker";
import moment from "moment";

export default function FilterTable({
  updateFilter,
}: {
  updateFilter?: React.Dispatch<SetStateAction<{}>>;
}) {
  const CATEGORIES = ["BusinessType", "Status"];
  const FILTER_OPTIONS = {
    BusinessType: [
      { label: "Individual", value: "individual" },
      { label: "Company", value: "company" },
    ],
    Status: [
      { label: "Pending Verification", value: "pending-verification" },
      { label: "New", value: "new" },
      { label: "Active", value: "active" },
    ],
  };

  const [selectedFilters, setSelectedFilters] = useState<any>({});
  const [previewFilters, setPreviewFilters] = useState({});
  const [openDateRange, setOpenDateRange] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange>({});
  const [email, setEmail] = useState("");

  const toggle = () => setOpenDateRange(!openDateRange);

  const handleFilterChange = (category: any, value: any) => {
    setSelectedFilters({
      ...selectedFilters,
      [category]: value,
    });
  };

  const handleRemoveFilter = (filterObj: any) => {
    const newFilters = previewFilters;
    delete newFilters[filterObj];
    updateFilter(newFilters);
    setPreviewFilters({ ...newFilters });
    setSelectedFilters({ ...newFilters });
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const resetToggle = () => {
    setSelectedFilters({});
    setDateRange({});
    setPreviewFilters({});
    updateFilter({});
    setEmail("");
    handleClose();
  };

  const onApply = () => {
    const newFilters = email
      ? {
          ...selectedFilters,
          email,
        }
      : selectedFilters;
    // check if data range included
    const isDateRangeIncluded = dateRange.startDate
      ? {
          fromdate: moment(dateRange.startDate).format("L"),
          todate: moment(dateRange.endDate).format("L"),
          ...newFilters,
        }
      : newFilters;
    // update filters
    updateFilter(isDateRangeIncluded);
    setPreviewFilters(isDateRangeIncluded);
    // close modal
    handleClose();
  };

  return (
    <>
      <Modal
        title="Filter transactions"
        isOpen={open}
        close={() => setOpen(false)}
        onClose={handleClose}
      >
        <Box maxWidth="489px">
          {CATEGORIES.map((category: any) => (
            <Box key={category} sx={{ mb: 2 }}>
              <Typography fontSize="14px">{category}</Typography>
              <ToggleButtonGroup
                sx={{ mt: "16px" }}
                exclusive
                aria-label="Channel"
              >
                {FILTER_OPTIONS[category].map((option: any) => {
                  console.log(selectedFilters[category]);
                  return (
                    <ToggleButton
                      selected={selectedFilters[category] === option.value}
                      onClick={() => handleFilterChange(category, option.value)}
                      value={option.value}
                    >
                      {option.label}
                    </ToggleButton>
                  );
                })}
              </ToggleButtonGroup>
            </Box>
          ))}
        </Box>
        {/* date range */}
        <Box>
          <Typography fontSize="14px">Date range</Typography>
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="standard"
            value={
              dateRange.startDate &&
              `${moment(dateRange.startDate).format("L")} - ${moment(
                dateRange.endDate
              ).format("L")}`
            }
            placeholder="03/18/2023 - 03/18/2023"
            sx={{ maxHeight: "36px", mt: "16px" }}
            name="datePicker"
            onClick={toggle}
          />
          <Box position="absolute" bottom={0} left={0}>
            <DateRangePicker
              open={openDateRange}
              toggle={toggle}
              onChange={(range) => setDateRange(range)}
              closeOnClickOutside
            />
          </Box>
        </Box>
        <Box mt="32px">
          <Typography m={0} fontSize="14px">
            Email address
          </Typography>
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="standard"
            placeholder="johndoe@gmail.com"
            sx={{ maxHeight: "36px", mt: "16px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Stack mt="48px" direction="row" justifyContent="center" spacing="24px">
          <Button variant="outlined" onClick={resetToggle}>
            <ResetIcon />
            Reset
          </Button>
          <Button variant="contained" onClick={onApply}>
            <ArrowRightUpIcon />
            Apply filter
          </Button>
        </Stack>
      </Modal>
      <Stack
        direction="row"
        borderTop="1px solid #E4E8F2"
        p="24px"
        flexWrap="wrap"
        gap="16px"
      >
        {Object.entries(previewFilters)?.map((filterArr) => (
          <ChipFilter
            placeholder={filterArr[0]}
            title={filterArr[1]}
            onClick={() => handleRemoveFilter(filterArr[0])}
          />
        ))}

        <Button
          variant="outlined"
          sx={{
            width: "110px",
            height: "36px",
            border: "1px solid #2E3192 !important",
            color: "#2E3192",
            fontSize: "12px",
            textTransform: "none",
            fontWeight: 400,
            gap: "9px",
            m: 0,
          }}
          onClick={handleOpen}
        >
          Add filter
          <PlusIcon />
        </Button>
      </Stack>
    </>
  );
}
