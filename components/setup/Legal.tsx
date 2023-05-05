import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { setDrawalState } from "@/store/appSlice";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function Legal() {
  const dispatch = useDispatch();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/onboarding/accept/terms`
  );

  const close = () => dispatch(setDrawalState({ active: false }));

  useEffect(() => {
    const { status, message } = data;
    if (status === "success") {
      toast.success(message);
      close();
    }
  }, [data]);

  return (
    <Box>
      <Typography
        fontSize="14px"
        color="rgba(38, 43, 64, 0.8)"
        lineHeight="20px"
      >
        These are te terms of use and conditions surrounding the Alliance Pay
        solution. Kindly read through and accept below.
      </Typography>
      <Typography
        fontSize="14px"
        color="rgba(38, 43, 64, 0.8)"
        fontWeight={500}
        lineHeight="20px"
        mt="60px"
      >
        Lorem ipsum dolor sit amet consectetur. Eget est gravida vestibulum
        aenean vitae ultricies. Amet viverra aenean nibh proin aliquam iaculis
        pretium tellus. Vitae ornare gravida dolor risus ultricies magna
        faucibus neque lorem. Massa rutrum mattis aliquet faucibus urna
        curabitur vitae. Vel enim aliquet consectetur amet vehicula libero morbi
        pellentesque nisi.
      </Typography>
      <Typography
        fontSize="14px"
        color="rgba(38, 43, 64, 0.8)"
        fontWeight={500}
        lineHeight="20px"
        mt="25px"
      >
        Nunc et ut varius aenean nisl mauris turpis orci. Risus cursus euismod
        ut rhoncus. Eget gravida et sit aliquam nulla viverra suspendisse dui.
        Lorem id ac sed purus nullam rutrum. Nibh habitasse bibendum at arcu
        semper sagittis eu. Enim nibh mauris mattis est lacus ac turpis
        venenatis. Nunc pulvinar duis consectetur egestas massa odio senectus
        velit ipsum. Interdum posuere amet aenean lacus in ligula aliquam. Massa
        ipsum eget massa non velit nullam faucibus sed sagittis. Pulvinar
        laoreet lobortis netus a vulputate est et venenatis.
      </Typography>
      <Typography
        fontSize="14px"
        color="rgba(38, 43, 64, 0.8)"
        fontWeight={500}
        lineHeight="20px"
        mt="25px"
      >
        Duis tempus pulvinar viverra faucibus ac sed tempus posuere. Ultrices a
        ipsum tortor adipiscing nibh. Mollis accumsan id tempor mattis enim
        massa. Arcu ornare aliquet vitae velit a bibendum. Purus ante dolor
        tellus id tellus. Non sapien tellus dui amet laoreet at viverra nulla
        risus. Nulla tortor id lorem est. Lacus mi viverra consequat iaculis
        quis metus nec. Tellus nec eget cras neque ultrices feugiat. Risus sit
        egestas tristique aliquam diam risus. Ipsum massa augue ornare elementum
        pretium varius et quis.
      </Typography>
      <LoadingButton
        onClick={() =>
          handleSubmit({
            accepted: true,
          })
        }
        loading={loading}
        variant="contained"
        fullWidth
        sx={{ mt: "60px" }}
      >
        Accept
      </LoadingButton>
      <Button onClick={close} variant="outlined" fullWidth sx={{ mt: "25px" }}>
        Decline
      </Button>
    </Box>
  );
}
