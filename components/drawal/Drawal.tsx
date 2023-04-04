import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { selectAppState, setDrawalState } from "@/store/appSlice";
import { IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "../../public/icons/close-fill.svg";

export default function Drawal() {
  const dispatch = useDispatch();
  const { drawal } = useSelector(selectAppState);
  const { active, title, content } = drawal;

  const close = () => dispatch(setDrawalState({ active: false }));

  return (
    <Drawer anchor="right" open={active} onClose={close}>
      <Stack
        minHeight="59px"
        maxWidth="100%"
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        px="23px"
        borderBottom="1px solid #E8EAF0"
        bgcolor="#fff"
        zIndex={2}
        position="sticky"
        top={0}
        left={0}
      >
        <Typography fontSize="14px">{title}</Typography>
        <IconButton onClick={close} sx={{ mr: "-6px" }}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Stack py="32px" px="24px">
        {content}
      </Stack>
    </Drawer>
  );
}
