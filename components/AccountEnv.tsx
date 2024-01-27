import { Stack, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import ArcaSwitch from "./elements/Switch";
import baseUrl from "@/middleware/baseUrl";
import useFetch from "@/hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { selectUserState } from "@/store/authSlice";
import { reload } from "@/store/appSlice";

export default function AccountEnv() {
  const [env, setEnv] = useState<boolean>(false);

  const dispatch = useDispatch();

  const defaultEnv = useSelector(selectUserState).env;

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/environment/toggle`,
    "patch"
  );

  const envChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setEnv(checked);
    handleSubmit({
      environment_id: checked ? 2 : 1,
    });
  };

  useEffect(() => {
    setEnv(defaultEnv?.id === 2 ? true : false);
  }, [defaultEnv]);

  useEffect(() => {
    if (data?.status === "success") {
      dispatch(reload());
    }
  }, [data]);

  return (
    <Stack direction="row" alignItems="center" spacing="8px">
      <Typography
        variant="h5"
        color={!env ? "#E84A5F" : "#586379"}
        fontWeight={!env ? 500 : 400}
        fontSize={13}
      >
        Test
      </Typography>
      <ArcaSwitch checked={env} onChange={envChangeHandler} />
      <Typography
        variant="h5"
        color={env ? "#0048B1" : "#586379"}
        fontWeight={env ? 500 : 400}
        fontSize={13}
      >
        Live
      </Typography>
    </Stack>
  );
}
