import axios from "axios";
import { useState } from "react";
import {
  resolveErrorMsg,
  notifyErrorHandler,
  catchErrors,
} from "@/middleware/catchErrors";
import { useDispatch } from "react-redux";
import { setToastState } from "@/store/appSlice";
import { toast } from "react-hot-toast";

const useFetch = (url: string, type?: "get" | "post") => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = async (payload: any) => {
    setLoading(true);
    try {
      const { status, data } =
        type === "get" ? await axios.get(url) : await axios.post(url, payload);
      if (status === 200) {
        setData(data);
      }
    } catch (error) {
      catchErrors(error, setError);
      let { errorMsg } = resolveErrorMsg(error);
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
