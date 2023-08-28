import React from "react";
import RadioIcon from "@/public/icons/radio.svg";
import RadioCheckedIcon from "@/public/icons/radio-checked.svg";
import MuiRadio from "@mui/material/Radio";
import { CheckboxProps } from "@material-ui/core";

export default function Radio({ ...others }: CheckboxProps) {
  return (
    <MuiRadio
      icon={<RadioIcon />} // Replace the default icon with an empty span
      checkedIcon={<RadioCheckedIcon />}
      {...others}
    />
  );
}
