import React, { useEffect, useState } from "react";
import { accountTypes } from "@/utils/signup";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountTypePanel from "../accountTypePanel";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import FileUpload from "../FileUpload";
import AddIcon from "@/public/icons/add-circle.svg";
import EditIcon from "@/public/icons/edit.svg";
import Styles from "./style.module.scss";
import { useFormik } from "formik";
import { businessRegistration } from "@/schema";
import { serialize } from "object-to-formdata";
import { LoadingButton } from "@mui/lab";
import { MenuProps, stakeholderProps } from "@/interfaces";
import Modal from "../modal/modal";
import NewStakeholder from "./NewStakeholder";

interface Props {
  nextStep: () => void;
}

const defaultForm = {
  certofincorporation: null,
  proofofaddress: null,
  statementofshares: null,
  directorsidentification: null,
  memoofassociation: null,
};

export default function BusinessRegistration({ nextStep }: Props) {
  const [stakeholders, setStakeholders] = useState<stakeholderProps[]>([]);
  const [form, setForm] = useState(defaultForm);
  const [disabled, setDisabled] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [onEdit, setOnEdit] = useState<stakeholderProps | null>(null);

  // submit registration information
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/onboarding/business/registration/add-or-update`
  );

  // remove stakeholder handler
  const removeStakeholderReq = useFetch(
    `${baseUrl}/dashboard/onboarding/stakeholder/delete/${
      stakeholders?.[stakeholders.length - 1]?.id
    }`,
    "delete"
  );
  // business classes
  const fetchStakeholders = useFetch(
    `${baseUrl}/dashboard/onboarding/stakeholder/view`,
    "get"
  );
  // business classes
  const fetchBusinessClasses = useFetch(
    `${baseUrl}/dashboard/business/classes`,
    "get"
  );

  useEffect(() => {
    fetchBusinessClasses.handleSubmit();
  }, []);

  useEffect(() => {
    fetchStakeholders.handleSubmit();
  }, []);

  useEffect(() => {
    const { status, message } = data;
    if (status === "success") {
      nextStep();
    }
  }, [data]);

  useEffect(() => {
    const { status, message } = removeStakeholderReq?.data;
    if (status === "success") {
      fetchStakeholders.handleSubmit();
    }
  }, [removeStakeholderReq?.data]);

  useEffect(() => {
    setStakeholders(fetchStakeholders?.data?.data);
  }, [fetchStakeholders?.data]);

  useEffect(() => {
    const {
      certofincorporation,
      memoofassociation,
      proofofaddress,
      directorsidentification,
    } = form;
    if (
      certofincorporation &&
      memoofassociation &&
      proofofaddress &&
      directorsidentification
    ) {
      return setDisabled(false);
    }
    setDisabled(true);
  }, [form]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOnEdit(null);
    setOpenModal(false);
  };

  const fileChangeHandler = (name: string, file: Blob) => {
    setForm((prev) => ({ ...prev, [name]: file }));
  };

  const removeStakeholder = () => {
    removeStakeholderReq?.handleSubmit();
  };

  const openEditModal = (props: stakeholderProps) => {
    setOnEdit(props);
    handleOpenModal();
  };

  const openNewModal = () => {
    setOnEdit(null);
    handleOpenModal();
  };

  // form controller
  const formik = useFormik({
    initialValues: {
      businessClass: "",
      taxIdNumber: "",
    },
    validationSchema: businessRegistration,
    onSubmit: ({ businessClass, taxIdNumber }) => {
      const payload = {
        ...form,
        businessclassid: businessClass,
        taxidnumber: taxIdNumber,
      };
      const formData = serialize(payload);
      handleSubmit(formData);
    },
  });

  return (
    <Box bgcolor="#FFF">
      <Modal
        title="Add stakeholder"
        isOpen={openModal}
        close={handleCloseModal}
        onClose={handleCloseModal}
      >
        <NewStakeholder
          details={onEdit as stakeholderProps}
          close={handleCloseModal}
          reload={() => fetchStakeholders.handleSubmit()}
        />
      </Modal>
      <form onSubmit={formik.handleSubmit}>
        <Box px="40px" mt="40px">
          <Typography variant="h5" color="#3C4453">
            Fields marked with '*' are compulsory.
          </Typography>
        </Box>
        <Box p="24px 40px 40px">
          <Stack spacing="24px">
            <TextField
              label="Business class *"
              variant="outlined"
              select
              name="businessClass"
              value={formik.values.businessClass}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.businessClass &&
                Boolean(formik.errors.businessClass)
              }
              helperText={
                formik.touched.businessClass && formik.errors.businessClass
              }
            >
              {fetchBusinessClasses?.data?.data?.map(
                ({ name, id }: MenuProps) => (
                  <MenuItem sx={{ width: "100%" }} key={id} value={id}>
                    {name}
                  </MenuItem>
                )
              )}
            </TextField>
            <TextField
              label="Tax Identification Number (TIN) *"
              variant="outlined"
              name="taxIdNumber"
              value={formik.values.taxIdNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.taxIdNumber && Boolean(formik.errors.taxIdNumber)
              }
              helperText={
                formik.touched.taxIdNumber && formik.errors.taxIdNumber
              }
            />
          </Stack>
        </Box>
        <Stack className={Styles.card} pb="28px" pt="20px">
          <Typography variant="h5" fontSize="15px" fontWeight={600}>
            Upload Business Documents
          </Typography>
          <Typography
            fontSize="13px"
            fontWeight={400}
            lineHeight="21px"
            letterSpacing="0.195px"
            mt="4px"
            color="#3C4453"
          >
            All documents must be in either jpeg, jpg, png, PDF format with
            maximum size of 10mb
          </Typography>
          <Stack gap="24px" mt="16px">
            <FileUpload
              title={"Certificate of incorporation *"}
              update={(file: Blob) =>
                fileChangeHandler("certofincorporation", file)
              }
            />
            <FileUpload
              title={"Memorandum and Article of Association *"}
              update={(file: Blob) =>
                fileChangeHandler("memoofassociation", file)
              }
            />
            <FileUpload
              title={"Particulars of Directors (Optional)"}
              multiple
              update={(file: Blob) =>
                fileChangeHandler("particularsofdirectors", file)
              }
            />
            <FileUpload
              title={"Statement of return on allotment of shares (optional)"}
              update={(file: Blob) =>
                fileChangeHandler("statementofshares", file)
              }
            />
            <FileUpload
              title={"Proof of Business Address *"}
              update={(file: Blob) => fileChangeHandler("proofofaddress", file)}
            />
          </Stack>
        </Stack>
        <Stack pt="20px" pb="28px" className={Styles.card}>
          <Typography variant="h5" fontSize="15px" fontWeight={600}>
            Primary identification documents of all shareholders with 5%
            ownership and above
          </Typography>
          <Stack gap="24px" mt="16px">
            <FileUpload
              title={"Director 1 *"}
              update={(file: Blob) =>
                fileChangeHandler("directorsidentification", file)
              }
            />
            {/* <FileUpload
              title={"Director 2"}
              update={(file: Blob) =>
                fileChangeHandler("certofincorporation", file)
              }
            /> */}
            <FileUpload
              title={"Operating license (optional)"}
              multiple
              update={(file: Blob) =>
                fileChangeHandler("operatinglicense", file)
              }
            />
          </Stack>
        </Stack>
        <Stack pt="20px" pb="40px" className={Styles.card}>
          {/* header */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography fontSize="15px" fontWeight={600} lineHeight="26px">
              Add at least one stakeholder *
            </Typography>
            {stakeholders?.length > 0 && (
              <Stack
                direction="row"
                spacing="6px"
                alignItems="center"
                sx={{ cursor: "pointer" }}
                onClick={openNewModal}
              >
                <AddIcon width="18px" height="18px" fill="#0048B1" />
                <Typography
                  color="#0048B1"
                  fontSize="13px"
                  fontWeight={600}
                  lineHeight="22px"
                >
                  Add another
                </Typography>
              </Stack>
            )}
          </Stack>
          {/* form */}
          <Stack mt="12px">
            {stakeholders?.length === 0 && (
              <Button
                sx={{ width: "max-content" }}
                variant="outlined"
                onClick={openNewModal}
              >
                Add stakeholders
              </Button>
            )}
            <Stack spacing="24px" mt="8px">
              {stakeholders?.map((props, index) => (
                <TextField
                  key={props?.id}
                  variant="outlined"
                  label={`Stakeholder ${index + 1}`}
                  value={`${props?.first_name} ${props?.last_name}`}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          sx={{ mr: "-10px" }}
                          edge="start"
                          onClick={() => openEditModal(props)}
                        >
                          <EditIcon fill="rgba(111, 122, 144, 1)" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              ))}
            </Stack>
            {stakeholders?.length > 0 && (
              <Button
                sx={{
                  mt: "8px",
                  color: "rgba(232, 74, 95, 1)",
                  fontSize: "12px",
                  cursor: "pointer",
                  width: "max-content",
                }}
                variant="text"
                onClick={removeStakeholder}
              >
                Remove stakeholder {stakeholders?.length}
              </Button>
            )}
          </Stack>
        </Stack>
        {/* footer */}
        <Stack
          py="16px"
          spacing="28px"
          direction="row"
          className={Styles.card}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            variant="text"
            sx={{ p: 0, bgcolor: "transparent !important" }}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            loading={loading}
            // disabled={
            //   !(formik.isValid && formik.dirty) ||
            //   disabled ||
            //   stakeholders.length < 1
            // }
            type="submit"
          >
            Save & Continue
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
}
