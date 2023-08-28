import React, { useState } from "react";
import { accountTypes } from "@/utils/signup";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountTypePanel from "../accountTypePanel";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import FileUpload from "../FileUpload";
import AddIcon from "@/public/icons/add-circle.svg";
import Styles from "./style.module.scss";

interface Props {
  nextStep: () => void;
}

export default function PersonalInformation({ nextStep }: Props) {
  const [form, setForm] = useState({});

  const fileChangeHandler = (name: string, file: Blob) => {
    setForm((prev) => ({ ...prev, [name]: file }));
  };

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/signup`
  );

  return (
    <Box bgcolor="#FFF">
      <Box px="40px" pt="29px" pb="28px">
        <Stack gap="24px">
          <Box>
            <TextField
              fullWidth
              label="Bank Verification Number (BVN)"
              variant="outlined"
            />
            <Typography
              mt="8px"
              fontSize="12px"
              color="#070F1C"
              lineHeight="18px"
            >
              To get your BVN dial *565*0# on your registered mobile number
            </Typography>
          </Box>
          <TextField
            label="Tax Identification Number (TIN)"
            variant="outlined"
            fullWidth
          />
          <TextField label="Gender" variant="outlined" fullWidth select>
            <MenuItem sx={{ width: "100%" }} value="female">
              Female
            </MenuItem>
            <MenuItem sx={{ width: "100%" }} value="male">
              Male
            </MenuItem>
          </TextField>
          <TextField
            label="Date of birth"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="date"
          />
          <TextField label="Phone number" variant="outlined" fullWidth />
          <TextField
            label="Identification document"
            variant="outlined"
            fullWidth
            select
          >
            <MenuItem sx={{ width: "100%" }} value="female">
              International passport
            </MenuItem>
          </TextField>
          <TextField
            label="Identification document number"
            variant="outlined"
            fullWidth
          />
        </Stack>
      </Box>
      <Stack className={Styles.card} pb="28px" pt="20px">
        <Typography variant="h5" fontSize="15px" fontWeight={600}>
          Upload Documents
        </Typography>
        <Typography
          fontSize="13px"
          fontWeight={400}
          lineHeight="21px"
          letterSpacing="0.195px"
          mt="4px"
          color="#3C4453"
        >
          All documents must be in either jpeg, jpg, png, PDF format with
          maximum size of 10mb. A valid ID can be an International passport,
          Driver’s License, National ID or Voter’s Card.
        </Typography>
        <Stack gap="24px" mt="16px">
          <FileUpload
            title={"Valid ID"}
            update={(file: Blob) =>
              fileChangeHandler("certofincorporation", file)
            }
          />
          <FileUpload
            title={"Passport Photograph"}
            update={(file: Blob) =>
              fileChangeHandler("certofincorporation", file)
            }
          />
          <FileUpload
            title={"Proof of Address"}
            multiple
            update={(file: Blob) =>
              fileChangeHandler("certofincorporation", file)
            }
          />
        </Stack>
      </Stack>
      {/* footer */}
      <Stack
        py="16px"
        spacing="28px"
        direction="row"
        className={Styles.card}
        justifyContent="flex-end"
      >
        <Button variant="text" sx={{ p: 0, bgcolor: "transparent !important" }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={nextStep}>
          Save & Continue
        </Button>
      </Stack>
    </Box>
  );
}
