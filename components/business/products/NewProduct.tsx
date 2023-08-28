import BulkImageUpload from "@/components/BulkUpload";
import Checkbox from "@/components/elements/Checkbox";
import Radio from "@/components/elements/Radio";
import { ProductImage } from "@/types";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CopyIcon from "@/public/icons/copy.svg";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { setDrawalState } from "@/store/appSlice";

export default function NewProduct() {
  const [images, setImages] = useState<ProductImage[]>([]);

  const dispatch = useDispatch();
  const close = () => dispatch(setDrawalState({ active: false }));

  return (
    <Box>
      {/* product images */}
      <Box mt="32px" px="40px" pb="32px">
        <Typography fontSize="18px" fontWeight={500} lineHeight="26px">
          Product image
        </Typography>
        <Typography
          mt="12px"
          color="#3C4453"
          fontSize="14px"
          lineHeight="24px"
          letterSpacing="0.14px"
        >
          Add up to 6 high quality product images. Maximum upload size is 10mb
        </Typography>
        <Box mt="32px">
          <BulkImageUpload limit={6} uploadImages={setImages} />
        </Box>
      </Box>
      <Divider />
      {/* product details */}
      <Box mt="32px" px="40px" pb="28px">
        <Typography fontSize="18px" fontWeight={500} lineHeight="26px">
          Product information
        </Typography>
        <Stack spacing="24px" mt="32px">
          <TextField label="Product name" variant="outlined" />
          <TextField
            label="Product description"
            variant="outlined"
            multiline
            rows={5}
          />
          <TextField label="Price" variant="outlined" />
          <Stack spacing="8px">
            <Typography fontSize="15px" fontWeight={600} lineHeight="26px">
              Quantity
            </Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="limited"
              name="radio-buttons-group"
              row
              sx={{ gap: "28px" }}
            >
              <FormControlLabel
                value="limited"
                control={<Radio />}
                label="Limited"
              />
              <FormControlLabel
                value="unlimited"
                control={<Radio />}
                label="Unlimited"
              />
            </RadioGroup>
          </Stack>
        </Stack>
      </Box>
      <Divider />
      {/* delivery details */}
      <Box mt="24px" px="40px" pb="32px">
        <Typography fontSize="18px" fontWeight={500} lineHeight="26px">
          Delivery
        </Typography>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="limited"
          name="radio-buttons-group"
          sx={{ gap: "16px", mt: "16px" }}
        >
          <FormControlLabel
            value="physical"
            control={<Checkbox />}
            label="This product contains one or more physical products"
          />
          <FormControlLabel
            value="deliveryAddress"
            control={<Checkbox />}
            label="Requires delivery address"
          />
          <FormControlLabel
            value="deliveryNote"
            control={<Checkbox />}
            label="Requires delivery note"
          />
        </RadioGroup>
        <Stack spacing="24px" mt="24px">
          <TextField label="Handling fee" variant="outlined" />
          <TextField label="Delivery fee" variant="outlined" />
        </Stack>
      </Box>
      {/* sale details */}
      <Divider />
      <Box mt="24px" px="40px" pb="32px">
        <Typography fontSize="18px" fontWeight={500} lineHeight="26px">
          Sale
        </Typography>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="limited"
          name="radio-buttons-group"
          sx={{ gap: "16px", mt: "16px" }}
        >
          <FormControlLabel
            value="physical"
            control={<Checkbox />}
            label="This product is on sale"
          />
        </RadioGroup>
        <Stack spacing="24px" mt="24px">
          <TextField label="Sales price" variant="outlined" type="number" />
        </Stack>
      </Box>
      {/* sale details */}
      <Divider />
      <Box mt="24px" px="40px" pb="32px">
        <Typography fontSize="18px" fontWeight={500} lineHeight="26px">
          Product URL
        </Typography>
        <Stack
          mt="20px"
          height="86px"
          width="100%"
          borderRadius="8px"
          bgcolor="#F5FBFF"
          border="1px dashed #0089E7"
          spacing="4px"
          justifyContent="center"
          alignItems="center"
        >
          <Typography fontSize="14px" color="#162031">
            arcapay.com/nikesuederunner
          </Typography>
          <Button
            sx={{ height: "max-content", fontSize: "12px !important" }}
            variant="text"
          >
            Copy <CopyIcon />
          </Button>
        </Stack>
      </Box>
      <Stack
        position="sticky"
        bottom={0}
        left={0}
        direction="row"
        spacing="28px"
        px="40px"
        py="16px"
        mt="44px"
        borderTop="1px solid #E8EAED"
        alignItems="center"
        justifyContent="flex-end"
        bgcolor="#fff"
        zIndex={2}
      >
        <Button variant="text" onClick={close}>
          Cancel
        </Button>
        <LoadingButton
          sx={{ width: "104px" }}
          variant="contained"
          type="submit"
          onClick={close}
        >
          Save
        </LoadingButton>
      </Stack>
    </Box>
  );
}
