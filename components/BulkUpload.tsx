import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import UploadIcon from "@/public/icons/upload.svg";
import AddIcon from "@/public/icons/add-circle.svg";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import DeleteIcon from "@/public/icons/delete.svg";
import { toWords } from "number-to-words";
import { ProductImage } from "@/types";

interface BulkUploadProps {
  limit: number;
  uploadImages?: (images: ProductImage[]) => void;
}

export default function BulkUpload({ limit, uploadImages }: BulkUploadProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const [calcImagesLeft, setCalcImagesLeft] = useState(0);

  useEffect(() => {
    setCalcImagesLeft(limit - productImages.length);
  }, [productImages]);

  useEffect(() => {
    uploadImages && uploadImages(productImages);
  }, [productImages]);

  const onDrop = (acceptedFiles: File[], rejectedFiles: any) => {
    if (productImages.length === limit) return;
    const newImageFiles: ProductImage[] = acceptedFiles
      .filter(
        (file) =>
          !productImages.some((existingFile) => existingFile.name === file.name)
      )
      .map((file) => ({
        file,
        name: file.name,
      }));

    setProductImages((prevImageFiles) => [...prevImageFiles, ...newImageFiles]);

    // Handle rejectedFiles and extract error messages
    const errorMessages = rejectedFiles.map((file: any) => {
      if (file.errors && file.errors.length > 0) {
        return file.errors[0].message;
      }
      return "Unknown error";
    });

    setErrors(errorMessages);
  };

  const removeImage = (imageName: string) => {
    const updatedImages = productImages.filter(
      (image) => image.name !== imageName
    );
    setProductImages(updatedImages);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: calcImagesLeft,
    maxSize: 10 * 1024 * 1024, // 10MB limit
    multiple: true,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <Box>
      <Stack
        height="124px"
        width="100%"
        bgcolor="#F6F6F9"
        borderRadius="8px"
        border="1px dashed #8F97A8"
        alignItems="center"
        justifyContent="center"
        spacing="6px"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <IconButton
          sx={{
            bgcolor: "#EAEAF1",
            width: "32px",
            height: "32px",
            padding: "6px",
          }}
        >
          <UploadIcon />
        </IconButton>
        {isDragActive ? (
          <Typography
            color="#162031"
            fontSize="13px"
            lineHeight="21px"
            letterSpacing="0.195px"
          >
            Drop the files here...
          </Typography>
        ) : (
          <Typography
            color="#162031"
            fontSize="13px"
            lineHeight="21px"
            letterSpacing="0.195px"
          >
            Drag and drop photo here, or
          </Typography>
        )}
        <Button variant="text">
          <AddIcon width="18px" height="18px" fill="#0048B1" /> Browse file
        </Button>
      </Stack>
      {errors.length > 0 && (
        <div className="error-messages">
          <Typography
            mt="12px"
            color="#070F1C"
            fontSize="14px"
            lineHeight="24px"
            fontWeight={500}
          >
            Error uploading files:
          </Typography>
          <Stack spacing="16px">
            {errors.map((error, index) => (
              <Typography
                color="#E84A5F"
                fontSize="12px"
                lineHeight="18px"
                key={index}
              >
                {error}
              </Typography>
            ))}
          </Stack>
        </div>
      )}
      <Stack spacing="24px" mt="32px">
        {productImages.map(({ file, name }) => (
          <Stack
            mt="32px"
            key={name}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing="16px">
              <Image
                style={{ borderRadius: "11.636px", objectFit: "cover" }}
                src={URL.createObjectURL(file)}
                width={64}
                height={64}
                alt="name"
              />
              <Typography fontSize="15px" color="#070F1C">
                {name}
              </Typography>
            </Stack>
            <IconButton
              sx={{ bgcolor: "#FFF5F5" }}
              onClick={() => removeImage(name)}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        ))}
        {productImages.length > 0 && productImages.length < limit && (
          <Typography fontSize="15px" lineHeight="26px" color="#070F1C">
            Add {toWords(calcImagesLeft)} ({calcImagesLeft}) more images
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
