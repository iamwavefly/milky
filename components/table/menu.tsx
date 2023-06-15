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
