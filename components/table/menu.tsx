import clipboard from "@/helper/clipboard";
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
  const [product, setProduct] = useState({});
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

  const refreshData = () => router.replace(router.asPath);

  useEffect(() => {
    archiveProductReq.data.message && refreshData();
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
    if (action === "archive") return archiveProductReq?.handleSubmit();
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
            Archieve
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
          <MenuItem onClick={(event) => handleActionClick("view", event)}>
            Initiate payment
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};
