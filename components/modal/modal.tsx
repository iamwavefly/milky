import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import { IconButton } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
// @ts-ignore
import Close from "@/public/icons/close.svg";

interface props {
  title: string;
  width?: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  close: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Modal({
  title,
  width,
  children,
  isOpen,
  onClose,
  close,
}: props) {
  // modal styles
  const style = {
    width: width ?? "515px",
    bgcolor: "#fff",
    boxShadow: 24,
    maxHeight: "90%",
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{
          style: {
            minWidth: width ?? "",
          },
        }}
      >
        <Box sx={style}>
          <Box
            position="sticky"
            left={0}
            top={0}
            height="70px"
            bgcolor="#fff"
            px="40px"
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            borderBottom="1px solid #E8EAED"
            zIndex={2}
          >
            <Typography
              fontSize="18px"
              fontWeight={500}
              color="#070F1C"
              lineHeight="26px"
            >
              {title}
            </Typography>
            <IconButton
              onClick={close}
              sx={{
                border: "1px solid #E8EAED",
                height: "32px",
                width: "32px",
                padding: "2px",
                bgcolor: "#F6F6F9",
              }}
            >
              <Close width="20px" height="20px" fill="#070F1C" />
            </IconButton>
          </Box>
          <Box>{children}</Box>
        </Box>
      </Dialog>
    </div>
  );
}
