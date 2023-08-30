import useFetch from "@/hooks/useFetch";
import { MenuProps } from "@/interfaces";
import baseUrl from "@/middleware/baseUrl";
import { bankDetails, newCustomer, newRole, newUser } from "@/schema";
import { setDrawalState } from "@/store/appSlice";
import { LoadingButton } from "@mui/lab";
import { Theme, useTheme } from "@mui/material/styles";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import Footer from "./Footer";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuInputProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    width: "100%",
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface NewRoleProps {
  reload: () => void;
  close: () => void;
}

export default function NewRole({ reload, close }: NewRoleProps) {
  const [permissions, setPermissions] = useState<string[]>([]);

  const theme = useTheme();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/role/create`
  );
  // permissions
  const fetchPermissions = useFetch(
    `${baseUrl}/dashboard/role/permissions`,
    "get"
  );
  // role
  const roles = useFetch(`${baseUrl}/dashboard/service/roles`, "get");

  const dispatch = useDispatch();

  useEffect(() => {
    const { status, message } = data;
    if (status === "success") {
      reload();
      close();
    }
  }, [data]);
  // fetch countries
  useEffect(() => {
    fetchPermissions.handleSubmit();
  }, []);
  // fetch roles
  useEffect(() => {
    roles.handleSubmit();
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof permissions>) => {
    const {
      target: { value },
    } = event;
    setPermissions(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // form controller
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: newRole,
    onSubmit: ({ name }) => {
      const payload = {
        name,
        permissions,
      };
      handleSubmit(payload);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing="24px" px="40px" mt="32px">
        <TextField
          InputLabelProps={{ shrink: true }}
          autoFocus
          label="Name"
          variant="outlined"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <Box sx={{ flex: 1 }}>
          <InputLabel sx={{ ml: 0, mb: "3px", left: 0, mt: "2.5px" }}>
            Permissions
          </InputLabel>
          <Select
            multiple
            fullWidth
            value={permissions}
            onChange={handleChange}
            variant="outlined"
            MenuProps={MenuInputProps}
          >
            {fetchPermissions?.data?.data?.map?.(({ name, id }: any) => (
              <MenuItem
                key={id}
                value={id}
                style={getStyles(name, permissions, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Stack>
      <Stack spacing="25px" mt="60px">
        <Footer
          type="submit"
          loading={loading}
          disabled={!(formik.isValid && formik.dirty)}
        >
          Add Role
        </Footer>
      </Stack>
    </form>
  );
}
