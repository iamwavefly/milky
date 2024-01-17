import { FilledInputProps } from "@mui/material";

export interface ProductImage {
  name: string;
  file: File;
}

export interface CustomFilledInputProps extends FilledInputProps {
  pattern?: string;
}
