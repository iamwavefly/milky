import Footer from "@/components/form/Footer";
import useFetch from "@/hooks/useFetch";
import { UserProps } from "@/interfaces";
import baseUrl from "@/middleware/baseUrl";
import { reload } from "@/store/appSlice";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

interface RemoveUserProps {
  user: UserProps;
  close: () => void;
}

export default function RemoveUser({ user, close }: RemoveUserProps) {
  const { first_name, last_name, user_id } = user ?? {};

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/users/deactivate`,
    "post"
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const { status, message } = data;
    if (status === "success") {
      dispatch(reload());
      close();
    }
  }, [data]);

  const removeUserHandler = () => handleSubmit({ user_id });

  return (
    <Box>
      <Box p="40px">
        <Typography textAlign="center" color="#3C4453" fontSize="15px">
          <Typography fontWeight={600} component="span">
            {first_name} {last_name}
          </Typography>{" "}
          will no longer be able to access your dashboard
        </Typography>
      </Box>
      <Footer
        sx={{ bgcolor: "#E84A5F !important" }}
        loading={loading}
        onClick={removeUserHandler}
      >
        Remove user
      </Footer>
    </Box>
  );
}
