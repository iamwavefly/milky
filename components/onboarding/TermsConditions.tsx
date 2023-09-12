import React, { useEffect, useState } from "react";
import { accountTypes } from "@/utils/signup";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountTypePanel from "../accountTypePanel";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import AddIcon from "@/public/icons/add.svg";
import Router from "next/router";
import { LoadingButton } from "@mui/lab";

interface Props {
  nextStep: () => void;
}

export default function TermsConditions({ nextStep }: Props) {
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/onboarding/accept/terms`
  );

  useEffect(() => {
    const { status } = data;
    if (status === "success") {
      nextStep();
    }
  }, [data]);

  return (
    <Box>
      <Box bgcolor="#FFF">
        <Stack p="40px" gap="16px">
          <Typography
            color="#3C4453"
            fontSize="14px"
            lineHeight="24px"
            letterSpacing="0.14px"
          >
            Lorem ipsum dolor sit amet consectetur. Eget est gravida vestibulum
            aenean vitae ultricies. Amet viverra aenean nibh proin aliquam
            iaculis pretium tellus. Vitae ornare gravida dolor risus ultricies
            magna faucibus neque lorem. Massa rutrum mattis aliquet faucibus
            urna curabitur vitae.
          </Typography>
          <Typography
            color="#3C4453"
            fontSize="14px"
            lineHeight="24px"
            letterSpacing="0.14px"
          >
            Vel enim aliquet consectetur amet vehicula libero morbi pellentesque
            nisi. Nunc et ut varius aenean nisl mauris turpis orci. Risus cursus
            euismod ut rhoncus. Eget gravida et sit aliquam nulla viverra
            suspendisse dui. Lorem id ac sed purus nullam rutrum. Nibh habitasse
            bibendum at arcu semper sagittis eu. Enim nibh mauris mattis est
            lacus ac turpis venenatis.
          </Typography>
          <Typography
            color="#3C4453"
            fontSize="14px"
            lineHeight="24px"
            letterSpacing="0.14px"
          >
            Nunc pulvinar duis consectetur egestas massa odio senectus velit
            ipsum. Interdum posuere amet aenean lacus in ligula aliquam. Massa
            ipsum eget massa non velit nullam faucibus sed sagittis. Pulvinar
            laoreet lobortis netus a vulputate est et venenatis. Duis tempus
            pulvinar viverra faucibus ac sed tempus posuere. Ultrices a ipsum
            tortor adipiscing nibh.
          </Typography>
          <Typography
            color="#3C4453"
            fontSize="14px"
            lineHeight="24px"
            letterSpacing="0.14px"
          >
            Mollis accumsan id tempor mattis enim massa. Arcu ornare aliquet
            vitae velit a bibendum. Purus ante dolor tellus id tellus. Non
            sapien tellus dui amet laoreet at viverra nulla risus. Nulla tortor
            id lorem est. Lacus mi viverra consequat iaculis quis metus nec.
            Tellus nec eget cras neque ultrices feugiat. Risus sit egestas
            tristique aliquam diam risus. Ipsum massa augue ornare elementum
            pretium varius et quis.
          </Typography>
        </Stack>
        <Stack
          spacing="28px"
          justifyContent="flex-end"
          direction="row"
          px="40px"
          py="16px"
          borderTop="1px solid #E8EAED"
          alignItems="center"
        >
          <Button
            variant="text"
            sx={{ p: 0, fontWeight: 600, bgcolor: "transparent !important" }}
          >
            Decline
          </Button>
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={() =>
              handleSubmit({
                accepted: true,
              })
            }
          >
            Accept
          </LoadingButton>
        </Stack>
      </Box>
    </Box>
  );
}
