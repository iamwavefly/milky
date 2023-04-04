import { Box, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import UploadIcon from "remixicon-react/Upload2LineIcon";

export default function FileUpload({
  title,
  height,
}: {
  title: string;
  height?: number;
}) {
  const actualBtnRef = useRef(null);
  const [fileName, setFileName] = useState("No file chosen");

  const ref = useRef<any>();
  const handleClick = (e: any) => {
    ref.current.click();
  };

  return (
    <>
      <Box position="absolute">
        <input hidden ref={ref} type="file" />
      </Box>
      <Stack
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
        <Box width="17px" height="17px">
          <UploadIcon color="rgba(38, 43, 64, 0.6)" size={18} />
        </Box>
        <Typography
          color="rgba(38, 43, 64, 0.8)"
          fontSize="12px"
          textAlign="center"
          lineHeight="18px"
        >
          {title}
        </Typography>
      </Stack>
    </>
  );
}
