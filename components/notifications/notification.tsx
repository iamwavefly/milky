import { Box, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import AdminIcon from "remixicon-react/AdminLineIcon";

interface Props {
  details: {
    id: number;
    message_text: string;
    message_type: string;
    date_created: string;
    message_from: string;
  };
}

export default function Notification({ details }: Props) {
  const { id, message_text, message_type, date_created, message_from } =
    details;
  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row" spacing="4px">
        <Box
          bgcolor="#2E3192"
          width="5px"
          height="5px"
          borderRadius="50%"
          mt="5px"
        />
        <Stack spacing="4px" width="80%">
          <Typography fontSize="12px" lineHeight="16px" color="#262B40">
            {message_text}
          </Typography>
          <Typography fontSize="12px" lineHeight="16px" color="#92959F">
            {moment(date_created).format("LLL")}
          </Typography>
        </Stack>
      </Stack>
      {/* icon */}
      <Box>
        <Stack
          bgcolor="#F3F3F9"
          width="40px"
          height="40px"
          borderRadius="50%"
          justifyContent="center"
          alignItems="center"
        >
          <AdminIcon color="#2E3192" size={20} />
        </Stack>
      </Box>
    </Stack>
  );
}
