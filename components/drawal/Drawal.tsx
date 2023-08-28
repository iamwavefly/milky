import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { selectAppState, setDrawalState } from "@/store/appSlice";
import { IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@/public/icons/close.svg";

export default function Drawal() {
  const dispatch = useDispatch();
  const { drawal } = useSelector(selectAppState);
  const { active, title, content } = drawal;

  const close = () => dispatch(setDrawalState({ active: false }));

  return (
    <Drawer anchor="right" open={active} onClose={close}>
      <Stack
        minHeight="76px"
        maxWidth="100%"
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        px="40px"
        borderBottom="1px solid #E8EAED"
        bgcolor="#F6F6F9"
        zIndex={2}
        position="sticky"
        top={0}
        left={0}
      >
        <Typography
          fontSize="20px"
          color="#070F1C"
          fontWeight={600}
          lineHeight="28px"
        >
          {title}
        </Typography>
        <IconButton
          onClick={close}
          sx={{
            border: "1px solid #E8EAED",
            mr: "-6px",
            width: "32px",
            height: "32px",
            bgcolor: "#fff",
            padding: "4px",
          }}
        >
          <CloseIcon width="20px" height="20px" fill="#070F1C" />
        </IconButton>
      </Stack>
      <Stack>{content}</Stack>
    </Drawer>
  );
}
