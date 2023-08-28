import React from "react";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowUpIcon from "@/public/icons/caret-up.svg";
import { useDispatch } from "react-redux";
import { setDrawalState } from "@/store/appSlice";
import AddIcon from "@/public/icons/add.svg";

interface BusinessDetailsProps {
  nextStep: () => void;
}

export default function InvoiceDetails({ nextStep }: BusinessDetailsProps) {
  const dispatch = useDispatch();
  const close = () => dispatch(setDrawalState({ active: false }));

  return (
    <Box>
      {/* form */}
      <Stack mt="40px" px="40px" spacing="24px">
        <TextField label="Invoice title" variant="outlined" />
        <TextField
          label="Due date"
          variant="outlined"
          type="date"
          InputLabelProps={{ shrink: true }}
        />
        <TextField label="Currency" variant="outlined" select>
          <MenuItem sx={{ width: "100%" }} value="ngn">
            NGN
          </MenuItem>
          <MenuItem sx={{ width: "100%" }} value="usd">
            USD
          </MenuItem>
        </TextField>
      </Stack>
      {/*  /form */}
      <Stack
        mt="32px"
        pt="8px"
        pb="20px"
        px="40px"
        spacing="24px"
        borderTop="1px solid #E8EAED"
      >
        {/*  items */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          borderBottom="1px solid #E8EAED"
          py="12px"
        >
          <Typography color="#070F1C" fontSize="14px" fontWeight={600}>
            Item 1
          </Typography>
          <IconButton>
            <ArrowUpIcon width="20px" height="20px" fill="#6F7A90" />
          </IconButton>
        </Stack>
        {/* /itemsz */}
        <TextField
          label="Item description"
          multiline
          variant="outlined"
          rows={5}
        />
        <TextField label="Quantity" variant="outlined" type="number" />
        <TextField label="Unit price" variant="outlined" type="number" />
        <Box>
          <Button variant="text">
            <AddIcon width="18px" height="18px" fill="#0048B1" /> Add another
            item
          </Button>
        </Box>
      </Stack>
      <Stack
        mt="20px"
        pt="32px"
        pb="20px"
        px="40px"
        spacing="24px"
        borderTop="1px solid #E8EAED"
      >
        <TextField
          label="Invoice notes"
          multiline
          variant="outlined"
          rows={5}
        />
        <TextField label="Add discount" variant="outlined" type="number" />
        <TextField label="Add tax" variant="outlined" type="number" />
      </Stack>
      <Stack mt="20px" px="40px" borderTop="1px solid #E8EAED">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          borderBottom="1px solid #E8EAED"
          pt="12px"
          pb="16px"
        >
          <Typography color="#070F1C" fontSize="14px" fontWeight={500}>
            Subtotal
          </Typography>
          <Typography color="#070F1C" fontSize="14px" fontWeight={600}>
            NGN 0.00
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          borderBottom="1px solid #E8EAED"
          pt="12px"
          pb="16px"
        >
          <Typography color="#070F1C" fontSize="14px" fontWeight={500}>
            Total
          </Typography>
          <Typography color="#070F1C" fontSize="18px" fontWeight={600}>
            NGN 0.00
          </Typography>
        </Stack>
      </Stack>
      {/* buttons */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        borderTop="1px solid #E8EAED"
        mt="56px"
        px="40px"
        py="16px"
        spacing="28px"
        bgcolor="#fff"
        position="sticky"
        bottom={0}
        left={0}
        zIndex={2}
      >
        <Button variant="text" onClick={close}>
          Cancel
        </Button>
        <Button variant="containedMedium" onClick={close}>
          Send invoice
        </Button>
      </Stack>
    </Box>
  );
}
