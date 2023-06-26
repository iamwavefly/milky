import { toast } from "react-hot-toast";

const fileSizeLimit = (file: any) => {
  const maxSize = 10 * 1024 * 1024; // Maximum file size in bytes (e.g., 10MB)
  if (file && file.size > maxSize) {
    toast.error("File size exceeds the maximum limit of 10MB.");
    return true;
  } else {
    return false;
  }
};

export default fileSizeLimit;
