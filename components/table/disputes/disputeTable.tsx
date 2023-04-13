import { useState, useCallback, useEffect, MouseEvent, useRef } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { _businesses, _payoutCredit } from "@/mocks";
import Header from "../header";
import CarretDown from "../../../public/assets/icons/carret-down.svg";
import DownloadIcon from "../../../public/assets/icons/download-color.svg";
import CheckmarkOutline from "../../../public/assets/icons/check-outline.svg";
import Checkmark from "../../../public/assets/icons/check.svg";
import FilterTable from "../filter";
import Table from "../table";
import Router from "next/router";
import {
  BusinessTableColumns,
  DisputeColumns,
  PayoutCreditColumns,
} from "../columns";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import Modal from "@/components/modal/modal";
import isObjEmpty from "@/helper/isObjEmpty";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { selectAppState, setToastState } from "@/store/appSlice";

const defaultForm = {
  currency: "NGN",
  type: "Local",
  due_date: "",
  amount: "",
  frequency: "",
  reason: "",
};

const DisputeTable = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [filters, setFilters] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [form, setForm] = useState(defaultForm);
  const { toast } = useSelector(selectAppState);
  const dispatch = useDispatch();
  // modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  // api calls
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/chargeback/all?page=${currentPage}&limit=10&${Object.entries(
      filters
    )
      ?.map((filterArr) => `${filterArr[0]}=${filterArr[1]}`)
      .join("&")}`,
    "get"
  );
  // fetch currencies
  const currencies = useFetch(`${baseUrl}/currencies/allowed`, "get");
  // fetch currencies
  const logDispute = useFetch(`${baseUrl}/chargeback/upload`);

  // menu
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // form changes handler
  const changeHandler = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // submit form
  const submitDispute = () => {
    logDispute.handleSubmit([form]);
  };

  const containerRef = useRef();

  // check if fields
  useEffect(() => {
    const fieldValid = Object.values(form).every((value) => {
      if (value) {
        return true;
      }
      return false;
    });
    fieldValid ? setDisabled(false) : setDisabled(true);
  }, [form]);

  // log dispute message
  useEffect(() => {
    const { message, status } = logDispute.data;
    if (status === "success") {
      setForm(defaultForm);
      handleCloseModal();
      dispatch(
        setToastState({
          title: message,
          active: true,
          theme: "success",
        })
      );
    }
  }, [logDispute.data]);

  useEffect(() => {
    handleSubmit();
  }, [currentPage, search, filters]);

  useEffect(() => {
    currencies?.handleSubmit();
  }, []);

  return (
    <Box>
      {/* modal */}
      <Modal
        title="Log dispute"
        isOpen={openModal}
        close={() => setOpenModal(false)}
        onClose={handleCloseModal}
      >
        <Box pb="40px">
          <Stack spacing="27px">
            <Stack spacing="16px" direction="row" width="100%">
              {/* currencies */}
              <TextField
                InputLabelProps={{ shrink: true }}
                select
                sx={{ flex: 1 }}
                variant="outlined"
                label="Currency"
                defaultValue="NGN"
                name="currency"
                value={form.currency}
                onChange={changeHandler}
              >
                {currencies?.data?.data?.map(({ short_name, id }: any) => (
                  <MenuItem value={short_name} key={id} sx={{ width: "100%" }}>
                    {short_name}
                  </MenuItem>
                ))}
              </TextField>
              {/* amount */}
              <TextField
                sx={{ flex: 1 }}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                label="Amount"
                placeholder="amount"
                name="amount"
                value={form.amount}
                onChange={changeHandler}
              />
            </Stack>
            <Stack spacing="16px" direction="row" width="100%">
              {/* tyoe */}
              <TextField
                InputLabelProps={{ shrink: true }}
                sx={{ flex: 1 }}
                select
                variant="outlined"
                label="Type"
                defaultValue="local"
                value={form.type}
                name="type"
                onChange={changeHandler}
              >
                <MenuItem value="Local" sx={{ width: "100%" }}>
                  Local
                </MenuItem>
                <MenuItem value="International" sx={{ width: "100%" }}>
                  International
                </MenuItem>
              </TextField>
              {/* frequency */}
              <TextField
                InputLabelProps={{ shrink: true }}
                type="number"
                sx={{ flex: 1 }}
                variant="outlined"
                label="Frequency"
                placeholder="0.0"
                name="frequency"
                value={form.frequency}
                onChange={changeHandler}
              />
            </Stack>
            <TextField
              InputLabelProps={{ shrink: true }}
              type="date"
              variant="outlined"
              label="New due date"
              placeholder="0.0"
              name="due_date"
              value={form.due_date}
              onChange={changeHandler}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              label="Reason for dispute"
              multiline
              placeholder="Enter your description here"
              variant="outlined"
              name="reason"
              value={form.reason}
              onChange={changeHandler}
            />
          </Stack>
          <Typography
            fontFamily="Sarabun"
            color="rgba(10, 9, 3, 0.7)"
            fontSize="14px"
            mt="8px"
            display="flex"
            alignItems="center"
            gap="10px"
          >
            <Box position="relative" top="3px">
              <CheckmarkOutline color="#2E3192" />
            </Box>
            Include weekends when determining due date
          </Typography>
          <LoadingButton
            loading={logDispute.loading}
            onClick={submitDispute}
            disabled={disabled}
            fullWidth
            variant="contained"
            sx={{ mt: "49px", height: "55px" }}
          >
            <Checkmark />
            Submit
          </LoadingButton>
        </Box>
      </Modal>
      {/* menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleOpenModal}>Single refund</MenuItem>
        <MenuItem onClick={() => Router.push("/disputes/bulk")}>
          Bulk refund
        </MenuItem>
      </Menu>
      <Header
        containerRef={containerRef}
        columns={DisputeColumns}
        data={data?.items}
        entries={`${data?.data?.page?.total ?? 0}`}
        setSearch={setSearch}
        buttons={
          <Stack direction="row" spacing="16px">
            <Button variant="outlined">
              All chargeback <CarretDown />
            </Button>
            <Button variant="outlined">
              Download all <DownloadIcon />
            </Button>
            <Button variant="contained" onClick={handleClick}>
              Log dispute
            </Button>
          </Stack>
        }
      />
      <FilterTable updateFilter={setFilters} />
      <Table
        containerRef={containerRef}
        data={data?.data?.items ?? []}
        columns={DisputeColumns}
        page={setCurrentPage}
        pageCount={data?.data?.page.total_pages}
        isFetching={loading}
      />
    </Box>
  );
};

export default DisputeTable;
