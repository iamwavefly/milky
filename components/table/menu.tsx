import clipboard from "@/helper/clipboard";
import stringToCurrency from "@/helper/formatCurrency";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { setDrawalState } from "@/store/appSlice";
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

const DeletePromptComp = ({ product }: any) => {
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/product/delete/${product?.id}`,
    "delete"
  );

  const dispatch = useDispatch();
  const close = () => dispatch(setDrawalState({ active: false }));

  return (
    <Box>
      <Typography color="rgba(38, 43, 64, 0.8)">
        You are about to delete this product:{" "}
        <Typography component="span" fontWeight={500}>
          {product?.name}
        </Typography>
      </Typography>
      <Stack spacing="25px" mt="60px">
        <LoadingButton
          onClick={handleSubmit}
          variant="contained"
          sx={{ bgcolor: "#EA5851 !important" }}
          loading={loading}
        >
          Delete
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

export const ProductMenu = ({ id }: { id?: number }) => {
  const [product, setProduct] = useState<any>({});
  const [anchorEl, setAnchorEl] = useState(null);
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/product/all?ProductId=${id}`,
    "get"
  );

  const router = useRouter();

  const archiveProductReq = useFetch(
    `${baseUrl}/dashboard/product/archive/${id}`,
    "patch"
  );

  const unArchiveProductReq = useFetch(
    `${baseUrl}/dashboard/product/unarchive/${id}`,
    "patch"
  );

  const refreshData = () => router.reload();

  useEffect(() => {
    archiveProductReq.data.message ||
      (unArchiveProductReq.data.message && refreshData());
  }, [archiveProductReq.data]);

  useEffect(() => {
    handleSubmit();
  }, [id]);

  useEffect(() => {
    setProduct(data?.items?.[0]);
  }, [data]);

  const dispatch = useDispatch();

  const handleClick = (event: any) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: any) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const openDeletePrompt = () => {
    dispatch(
      setDrawalState({
        active: true,
        title: "Delete Product",
        content: <DeletePromptComp product={product} />,
      })
    );
  };

  const handleActionClick = (action: string, event: any) => {
    handleClose(event);
    if (action === "edit") return Router.push(`/business/products/edit/${id}`);
    if (action === "delete") return openDeletePrompt();
    if (action === "archive") {
      if (product?.status !== "Archived") {
        return archiveProductReq?.handleSubmit();
      }
      return unArchiveProductReq?.handleSubmit();
    }
    // reolveDisputeDrawal();
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
          <MenuItem onClick={(event) => handleActionClick("edit", event)}>
            Edit
          </MenuItem>
          <MenuItem onClick={(event) => handleActionClick("archive", event)}>
            {product?.status !== "Archived" ? "Archieve" : "Unarchive"}
          </MenuItem>
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

export const CustomerMenu = ({ id }: { id: number }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [customer, setCustomer] = useState<any>({});

  const router = useRouter();

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/fetch/customers?id=${id}`,
    "get"
  );

  useEffect(() => {
    setCustomer(data?.items?.[0]);
  }, [data, id]);

  const dispatch = useDispatch();
  // open drawal
  const openDrawal = () => {
    dispatch(
      setDrawalState({
        active: true,
        title: "Blacklist Customer",
        content: (
          <BlacklistCustomer
            emailAddress={customer?.email_address}
            action={
              customer?.status?.toLowerCase() === "active"
                ? "blacklist"
                : "whitelist"
            }
          />
        ),
      })
    );
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
    if (action === "view") return Router.push(`/business/customers/${id}`);
    if (action === "blacklist") return openDrawal();
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
          <MenuItem onClick={(event) => handleActionClick("blacklist", event)}>
            {customer?.status?.toLowerCase() === "active"
              ? "Blacklist"
              : "Whitelist"}{" "}
            customer
          </MenuItem>
          <MenuItem onClick={(event) => handleActionClick("view", event)}>
            View Details
          </MenuItem>
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
    clipboard(details?.payment_url);
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
      return window.open(details?.payment_url, "_blank", "noopener,noreferrer");
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
          <MenuItem onClick={(event) => handleActionClick("update", event)}>
            {details?.is_active ? "Deactivate" : "Activate"} link
          </MenuItem>
          <MenuItem onClick={(event) => handleActionClick("view", event)}>
            View details
          </MenuItem>
          <MenuItem onClick={(event) => handleActionClick("copy", event)}>
            Copy link
          </MenuItem>
          <MenuItem onClick={(event) => handleActionClick("open", event)}>
            Initiate payment
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

const DeleteBeneficiary = ({ ben }: any) => {
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/beneficiary/delete/${ben?.id}`,
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
        You are about to delete this beneficiary:{" "}
        <Typography component="span" fontWeight={500}>
          {ben?.name}
        </Typography>
      </Typography>
      <Stack spacing="25px" mt="60px">
        <LoadingButton
          onClick={handleSubmit}
          variant="contained"
          sx={{ bgcolor: "#EA5851 !important" }}
          loading={loading}
        >
          Delete
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
// beneficial
export const BeneficiaryMenu = ({ id }: { id: number }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [details, setDetails] = useState<any>({});

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

  const openDeletePrompt = () => {
    dispatch(
      setDrawalState({
        active: true,
        title: "Delete Beneficiary",
        content: <DeleteBeneficiary ben={data?.data?.items?.[0]} />,
      })
    );
  };

  const handleActionClick = (action: string, event: any) => {
    handleClose(event);
    if (action === "delete") return openDeletePrompt();
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
const ApproveTransfer = ({ details }: any) => {
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/payout/approve`,
    "post"
  );

  useEffect(() => {
    const { status } = data;
    if (status === "success") {
      Router.reload();
    }
  }, [data]);

  const dispatch = useDispatch();
  const close = () => dispatch(setDrawalState({ active: false }));

  const handleClick = () => {
    const payload = {
      payout_details: [
        {
          ...details,
        },
      ],
    };
    handleSubmit(payload);
  };

  return (
    <Box>
      <Typography color="rgba(38, 43, 64, 0.8)">
        You are about to accept a transfer of NGN{" "}
        {stringToCurrency(details?.amount)}. Do you want to proceed?:{" "}
      </Typography>
      <Stack spacing="25px" mt="60px">
        <LoadingButton
          onClick={handleClick}
          variant="contained"
          loading={loading}
        >
          Approve
        </LoadingButton>
        <Button onClick={close} variant="outlined">
          Cancel
        </Button>
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

  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/payout/all?id=${id}`,
    "get"
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const transfer = data?.data?.items?.find((trans: any) => trans.id === +id);
    console.log({ transfer });
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

  const openPrompt = (title: string) => {
    dispatch(
      setDrawalState({
        active: true,
        title,
        content: title.includes("Approve") ? (
          <ApproveTransfer details={details} />
        ) : (
          <DeclineTransfer details={details} />
        ),
      })
    );
  };

  const handleActionClick = (action: string, event: any) => {
    handleClose(event);
    if (action === "approve") return openPrompt("Approve Transfer");
    if (action === "decline") return openPrompt("Decline Transfer");
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
          <MenuItem onClick={(event) => handleActionClick("approve", event)}>
            Approve
          </MenuItem>
          {/* <MenuItem
            sx={{ color: "#EA5851" }}
            onClick={(event) => handleActionClick("decline", event)}
          >
            Decline
          </MenuItem> */}
        </Menu>
      </Box>
    </>
  );
};
