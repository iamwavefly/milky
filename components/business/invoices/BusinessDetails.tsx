import React, { useRef, useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import AvatarPlaceholder from "@/public/icons/placeholder.svg";
import { useDispatch } from "react-redux";
import { setDrawalState } from "@/store/appSlice";
import fileSizeLimit from "@/helper/fileSizeLimit";
import Image from "next/image";
import Styles from "./styles.module.scss";

interface BusinessDetailsProps {
  nextStep: () => void;
}

export default function BusinessDetails({ nextStep }: BusinessDetailsProps) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const dispatch = useDispatch();
  const close = () => dispatch(setDrawalState({ active: false }));

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    if (fileSizeLimit(file)) return;
    const { name, type } = file;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(e.target.files[0]) as any);
  };

  const ref = useRef<any>();
  const handleClick = (e: any) => {
    ref.current.click();
  };

  return (
    <Box>
      {/* hidden input file */}
      <Box position="absolute">
        <input
          hidden
          ref={ref}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
        />
      </Box>
      {/* logo */}
      <Stack direction="row" px="40px" spacing="40px" alignItems="center">
        {previewUrl ? (
          <Image
            src={previewUrl}
            width={120}
            height={120}
            alt="Product image"
            className={Styles.productImage}
          />
        ) : (
          <AvatarPlaceholder width="120px" height="120px" />
        )}

        <Button
          variant="outlined"
          sx={{ height: "48px", fontSize: "14px" }}
          onClick={handleClick}
        >
          Change logo
        </Button>
      </Stack>
      {/* form */}
      <Stack mt="40px" px="40px" spacing="24px">
        <TextField label="Company name" variant="outlined" />
        <TextField label="Company email" variant="outlined" type="email" />
        <TextField label="Company name" variant="outlined" />
        <TextField label="Company email" variant="outlined" type="email" />
      </Stack>
      <Stack
        position="sticky"
        bottom={0}
        left={0}
        zIndex={2}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        borderTop="1px solid #E8EAED"
        mt="48px"
        px="40px"
        py="16px"
        spacing="28px"
      >
        <Button variant="text" onClick={close}>
          Cancel
        </Button>
        <Button variant="containedMedium" onClick={nextStep}>
          Next
        </Button>
      </Stack>
    </Box>
  );
}
