import { setSearchQuery } from "@/store/cartSlice";
import { Stack, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";

export default function FilterPost() {
  const dispatch = useDispatch();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    // Dispatch action to set search query
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <Stack direction="row" mt="48px" justifyContent="space-between">
      <TextField
        variant="filled"
        placeholder="Product Search"
        onChange={handleSearch}
        InputProps={{
          disableUnderline: true,
        }}
      />
      <TextField
        variant="filled"
        placeholder="Choose Category"
        InputProps={{
          disableUnderline: true,
        }}
      />
    </Stack>
  );
}
