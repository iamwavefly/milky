import TabHeader from "@/components/TabHeader";
import SettingRoutes from "@/configs/links/SettingRoutes";
import useFetch from "@/hooks/useFetch";
import Dashboard from "@/layouts/dashboard";
import baseUrl from "@/middleware/baseUrl";
// import { newChannel, userUpdate } from "@/schema";
import { setToastState } from "@/store/appSlice";
import { AppState } from "@/store/store";
import { faker } from "@faker-js/faker";
import { LoadingButton } from "@mui/lab";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "semantic-ui-react";
import EditIcon from "../../../public/icons/edit.svg";
// import { serialize } from "object-to-formdata";

const defaultUser = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  phoneNumber: "",
};

const Index = () => {
  const [form, setForm] = useState(defaultUser);
  const [file, setFile] = useState("");
  const [avatar, setAvatar] = useState(null);
  const user = useSelector((state: AppState) => state)?.auth?.user;

  const dispatch = useDispatch();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/user/update`
  );

  useEffect(() => {
    console.log({ avatar });
  }, [avatar]);

  useEffect(() => {
    const { status, message } = data;
    if (status === "success") {
      dispatch(
        setToastState({
          title: message,
          active: true,
          theme: "success",
        })
      );
    }
  }, [data]);

  const formik = useFormik({
    initialValues: defaultUser,
    // validationSchema: userUpdate,
    onSubmit: ({ firstName, lastName, emailAddress, phoneNumber }) => {
      // const formData = serialize(payload);
      let formData = new FormData();
      formData.append("firstname", firstName);
      formData.append("lastname", lastName);
      formData.append("email", emailAddress);
      avatar ? formData.append("avatar", avatar) : "";
      handleSubmit(formData);
    },
  });

  useEffect(() => {
    const { email_address, first_name, last_name, mobile_number, avatar } =
      user;
    const payload = {
      firstName: first_name,
      lastName: last_name,
      emailAddress: email_address,
      phoneNumber: mobile_number,
    };
    setFile(avatar);
    formik.setValues(payload);
  }, [user]);

  const hiddenFileInput = useRef<any>(null);

  const uploadHandler = () => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = (e: any) => {
    setFile(URL.createObjectURL(e.target.files[0]) as any);
    console.log(e.target.files[0]);
    setAvatar(e.target.files[0]);
  };

  return (
    <Dashboard title="Settings">
      <TabHeader routes={SettingRoutes} />
      <Stack
        height="192px"
        width="100%"
        bgcolor="#fff"
        alignItems="center"
        mt="40px"
        pt="14px"
      >
        <input
          type="file"
          ref={hiddenFileInput}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {file && <Image src={file} width="100" height="100" />}
        <Typography fontWeight={700} fontSize="16px" mt="8px">
          {user.first_name} {user.last_name}
        </Typography>
        <Typography
          onClick={uploadHandler}
          fontWeight={500}
          color="#2E3192"
          fontSize="12px"
          mt="7px"
          sx={{ cursor: "pointer" }}
        >
          Edit Photo
        </Typography>
      </Stack>
      <Stack direction="row" my="24px" spacing="24px" height="502px" pb="100px">
        <Stack
          flex={1}
          height="100%"
          padding="24px"
          bgcolor="#FFFFFF"
          border="1px solid rgba(206, 206, 205, 0.4)"
        >
          <form onSubmit={formik.handleSubmit}>
            <Typography fontWeight={700} fontSize="16px">
              Personal information
            </Typography>
            <Stack spacing="28px" mt="28px">
              <TextField
                variant="standard"
                InputLabelProps={{ shrink: true }}
                label="First name"
                name="firstName"
                placeholder="John"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <TextField
                variant="standard"
                InputLabelProps={{ shrink: true }}
                label="Last name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
              <TextField
                variant="standard"
                InputLabelProps={{ shrink: true }}
                label="Email address"
                name="emailAddress"
                value={formik.values.emailAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.emailAddress &&
                  Boolean(formik.errors.emailAddress)
                }
                helperText={
                  formik.touched.emailAddress && formik.errors.emailAddress
                }
              />
              <TextField
                variant="standard"
                InputLabelProps={{ shrink: true }}
                label="Phone number"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </Stack>
            <LoadingButton
              disabled={!(formik.isValid && formik.dirty)}
              sx={{ mt: "28px" }}
              variant="contained"
              loading={loading}
              type="submit"
            >
              <EditIcon />
              Save changes
            </LoadingButton>
          </form>
        </Stack>
        <Stack
          flex={1}
          height="100%"
          padding="24px"
          bgcolor="#FFFFFF"
          border="1px solid rgba(206, 206, 205, 0.4)"
        >
          <Typography fontWeight={700} fontSize="16px">
            Login information
          </Typography>
          <Typography fontWeight={400} color="#33322D" fontSize="16px" mt="8px">
            If you forgot your password, we’ll help out.
          </Typography>
          <Stack spacing="28px" mt="28px">
            <TextField
              variant="standard"
              InputLabelProps={{ shrink: true }}
              label="Password"
              name="password"
              placeholder="************************"
            />
          </Stack>
          <Button sx={{ mt: "28px" }} variant="contained">
            <EditIcon />
            Reset password
          </Button>
        </Stack>
      </Stack>
    </Dashboard>
  );
};

export default Index;
