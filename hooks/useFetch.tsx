import axios from "axios";
import { useEffect, useState } from "react";
import {
  resolveErrorMsg,
  notifyErrorHandler,
  catchErrors,
} from "@/middleware/catchErrors";
import { useDispatch } from "react-redux";
import { setDrawalState, setToastState } from "@/store/appSlice";
import { toast } from "react-hot-toast";

const useFetch = (
  url: string,
  type?: "post" | "patch" | "put" | "get" | "delete",
  useLoader?: boolean
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loading && useLoader) {
      toast.loading("Hold tight, we're working on it...");
    }
  }, [loading, error]);

  const handleSubmit = async (payload: any, noToast?: boolean) => {
    setLoading(true);
    try {
      const { status, data } = type
        ? await axios[type](url, payload)
        : ((await axios.post(url, payload)) as any);
      if (status === 200) {
        setData(data);
        if (
          data?.status?.toLowerCase() === "success" &&
          type !== "get" &&
          !noToast
        ) {
          toast.success(data?.message);
        }
      }
    } catch (error) {
      catchErrors(error, setError);
      setError(error as any);
      let { errorMsg, errorCode } = resolveErrorMsg(error);
      notifyErrorHandler({
        type: "error",
        title: errorMsg,
        msg: error,
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, handleSubmit } as any;
};

export default useFetch;
