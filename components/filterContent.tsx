import filterOptions from "@/configs/filter";
import {
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { ChangeEvent, SetStateAction, useState } from "react";
import { DateRangePicker, DateRange } from "materialui-daterange-picker";
import ArrowDown from "remixicon-react/ArrowDownSLineIcon";
import ArrowUp from "remixicon-react/ArrowUpSLineIcon";

interface Props {
  updateFilter?: React.Dispatch<SetStateAction<{}>>;
  setDateRange: React.Dispatch<SetStateAction<{}>>;
  setForm: React.Dispatch<SetStateAction<{}>>;
  setSelectedFilters: React.Dispatch<SetStateAction<{}>>;
  handleClose: () => void;
  selector?: string;
  form: any;
  selectedFilters: any;
  dateRange: any;
}

interface FilterProps {
  id: number;
  title: string;
  type: string;
  options: [];
  key: string;
}

export default function FilterContent({
  updateFilter,
  setForm,
  form,
  selector,
  handleClose,
  dateRange,
  setDateRange,
  setSelectedFilters,
  selectedFilters,
}: Props) {
  const [active, setActive] = useState<number[]>([]);
  const [previewFilters, setPreviewFilters] = useState({});
  const [openDateRange, setOpenDateRange] = React.useState(false);

  const toggle = () => setOpenDateRange(!openDateRange);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: typeof form) => ({ ...prev, [name]: value }));
  };

  const handleFilterChange = (category: string, value: string) => {
    setSelectedFilters((prev: typeof selectedFilters) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleRemoveFilter = (filterObj: string | number) => {
    const newFilters = previewFilters as any;
    delete newFilters[filterObj];
    updateFilter && updateFilter(newFilters);
    setPreviewFilters({ ...newFilters });
    setSelectedFilters({ ...newFilters });

    if (Object.keys(previewFilters).length === 0) return resetToggle();
  };

  const resetToggle = () => {
    setSelectedFilters({});
    setDateRange({});
    setPreviewFilters({});
    updateFilter && updateFilter({});
    setForm({});
    handleClose();
  };

  const onApply = () => {
    const newFilters = form
      ? {
          ...selectedFilters,
          ...form,
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
    updateFilter && updateFilter(isDateRangeIncluded);
    setPreviewFilters(isDateRangeIncluded);
    // close modal
    handleClose();
  };

  const updateActiveFilter = (id: number) => {
    const exists = active.find((prop) => prop === id);
    if (exists) {
      const newActiveFilters = active.filter((prop) => prop !== id);
      return setActive(newActiveFilters);
    }
    setActive((prev: typeof active) => [...prev, id]);
  };

  return (
    <Stack padding="16px" width="320px" position="static">
      <Stack position="static">
        {/* @ts-ignore */}
        {filterOptions?.[selector ?? "merchant"]?.map(
          ({ id, title, type, options, key }: FilterProps) => {
            const fnName = title.replaceAll(" ", "");
            return (
              <Stack
                key={id}
                gap={"16px"}
                mb={!active.includes(id) ? "24px" : 0}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography fontSize="14px" color="#272501" fontWeight={500}>
                    {title}
                  </Typography>
                  <IconButton
                    sx={{ padding: "2px" }}
                    onClick={() => updateActiveFilter(id)}
                  >
                    <ArrowDown size={20} />
                  </IconButton>
                </Stack>
                <Collapse in={!active.includes(id)}>
                  {type === "list" ? (
                    <ToggleButtonGroup
                      onChange={(_, newAlignment) =>
                        handleFilterChange(fnName, newAlignment)
                      }
                      value={selectedFilters[fnName]?.replaceAll(" ", "-")}
                      exclusive
                    >
                      {options.length &&
                        options?.map((option: string, index: number) => {
                          return (
                            <ToggleButton
                              key={index}
                              value={option.replaceAll(" ", "-")}
                            >
                              {option}
                            </ToggleButton>
                          );
                        })}
                    </ToggleButtonGroup>
                  ) : type === "select" ? (
                    <TextField
                      fullWidth
                      variant="standard"
                      value={form?.[key ?? fnName]}
                      placeholder=""
                      onChange={handleInputChange}
                      name={key ?? fnName}
                      select
                    >
                      {options?.map((name, index) => {
                        return (
                          <MenuItem
                            sx={{ width: "100%" }}
                            key={index}
                            value={name}
                          >
                            {name}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  ) : (
                    <TextField
                      fullWidth
                      variant="standard"
                      value={form?.[key]}
                      placeholder=""
                      onChange={handleInputChange}
                      name={key}
                    />
                  )}
                </Collapse>
              </Stack>
            );
          }
        )}
      </Stack>
      {/* date range */}
      <Box mt={selector ? "26px" : ""} position="static">
        <Typography fontSize="14px" color="#262B40" fontWeight={500}>
          Date Range
        </Typography>
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
        <Box
          position="fixed"
          top={"50%"}
          left={"60%"}
          sx={{
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            bgcolor: "red",
          }}
        >
          <DateRangePicker
            open={openDateRange}
            toggle={toggle}
            onChange={(range) => setDateRange(range)}
            closeOnClickOutside
          />
        </Box>
      </Box>
      <Box mt="36px">
        <Divider />
        <Stack
          mt="16px"
          direction="row"
          justifyContent="flex-end"
          spacing="10px"
        >
          <Button
            sx={{ fontSize: "12px !important", height: "40px" }}
            variant="outlined"
            onClick={resetToggle}
          >
            Reset
          </Button>
          <Button
            sx={{ fontSize: "12px !important", height: "40px" }}
            variant="contained"
            onClick={onApply}
          >
            Apply filter
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
