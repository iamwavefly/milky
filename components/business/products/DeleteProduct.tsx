import Footer from "@/components/form/Footer";
import useFetch from "@/hooks/useFetch";
import baseUrl from "@/middleware/baseUrl";
import { setDrawalState } from "@/store/appSlice";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, Stack, Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux/es/exports";

const DeleteProd = ({ product, close, reload }: any) => {
  const { loading, data, error, handleSubmit } = useFetch(
    `${baseUrl}/dashboard/product/delete/${product?.id}`,
    "delete"
  );

  useEffect(() => {
    const { status } = data;
    if (status === "success") {
      reload();
    }
  }, [data]);

  return (
    <Box>
      <Box p="32px 40px">
        <Typography color="rgba(38, 43, 64, 0.8)">
          You are about to delete this product:{" "}
          <Typography component="span" fontWeight={500}>
            {product?.name}
          </Typography>
        </Typography>
      </Box>
      <Footer
        onClose={close}
        onClick={handleSubmit}
        variant="contained"
        sx={{ bgcolor: "#EA5851 !important" }}
        loading={loading}
      >
        Delete
      </Footer>
    </Box>
  );
};

export default DeleteProd;
