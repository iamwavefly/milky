import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

export default function useFlutterPayment({ config, setShowSuccess }) {
  const handleFlutterPayment = useFlutterwave(config);
  handleFlutterPayment({
    callback: () => {
      setShowSuccess(true);
      closePaymentModal(); // this will close the modal programmatically
    },
  });
  return <></>;
}
