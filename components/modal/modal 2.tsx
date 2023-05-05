import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MuiModal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { Close } from "@carbon/icons-react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 489,
  bgcolor: "#fff",
  boxShadow: 24,
};

interface props {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  close: () => void;
}

export default function Modal({
  title,
  children,
  isOpen,
  onClose,
  close,
}: props) {
  return (
    <div>
      <MuiModal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            height="56px"
            bgcolor="#F3F3F9"
            px="24px"
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>{title}</Typography>
            <IconButton onClick={close}>
              <Close />
            </IconButton>
          </Box>
          <Box p="32px 24px">{children}</Box>
        </Box>
      </MuiModal>
    </div>
  );
}
