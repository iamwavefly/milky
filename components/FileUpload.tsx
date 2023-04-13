import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import UploadIcon from "remixicon-react/Upload2LineIcon";

export default function FileUpload({
  title,
  height,
}: {
  title: string;
  height?: number;
}) {
  const actualBtnRef = useRef(null);
  const [fileName, setFileName] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isImage, setIsImage] = useState(false);

  const handleFileInputChange = (e: any) => {
    const imagePreview = e.target.files[0];
    const { name, type } = imagePreview;
    setSelectedFile(imagePreview);
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

  useEffect(() => {
    console.log({ selectedFile });
  }, [selectedFile]);

  return (
    <>
      <Box position="absolute">
        <input hidden ref={ref} type="file" onChange={handleFileInputChange} />
      </Box>
      <Stack
        overflow="hidden"
        border="1px dashed #92959F"
        height={`${height}px` ?? "100px"}
        width="100%"
        padding="32px 51px"
        direction="row"
        spacing="14px"
        alignItems="center"
        justifyContent="center"
        sx={{ cursor: "pointer" }}
        onClick={handleClick}
      >
        {previewUrl && isImage ? (
          <Image
            src={previewUrl}
            alt="Preview"
            width={100}
            height={100}
            style={{ width: "100%", objectFit: "cover" }}
          />
        ) : (
          <>
            <Box width="17px" height="17px">
              <UploadIcon color="rgba(38, 43, 64, 0.6)" size={18} />
            </Box>
            <Typography
              color="rgba(38, 43, 64, 0.8)"
              fontSize="12px"
              textAlign="center"
              lineHeight="18px"
            >
              {fileName ?? title}
            </Typography>
          </>
        )}
      </Stack>
    </>
  );
}
