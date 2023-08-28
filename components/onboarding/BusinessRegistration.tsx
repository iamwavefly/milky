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

export default function BusinessRegistration({ nextStep }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [activePanel, setActivePanel] = useState<undefined | number>(undefined);
  const [form, setForm] = useState({});

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const fileChangeHandler = (name: string, file: Blob) => {
    setForm((prev) => ({ ...prev, [name]: file }));
  };

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/signup`
  );

  return (
    <Box bgcolor="#FFF">
      <Box px="40px" pt="29px" pb="40px">
        <Stack spacing="24px" mt="16px">
          <TextField label="Business class" variant="outlined" select>
            <MenuItem sx={{ width: "100%" }} value="Lagos">
              Primary sector
            </MenuItem>
          </TextField>
          <TextField
            label="Tax Identification Number (TIN)"
            variant="outlined"
          />
        </Stack>
      </Box>
      <Stack className={Styles.card} pb="28px" pt="20px">
        <Typography variant="h5" fontSize="15px" fontWeight={600}>
          Upload Business Documents
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
          maximum size of 10mb
        </Typography>
        <Stack gap="24px" mt="16px">
          <FileUpload
            title={"Certificate of incorporation"}
            update={(file: Blob) =>
              fileChangeHandler("certofincorporation", file)
            }
          />
          <FileUpload
            title={"Memorandum and Article of Association"}
            update={(file: Blob) =>
              fileChangeHandler("certofincorporation", file)
            }
          />
          <FileUpload
            title={"Particulars of Directors (Optional)"}
            multiple
            update={(file: Blob) =>
              fileChangeHandler("certofincorporation", file)
            }
          />
          <FileUpload
            title={"Statement of return on allotment of shares (optional)"}
            update={(file: Blob) =>
              fileChangeHandler("certofincorporation", file)
            }
          />
          <FileUpload
            title={"Proof of Business Address"}
            update={(file: Blob) =>
              fileChangeHandler("certofincorporation", file)
            }
          />
        </Stack>
      </Stack>
      <Stack pt="20px" pb="28px" className={Styles.card}>
        <Typography variant="h5" fontSize="15px" fontWeight={600}>
          Primary identification documents of all shareholders with 5% ownership
          and above
        </Typography>
        <Stack gap="24px" mt="16px">
          <FileUpload
            title={"Director 1"}
            update={(file: Blob) =>
              fileChangeHandler("certofincorporation", file)
            }
          />
          <FileUpload
            title={"Director 2"}
            update={(file: Blob) =>
              fileChangeHandler("certofincorporation", file)
            }
          />
          <FileUpload
            title={"Operating license (optional)"}
            multiple
            update={(file: Blob) =>
              fileChangeHandler("certofincorporation", file)
            }
          />
        </Stack>
      </Stack>
      <Stack pt="20px" pb="40px" className={Styles.card}>
        {/* header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontSize="15px" fontWeight={600} lineHeight="26px">
            Add at least one stakeholder
          </Typography>
          <Stack
            direction="row"
            spacing="6px"
            alignItems="center"
            sx={{ cursor: "pointer" }}
          >
            <AddIcon width="18px" height="18px" fill="#0048B1" />
            <Typography
              color="#0048B1"
              fontSize="13px"
              fontWeight={600}
              lineHeight="22px"
            >
              Add another
            </Typography>
          </Stack>
        </Stack>
        {/* form */}
        <Stack mt="12px">
          <Button sx={{ width: "max-content" }} variant="outlined">
            Add stakeholders
          </Button>
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
