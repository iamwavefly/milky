import AccountTypePanel from "@/components/accountTypePanel";
import Dashboard from "@/layouts/dashboard";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import UserIcon from "remixicon-react/User6LineIcon";
import FileIcon from "remixicon-react/FileList2LineIcon";
import AccountSetup from "@/layouts/setup";
import { accountPersonalSetup, accountRegisterSetup } from "@/configs/labels";
import { useDispatch, useSelector } from "react-redux";
import { setDrawalState } from "@/store/appSlice";
import { useRouter } from "next/router";
import { selectUserState } from "@/store/authSlice";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";

export default function Index() {
  const [labels, setLabels] = useState([]);
  const [status, setStatus] = useState<any>({});

  const dispatch = useDispatch();
  const { is_email_verified, email_address, mobile_number } =
    useSelector(selectUserState);

  const close = () => dispatch(setDrawalState({ active: false }));

  const { type } = useRouter().query;

  // console.log({ user });

  useLayoutEffect(() => {
    if (type === "registered") {
      return setLabels(accountRegisterSetup as []);
    }
    setLabels(accountPersonalSetup as []);
  }, [type]);

  const drawalHandler = (Component: any, title: string) => {
    dispatch(
      setDrawalState({
        active: true,
        title,
        content: <Component />,
      })
    );
  };

  const isCompleted = (slug: string) => {
    if (slug === "email" && is_email_verified) {
      return true;
    }
    const result = status?.[slug] === 100 ? true : false;
    console.log({ result }, status);
    return result;
  };

  // text
  const onboardingStatus = useFetch(`${baseUrl}/onboarding/percentage`, "get");
  // fetch business sizes
  useEffect(() => {
    onboardingStatus.handleSubmit();
  }, []);

  useEffect(() => {
    if (onboardingStatus?.data) {
      setStatus(onboardingStatus?.data?.data);
    }
  }, [onboardingStatus?.data]);

  return (
    <AccountSetup
      title="We need more information"
      desc="Comment from reviewer: Dear customer, provide the following to complete your profile"
    >
      <Stack spacing="17px">
        {labels?.map(({ desc, title, Component, drawalTitle, id, slug }) => (
          <Box
            key={id}
            padding="20px"
            width="100%"
            height="100px"
            bgcolor="#FFFFFF"
            sx={{ cursor: "pointer" }}
            onClick={() => Component && drawalHandler(Component, drawalTitle)}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                fontWeight={600}
                component="h2"
                fontSize="14px"
                color="#262B40"
              >
                {title}
              </Typography>
              <Checkbox checked={isCompleted(slug)} />
            </Stack>
            <Typography
              mt="4px"
              fontSize="12px"
              color="rgba(38, 43, 64, 0.8)"
              component="p"
            >
              {desc}
            </Typography>
          </Box>
        ))}
      </Stack>
    </AccountSetup>
  );
}
