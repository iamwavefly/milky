import React from "react";
import CheckmarkIcon from "@/public/icons/checkbox.svg";
import CheckmarkChecked from "@/public/icons/Checkbox-checked.svg";
import MuiCheckbox from "@mui/material/Checkbox";
import { CheckboxProps } from "@material-ui/core";

export default function Checkbox({ ...others }: CheckboxProps) {
  return (
    <MuiCheckbox
      icon={<CheckmarkIcon />} // Replace the default icon with an empty span
      checkedIcon={<CheckmarkChecked />}
      {...others}
    />
  );
}
