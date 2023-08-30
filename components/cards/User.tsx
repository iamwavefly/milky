import React from "react";
import { Stack, Typography } from "@mui/material";
import Avatar from "react-avatar";

interface UserCardProps {
  name: string;
}

export default function UserCard({ name }: UserCardProps) {
  return (
    <Stack
      direction="row"
      spacing="12px"
      border="1px solid #E8EAED"
      borderRadius="8px"
      bgcolor="#fff"
      width="100%"
      height="72px"
      padding="16px"
      alignItems="center"
    >
      <Avatar
        name={name}
        maxInitials={1}
        title={name}
        size="32px"
        round
        textSizeRatio={1.75}
      />
      <Stack spacing="2px">
        <Typography fontWeight={500} fontSize="14px" lineHeight="24px">
          {name}
        </Typography>
        <Typography fontSize="12px" color="#3C4453" lineHeight="18px">
          Added June 20, 2023
        </Typography>
      </Stack>
    </Stack>
  );
}
