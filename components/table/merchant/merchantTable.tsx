import { useState, useCallback, useEffect, useRef } from "react";
import Styles from "./styles.module.scss";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { banks, cardtype, paymentMethod, _accounts, _main } from "@/mocks";
import Header from "../header";
import FilterTable from "../filter";
import Table from "../table";
import Router from "next/router";
import { AccountsTableColumns, MerchantTableColumns } from "../columns";
import { useDispatch } from "react-redux";
import { setDrawalState, setToastState } from "@/store/appSlice";
import currencies from "@/mocks/currencies";
import Flags from "country-flag-icons/react/3x2";
import SearchIcon from "../../../public/assets/icons/search.svg";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";

const MerchantTable = () => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});

  const containerRef = useRef();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/subsidiary/all/paginated?page=${currentPage}&limit=10&${Object.entries(
      filters
    )
      ?.map((filterArr) => `${filterArr[0]}=${filterArr[1]}`)
      .join("&")}`,
    "get"
  );

  useEffect(() => {
    handleSubmit();
  }, [currentPage, search, filters]);

  const dispatch = useDispatch();
  const close = () => dispatch(setDrawalState({ active: false }));

  // new channel
  const CreateNewChannel = () => {
    dispatch(
      setToastState({
        title: "New channel added!",
        active: true,
        theme: "success",
      })
    );
    // close drawal
    close();
  };

  // drawal component
  const DrawalComp = () => {
    return (
      <Box>
        <Stack mt="22px" spacing="18px">
          <TextField
            InputLabelProps={{ shrink: true }}
            variant="standard"
            placeholder="NGN"
            label="Currency"
            name="country"
            select
          >
            {currencies?.map(({ id, name, short }) => {
              // @ts-ignore
              const Flag = Flags[short];
              return (
                <MenuItem sx={{ width: "100%" }} key={id} value={name}>
                  <Box width="24px" height="18px">
                    <Flag />
                  </Box>
                  {name}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            InputLabelProps={{ shrink: true }}
            variant="standard"
            placeholder="NGN"
            label="Currency"
            name="country"
            select
          >
            {["Web", "Mobile"]?.map((channel, index) => {
              return (
                <MenuItem sx={{ width: "100%" }} key={index} value={channel}>
                  {channel}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            InputLabelProps={{ shrink: true }}
            variant="standard"
            placeholder=""
            label="Merchant ID"
            name="merchant_id"
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            variant="standard"
            label="Payment method"
            name="payment_method"
            select
          >
            {paymentMethod?.map(({ id, name }) => {
              return (
                <MenuItem sx={{ width: "100%" }} key={id} value={name}>
                  {name}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            InputLabelProps={{ shrink: true }}
            variant="standard"
            label="Card type/Scheme"
            name="card_type"
            select
          >
            {cardtype?.map(({ id, name }) => {
              return (
                <MenuItem sx={{ width: "100%" }} key={id} value={name}>
                  {name}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            InputLabelProps={{ shrink: true }}
            variant="standard"
            label="Channel ID/bank"
            name="bank"
            select
          >
            <MenuItem sx={{ width: "100%", padding: 0 }}>
              <OutlinedInput
                autoFocus
                placeholder="Search banks"
                sx={{ height: "36px", width: "100%", bgcolor: "#fff" }}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton sx={{ border: 0 }} edge="start">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </MenuItem>
            {banks?.map(({ id, name }) => {
              return (
                <MenuItem sx={{ width: "100%" }} key={id} value={name}>
                  {name}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            InputLabelProps={{ shrink: true }}
            variant="standard"
            placeholder="WMAARC005"
            label="Channel MID"
            name="mid"
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            variant="standard"
            placeholder="10"
            label="Channel rate"
            name="rate"
            type="number"
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            variant="standard"
            label="Username"
            name="username"
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            variant="standard"
            label="Password"
            name="password"
            type="password"
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            variant="standard"
            label="Status"
            select
          >
            {["Active", "Inactive"]?.map((channel, index) => {
              return (
                <MenuItem sx={{ width: "100%" }} key={index} value={channel}>
                  {channel}
                </MenuItem>
              );
            })}
          </TextField>
        </Stack>
        <Stack spacing="16px" mt="48px">
          <Button onClick={CreateNewChannel} variant="contained">
            Add channel
          </Button>
          <Button variant="outlined" onClick={close}>
            Cancel
          </Button>
        </Stack>
      </Box>
    );
  };

  const addChannelDrawal = () => {
    dispatch(
      setDrawalState({
        active: true,
        title: "Add new channel",
        content: <DrawalComp />,
      })
    );
  };

  return (
    <div className={Styles.container}>
      <Header
        containerRef={containerRef}
        columns={MerchantTableColumns}
        data={data?.items}
        entries={`${data?.total_items ?? 0} Entries`}
        setSearch={setSearch}
        url="/dashboard/subsidiary/all/paginated"
      />
      <FilterTable updateFilter={setFilters} />
      <Table
        containerRef={containerRef}
        data={data?.items ?? []}
        columns={MerchantTableColumns}
        page={setCurrentPage}
        pageCount={data?.total_pages}
        isFetching={loading}
        dataLength={data?.total_items}
        onClickRow={(e) =>
          Router.push(`/merchant-channel/${e?.row?.original?.id}`)
        }
      />
    </div>
  );
};

export default MerchantTable;
