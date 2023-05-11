import { toast } from "react-hot-toast";

const clipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard");
};

export default clipboard;
