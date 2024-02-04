import fileSizeLimit from "@/helper/fileSizeLimit";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Blob } from "buffer";
import Image from "next/image";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import UploadIcon from "@/public/icons/folder.svg";
import ReloadIcon from "@/public/icons/reload.svg";
import AddIcon from "@/public/icons/add-circle.svg";

interface FileUploadProps {
  title?: string;
  acceptType?: string;
  update?: (file: any) => void;
  multiple?: boolean;
  icon?: ReactNode;
  file?: string;
}

export default function FileUpload({
  title,
  acceptType,
  multiple,
  icon,
  file,
  update,
}: FileUploadProps) {
  const actualBtnRef = useRef(null);
  const [fileName, setFileName] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    update && selectedFile && update(selectedFile);
  }, [selectedFile]);

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    if (fileSizeLimit(file)) return;
    const { name, type } = file;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(e.target.files[0]) as any);
    setIsImage(type?.includes("image") ? true : false);
    setFileName(
      name.length > 10
        ? name.substring(0, 10) + "..." + name?.split?.(".")?.pop()
        : name
    );
  };

  const ref = useRef<any>();
  const handleClick = (e: any) => {
    ref.current.click();
  };

  return (
    <>
      {/* hidden input file */}
      <Box position="absolute">
        <input
          hidden
          ref={ref}
          type="file"
          accept={acceptType ?? "application/pdf, image/*"}
          onChange={handleFileInputChange}
        />
      </Box>
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb="12px"
        >
          <Typography fontSize="14px" fontWeight={500} lineHeight="24px">
            {title}
          </Typography>
          {multiple && (
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
          )}
        </Stack>
        <Stack
          overflow="hidden"
          border="1px dashed #8F97A8"
          bgcolor="#F6F6F9"
          borderRadius="8px"
          height={"124px"}
          width="100%"
          padding="32px 51px"
          spacing="6px"
          alignItems="center"
          justifyContent="center"
          sx={{ cursor: "pointer" }}
          onClick={handleClick}
        >
          <IconButton sx={{ bgcolor: "#EAEAF1" }}>
            {icon ?? <UploadIcon color="rgba(38, 43, 64, 0.6)" size={18} />}
          </IconButton>
          <Typography
            color="#162031"
            fontSize="13px"
            textAlign="center"
            lineHeight="21px"
            letterSpacing="0.195px"
          >
            {fileName ?? "Drag and drop file here, or"}
          </Typography>
          <Stack
            direction="row"
            mt="23px"
            spacing="6px"
            alignItems="center"
            sx={{ cursor: "pointer" }}
          >
            {previewUrl || file ? (
              <ReloadIcon width="18px" height="18px" fill="#0048B1" />
            ) : (
              <AddIcon width="18px" height="18px" fill="#0048B1" />
            )}
            <Typography
              color="#0048B1"
              fontSize="13px"
              fontWeight={600}
              lineHeight="22px"
            >
              {previewUrl || file ? "Change file" : "Browse file"}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
