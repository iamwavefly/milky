import Modal from "@/components/modal/modal";
import clipboard from "@/helper/clipboard";
import stringToCurrency from "@/helper/formatCurrency";
import useFetch from "@/hooks/useFetch";
import { MenuProps } from "@/interfaces";
import baseUrl from "@/middleware/baseUrl";
import { newTransfer } from "@/schema";
import { setDrawalState } from "@/store/appSlice";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Collapse,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { borderRadius } from "@mui/system";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function MakeTransfer({ reload }: any) {
  const [accounts, setAccounts] = useState<[]>([]);
  const [banks, setBanks] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [seletedAccount, setSeletedAccount] = useState<any>({});
  const [selectedId, setSelectedId] = useState("");
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [showBen, setShowBen] = useState<boolean | undefined>(undefined);
  const [openModal, setOpenModal] = useState(false);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/get/wallet/balance`,
    "get"
  );

  const initiatePayout = useFetch(`${baseUrl}/payout/initiate`);
  const fetchBeneficiaries = useFetch(`${baseUrl}/beneficiary/all`, "get");
  const fetchCurrencies = useFetch(
    `${baseUrl}/dashboard/service/currencies`,
    "get"
  );
  // modal
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const fetchBanks = useFetch(`${baseUrl}/dashboard/banks`, "get");
  const resolveAccount = useFetch(`${baseUrl}/payout/account/resolve`, "post");
  // currencies
  useEffect(() => {
    fetchCurrencies?.handleSubmit();
  }, []);
  // beneficiaries
  useEffect(() => {
    fetchBeneficiaries?.handleSubmit();
  }, []);
  useEffect(() => {
    setBeneficiaries(fetchBeneficiaries?.data?.data?.items);
  }, [fetchBeneficiaries?.data]);
  // banks
  useEffect(() => {
    fetchBanks?.handleSubmit();
  }, []);

  useEffect(() => {
    const strucCurrencies = fetchCurrencies?.data?.data?.filter(
      (cur: any) => cur.is_allowed
    );
    setCurrencies(strucCurrencies);
  }, [fetchCurrencies?.data]);

  const dispatch = useDispatch();
  const close = () => dispatch(setDrawalState({ active: false }));

  useEffect(() => {
    setBanks(fetchBanks?.data?.banks);
  }, [fetchBanks?.data]);

  useEffect(() => {
    setAccounts(data?.wallets);
  }, [data]);

  useEffect(() => {
    const wallet = data?.wallets?.[0];
    setSelectedId(wallet?.wallet_id);
    setSeletedAccount(wallet);
  }, [data]);

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    const { status } = initiatePayout?.data;
    if (status === "success") {
      close();
      reload();
    }
  }, [initiatePayout?.data]);

  // form controller
  const formik = useFormik({
    initialValues: {
      currency: "",
      account: "",
      beneficiary: "",
      amount: "",
      beneficiaryName: "",
      narration: "",
      bank: "",
    },
    validationSchema: newTransfer,
    onSubmit: ({
      amount,
      bank,
      beneficiary,
      beneficiaryName,
      currency,
      narration,
    }) => {
      const payload = {
        payout_details: [
          {
            account_number: beneficiary,
            bank_code: bank,
            amount,
            description: narration,
            account_name: beneficiaryName,
            credit_currency: currency,
          },
        ],
      };
      initiatePayout?.handleSubmit(payload);
    },
  });

  // resolve account
  useEffect(() => {
    const { beneficiary, bank } = formik.values;
    if (beneficiary?.length === 10 && bank) {
      resolveAccount.handleSubmit(
        {
          bank_code: bank,
          account_number: beneficiary,
        },
        "noToast"
      );
    }
  }, [formik.values.beneficiary, formik.values.bank]);
  // populate account name
  useEffect(() => {
    formik.setFieldValue(
      "beneficiaryName",
      resolveAccount.data?.data?.account_name
    );
  }, [resolveAccount.data]);
  // populate beneficiary
  const populateAccount = () => {
    handleCloseModal();
    const beneficiary: any = beneficiaries.find(
      (ben: { id: string }) => ben?.id === formik.values.account
    );
    formik.setFieldValue("beneficiary", beneficiary?.account_number);
    formik.setFieldValue("beneficiaryName", beneficiary?.name);
  };

  return (
    <>
      <Modal
        title="Choose beneficiary"
        isOpen={openModal}
        close={() => setOpenModal(false)}
        onClose={handleCloseModal}
      >
        {/* beneficiaries */}
        <Stack>
          <TextField
            variant="standard"
            name="account"
            label="Beneficiary"
            value={formik.values.account}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.account && Boolean(formik.errors.account)}
            helperText={formik.touched.account && formik.errors.account}
            select
          >
            {beneficiaries?.map(({ name, id }: any) => (
              <MenuItem sx={{ width: "100%" }} key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
        <Button
          fullWidth
          variant="contained"
          disabled={!formik.values.account}
          sx={{ mt: "60px" }}
          onClick={populateAccount}
        >
          Continue
        </Button>
      </Modal>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing="16px">
          {/* currencies */}
          <TextField
            InputLabelProps={{ shrink: true }}
            select
            sx={{ flex: 1 }}
            variant="standard"
            label="Currency"
            defaultValue="NGN"
            name="currency"
            value={formik.values.currency}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.currency && Boolean(formik.errors.currency)}
            helperText={formik.touched.currency && formik.errors.currency}
          >
            {currencies?.map(({ short_name, id }: any) => (
              <MenuItem value={short_name} key={id} sx={{ width: "100%" }}>
                {short_name}
              </MenuItem>
            ))}
          </TextField>
          {/* amount */}
          <TextField
            sx={{ flex: 1 }}
            variant="standard"
            label="Transfer Amount"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
          {/* bank */}
          <TextField
            label="Bank name"
            variant="standard"
            select
            name="bank"
            value={formik.values.bank}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.bank && Boolean(formik.errors.bank)}
            helperText={formik.touched.bank && formik.errors.bank}
          >
            {banks?.map(({ name, id, bank_code }: any) => (
              <MenuItem value={bank_code} key={id} sx={{ width: "100%" }}>
                {name}
              </MenuItem>
            ))}
          </TextField>
          {/* beneficiary account */}
          <TextField
            sx={{ flex: 1 }}
            variant="standard"
            label="Beneficiary Account Number"
            name="beneficiary"
            value={formik.values.beneficiary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.beneficiary && Boolean(formik.errors.beneficiary)
            }
            helperText={formik.touched.beneficiary && formik.errors.beneficiary}
          />
          {/* Beneficiary Name */}
          <Stack position="relative">
            <TextField
              sx={{ flex: 1 }}
              variant="standard"
              label="Beneficiary Name"
              name="beneficiaryName"
              value={formik.values.beneficiaryName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.beneficiaryName &&
                Boolean(formik.errors.beneficiaryName)
              }
              helperText={
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    sx={{
                      fontWeight: 400,
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    {formik.touched.beneficiaryName &&
                      formik.errors.beneficiaryName}
                  </Typography>
                  {beneficiaries?.length && (
                    <Typography
                      sx={{
                        fontWeight: 400,
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#69696B",
                      }}
                      onClick={handleOpenModal}
                    >
                      Choose Beneficiary
                    </Typography>
                  )}
                </Stack>
              }
            />
          </Stack>
          {/* narration */}
          <TextField
            sx={{ flex: 1 }}
            variant="standard"
            label="Narration (Optional)"
            name="narration"
            value={formik.values.narration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.narration && Boolean(formik.errors.narration)}
            helperText={formik.touched.narration && formik.errors.narration}
          />
        </Stack>
        <Stack spacing="25px" mt="60px">
          <LoadingButton
            loading={initiatePayout?.loading}
            variant="contained"
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Transfer
          </LoadingButton>
          <Button variant="outlined" fullWidth onClick={close}>
            Cancel
          </Button>
        </Stack>
      </form>
    </>
  );
}
