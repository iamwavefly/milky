import clipboard from "@/helper/clipboard";
import stringToCurrency from "@/helper/formatCurrency";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { reload, setDrawalState } from "@/store/appSlice";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import Router, { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MoreIcon from "../../public/icons/more.svg";
import BlacklistCustomer from "../business/customers/blacklistCustomer";
import Modal from "../modal/modal";
import { Product, UserProps } from "@/interfaces";
import RemoveUser from "../settings/roles-permissions/RemoveUser";
import NewUser from "../form/newUser";
import { serialize } from "object-to-formdata";
import DeleteProd from "../business/products/DeleteProduct";
import NewProduct from "../business/products/NewProduct";

export const ViewTransaction = ({ id }: { id?: number }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event: any) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: any) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <>
      <Box>
        <IconButton
          sx={{ width: "40px", height: "40px" }}
          onClick={handleClick}
        >
          <MoreIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={(event) => Router.push(`/business/transactions/${id}`)}
          >
            View details
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export const ProductMenu = ({ id }: { id?: number }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/product/all?ProductId=${id}`,
    "get"
  );

  const dispatch = useDispatch();

  const newProdReq = useFetch(`${baseUrl}/dashboard/product/create`);

  const archiveProductReq = useFetch(
    `${baseUrl}/dashboard/product/archive/${id}`,
    "patch",
    true
  );

  const unArchiveProdReq = useFetch(
    `${baseUrl}/dashboard/product/unarchive/${id}`,
    "patch",
    true
  );
  // DUPLICATE PRODUCT
  const duplicateProdReq = useFetch(
    `${baseUrl}/dashboard/product/duplicate/${id}`,
    "post",
    true
  );

  const refreshData = () => dispatch(reload());

  useEffect(() => {
    archiveProductReq.data.message ||
      (unArchiveProdReq.data.message && refreshData());
  }, [archiveProductReq.data]);

  useEffect(() => {
    if (
      newProdReq.data.status === "success" ||
      duplicateProdReq?.data.status === "success" ||
      archiveProductReq?.data?.status === "success" ||
      unArchiveProdReq.data?.status === "success"
    ) {
      refreshData();
    }
  }, [
    newProdReq.data,
    duplicateProdReq?.data,
    archiveProductReq?.data,
    unArchiveProdReq.data,
  ]);

  useEffect(() => {
    handleSubmit();
  }, [id]);

  useEffect(() => {
    setProduct(data?.items?.[0]);
  }, [data]);

  const handleClick = (event: any) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: any) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const duplicateProduct = () => {
    duplicateProdReq?.handleSubmit();
  };

  const editProductDrawal = () => {
    dispatch(
      setDrawalState({
        active: true,
        title: "Edit Product",
        content: <NewProduct product={product} />,
      })
    );
  };

  const handleActionClick = (action: string, event: any) => {
    handleClose(event);
    if (action === "edit") return editProductDrawal();
    if (action === "delete") return handleOpenModal();
    if (action === "duplicate") return duplicateProduct();
    if (action === "archive") {
      if (product?.status !== "Archived") {
        return archiveProductReq?.handleSubmit();
      }
      return unArchiveProdReq?.handleSubmit();
    }
    // reolveDisputeDrawal();
  };

  return (
    <>
      <Modal
        title="Delete Product"
        isOpen={openModal}
        close={handleCloseModal}
        onClose={handleCloseModal}
      >
        <DeleteProd
          product={product}
          close={handleCloseModal}
          reload={refreshData}
        />
      </Modal>
      <Box>
        <IconButton
          sx={{ width: "40px", height: "40px" }}
          onClick={handleClick}
        >
          <MoreIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={(event) => handleActionClick("archive", event)}>
            {product?.status !== "Archived" ? "Archieve" : "Unarchive"}
          </MenuItem>
          <MenuItem onClick={(event) => handleActionClick("duplicate", event)}>
            Duplicate product
          </MenuItem>
          <MenuItem onClick={(event) => handleActionClick("edit", event)}>
            Edit
          </MenuItem>
          <MenuItem
            sx={{ color: "#E84A5F" }}
            onClick={(event) => handleActionClick("delete", event)}
          >
            Delete product
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export const CustomerMenu = ({ id }: { id: number }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [customer, setCustomer] = useState<any>({});
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const router = useRouter();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/fetch/customers?id=${id}`,
    "get"
  );

  useEffect(() => {
    setCustomer(data?.items?.[0]);
  }, [data, id]);

  const handleClick = (event: any) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    handleSubmit();
  };

  const handleClose = (event: any) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleActionClick = (action: string, event: any) => {
    handleClose(event);
    if (action === "view") return Router.push(`/business/customers/${id}`);
    if (action === "blacklist") return handleOpenModal();
  };

  const activeCustomer = customer?.status?.toLowerCase() === "active";

  return (
    <>
      <Modal
        title={` ${
          customer?.status?.toLowerCase() === "active"
            ? "Blacklist"
            : "Whitelist"
        } Customer`}
        isOpen={openModal}
        close={handleCloseModal}
        onClose={handleCloseModal}
      >
        <BlacklistCustomer
          emailAddress={customer?.email_address}
          close={handleCloseModal}
          action={
            customer?.status?.toLowerCase() === "active"
              ? "blacklist"
              : "whitelist"
          }
        />
      </Modal>
      <Box>
        <IconButton
          sx={{ width: "40px", height: "40px" }}
          onClick={handleClick}
        >
          <MoreIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={(event) => handleActionClick("view", event)}>
            View Details
          </MenuItem>
          <MenuItem
            sx={{
              color: activeCustomer ? "#E84A5F" : "",
            }}
            onClick={(event) => handleActionClick("blacklist", event)}
          >
            {activeCustomer ? "Blacklist" : "Whitelist"} customer
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export const VirtualAccountMenu = ({ id }: { id: number }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: any) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleActionClick = (action: string, event: any) => {
    handleClose(event);
    if (action === "view") return Router.push(`/business/customers/${id}`);
  };

  return (
    <>
      <Box>
        <IconButton
          sx={{ width: "40px", height: "40px" }}
          onClick={handleClick}
        >
          <MoreIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>View Details</MenuItem>
          {/* <MenuItem onClick={(event) => handleActionClick("view", event)}>
            View Details
          </MenuItem> */}
        </Menu>
      </Box>
    </>
  );
};
// payment link
export const PaymentLinkMenu = ({ id }: { id: number }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [details, setDetails] = useState<any>({});

  const router = useRouter();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/payment/link/subsidiary?id=${id}`,
    "get"
  );

  const linkStatusReq = useFetch(
    `${baseUrl}/dashboard/payment/link/update-status`
  );

  useEffect(() => {
    const { status, message } = linkStatusReq?.data;
    if (status === "success") {
      Router.reload();
    }
  }, [linkStatusReq?.data]);

  useEffect(() => {
    setDetails(data?.items?.[0]);
  }, [data, id]);

  const dispatch = useDispatch();

  const copyPaymentLink = () => {
    clipboard(details?.payment_link_url);
  };

  const linkStatusUpdate = () => {
    const payload = {
      action: details?.is_active ? "disable" : "activate",
      reference: details?.reference,
    };
    linkStatusReq?.handleSubmit(payload);
  };

  const handleClick = (event: any) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    handleSubmit();
  };

  const handleClose = (event: any) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleActionClick = (action: string, event: any) => {
    handleClose(event);
    if (action === "open")
      return window.open(
        details?.payment_link_url,
        "_blank",
        "noopener,noreferrer"
      );
    if (action === "view") return Router.push(`/business/payment-links/${id}`);
    if (action === "copy") return copyPaymentLink();
    if (action === "update") return linkStatusUpdate();
  };

  return (
    <>
      <Box>
        <IconButton
          sx={{ width: "40px", height: "40px" }}
          onClick={handleClick}
        >
          <MoreIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={(event) => handleActionClick("copy", event)}>
            Copy link
          </MenuItem>
          <MenuItem onClick={(event) => handleActionClick("view", event)}>
            View details
          </MenuItem>
          <MenuItem onClick={(event) => handleActionClick("open", event)}>
            Initiate payment
          </MenuItem>
          <MenuItem
            sx={{ color: details?.is_active ? "#E84A5F" : "" }}
            onClick={(event) => handleActionClick("update", event)}
          >
            {details?.is_active ? "Deactivate" : "Activate"} link
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

const DeleteBeneficiary = ({ ben, close }: any) => {
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/beneficiary/delete/${ben?.id}`,
    "delete"
  );

  useEffect(() => {
    const { status, message } = data;
    if (status === "success") {
      dispatch(reload());
      close();
    }
  }, [data]);

  const dispatch = useDispatch();

  return (
    <Box>
      <Box p="40px">
        <Typography color="rgba(38, 43, 64, 0.8)">
          You are about to delete this beneficiary:{" "}
          <Typography component="span" fontWeight={500}>
            {ben?.name}
          </Typography>
        </Typography>
      </Box>
      <Stack
        direction="row"
        spacing="24px"
        px="40px"
        py="16px"
        mt="44px"
        borderTop="1px solid #E8EAED"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Button
          onClick={close}
          variant="outlined"
          sx={{
            color: "#EA5851 !important",
            border: "1px solid #EA5851 !important",
          }}
        >
          Cancel
        </Button>
        <LoadingButton
          onClick={handleSubmit}
          variant="contained"
          sx={{ bgcolor: "#EA5851 !important" }}
          loading={loading}
        >
          Delete
        </LoadingButton>
      </Stack>
    </Box>
  );
};
// beneficial
export const BeneficiaryMenu = ({ id }: { id: number }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [details, setDetails] = useState<any>({});

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/beneficiary/all?id=${id}`,
    "get"
  );

  const dispatch = useDispatch();

  const handleClick = (event: any) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    handleSubmit();
  };

  const handleClose = (event: any) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleActionClick = (action: string, event: any) => {
    handleClose(event);
    if (action === "delete") return handleOpenModal();
  };

  return (
    <>
      <Modal
        title="Delete Beneficiary"
        isOpen={openModal}
        close={handleCloseModal}
        onClose={handleCloseModal}
      >
        <DeleteBeneficiary
          ben={data?.data?.items?.[0]}
          close={handleCloseModal}
        />
      </Modal>
      <Box>
        <IconButton
          sx={{ width: "40px", height: "40px" }}
          onClick={handleClick}
        >
          <MoreIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            sx={{ color: "#EA5851" }}
            onClick={(event) => handleActionClick("delete", event)}
          >
            Delete
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};
// transfer
// approve transfer
const ApproveTransfer = ({ details, close }: any) => {
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/payout/approve`,
    "post"
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const { status } = data;
    if (status === "success") {
      close();
      dispatch(reload());
    }
  }, [data]);

  const handleClick = () => {
    const payload = {
      payout_details: [
        {
          ...details,
          account_name: details?.recipient_name,
        },
      ],
    };
    handleSubmit(payload);
  };

  return (
    <Box>
      <Typography color="rgba(38, 43, 64, 0.8)" p="40px">
        You are about to accept a transfer of NGN{" "}
        {stringToCurrency(details?.amount)}. Do you want to proceed?:{" "}
      </Typography>
      <Stack
        direction="row"
        spacing="24px"
        px="40px"
        py="16px"
        mt="44px"
        borderTop="1px solid #E8EAED"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Button onClick={close} variant="outlined">
          Cancel
        </Button>
        <LoadingButton
          onClick={handleClick}
          variant="contained"
          loading={loading}
        >
          Approve
        </LoadingButton>
      </Stack>
    </Box>
  );
};
// approve transfer
const DeclineTransfer = ({ details }: any) => {
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/beneficiary/delete/${details?.id}`,
    "delete"
  );

  useEffect(() => {
    const { status, message } = data;
    if (status === "success") {
      Router.reload();
    }
  }, [data]);

  const dispatch = useDispatch();
  const close = () => dispatch(setDrawalState({ active: false }));

  return (
    <Box>
      <Typography color="rgba(38, 43, 64, 0.8)">
        You are about to decline a transfer of NGN{" "}
        {stringToCurrency(details?.amount)}. Do you want to proceed?:{" "}
      </Typography>
      <Stack spacing="25px" mt="60px">
        <LoadingButton
          onClick={handleSubmit}
          variant="contained"
          sx={{ bgcolor: "#EA5851 !important" }}
          loading={loading}
        >
          Approve
        </LoadingButton>
        <Button
          onClick={close}
          variant="outlined"
          sx={{
            color: "#EA5851 !important",
            border: "1px solid #EA5851 !important",
          }}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};

export const TransferMenu = ({ id }: { id: number }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [details, setDetails] = useState<any>({});
  const [openModal, setOpenModal] = useState(false);
  const [Active, setActive] = useState(undefined);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/payout/all?id=${id}`,
    "get"
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const transfer = data?.data?.items?.find((trans: any) => trans.id === +id);
    setDetails(transfer);
  }, [data]);

  const handleClick = (event: any) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    handleSubmit();
  };

  const handleClose = (event: any) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleActionClick = (action: string, event: any) => {
    handleClose(event);
    if (action === "approve") return handleOpenModal();
  };

  return (
    <>
      <Modal
        title={`Approve Transfer`}
        isOpen={openModal}
        close={handleCloseModal}
        onClose={handleCloseModal}
      >
        <ApproveTransfer details={details} close={handleCloseModal} />
      </Modal>
      <Box>
        <IconButton
          sx={{ width: "40px", height: "40px" }}
          onClick={handleClick}
        >
          <MoreIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={(event) => handleActionClick("approve", event)}>
            Approve
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export const EmptyMenu = ({ id }: { id: number }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const handleClick = (event: any) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: any) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleActionClick = (action: string, event: any) => {
    handleClose(event);
  };

  return (
    <>
      <Box>
        <IconButton
          sx={{ width: "40px", height: "40px" }}
          onClick={handleClick}
        >
          <MoreIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        ></Menu>
      </Box>
    </>
  );
};

export const UserMenu = ({ id }: { id: number }) => {
  const [user, setUser] = useState<UserProps | undefined>(undefined);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [openRoleModal, setOpenRoleModal] = useState(false);
  // remove user
  const openRmModalHandler = () => setOpenRemoveModal(true);
  const closeRmModalHandler = () => setOpenRemoveModal(false);
  // edit role
  const openRoleModalHandler = () => setOpenRoleModal(true);
  const closeRoleModalHandler = () => setOpenRoleModal(false);

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/users`,
    "get"
  );

  const dispatch = useDispatch();

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    const selectedUser = data?.users?.find(
      ({ user_id }: UserProps) => user_id === id
    );
    setUser(selectedUser);
  }, [data?.users]);

  return (
    <>
      {/* remove user modal */}
      <Modal
        title="Remove User"
        isOpen={openRemoveModal}
        close={closeRmModalHandler}
        onClose={closeRmModalHandler}
      >
        <RemoveUser user={user as UserProps} close={closeRmModalHandler} />
      </Modal>
      {/* change row modal */}
      <Modal
        title={`Edit ${user?.first_name} ${user?.last_name}'s Role`}
        isOpen={openRoleModal}
        close={closeRoleModalHandler}
        onClose={closeRoleModalHandler}
      >
        <NewUser
          user={user as UserProps}
          close={closeRoleModalHandler}
          reload={() => dispatch(reload())}
          editRoleOnly
        />
      </Modal>
      {/* buttons */}
      <Stack gap="16px" direction="row" width="200px">
        {/* remove user btn */}
        {user?.role?.toLowerCase() !== "owner" && (
          <Button
            variant="outlinedMedium"
            sx={{
              height: "32px",
              fontSize: "13px",
              maxWidth: "100px",
              px: "12px !important",
              ml: "auto !important",
            }}
            onClick={openRoleModalHandler}
          >
            Change role
          </Button>
        )}
        {user?.status?.toLowerCase() === "active" && (
          <Button
            variant="outlinedMedium"
            onClick={openRmModalHandler}
            sx={{
              height: "32px",
              maxWidth: "100px",
              px: "12px !important",
              fontSize: "13px",
              color: "#E84A5F !important",
              borderColor: "#E84A5F !important",
              bgcolor: "#FFF5F5",
              ml: "auto !important",
            }}
          >
            Remove
          </Button>
        )}
      </Stack>
    </>
  );
};

export const InvoiceMenu = ({ id }: { id: number }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/invoice/delete/${id}`,
    "delete",
    true
  );

  const handleClick = (event: any) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event?: any) => {
    event?.stopPropagation();
    setAnchorEl(null);
  };

  const handleActionClick = (action: string, event: any) => {
    event.stopPropagation();
    handleClose(event);
    if (action === "delete") return handleSubmit();
  };

  useEffect(() => {
    const { status } = data;
    if (status === "success") {
      dispatch(reload());
      handleClose();
    }
  }, [data]);

  return (
    <>
      <Box>
        <IconButton
          sx={{ width: "40px", height: "40px" }}
          onClick={handleClick}
        >
          <MoreIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            sx={{ color: "#EA5851" }}
            onClick={(event) => handleActionClick("delete", event)}
          >
            Delete
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};
