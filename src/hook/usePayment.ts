import {useState} from "react";

const usePayment = () => {
  const [paymentType, setPaymentType] = useState<string>('local');
  const [isOtherPayment, setIsOtherPayment] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const changePaymentType = (e: any) => {
    setPaymentType(paymentType === 'local' ? 'international' : 'local');
  };

  const showOtherPayment = () => {
    setIsOtherPayment(true);
  };

  const hideOtherPayment = () => {
    setIsOtherPayment(false);
  };

  const changePaymentMethod = (method: string) => {
    setPaymentMethod(method);
  }

  return {
    changePaymentType,
    paymentType,
    isOtherPayment,
    showOtherPayment,
    hideOtherPayment,
    paymentMethod,
    changePaymentMethod
  };
}
export default usePayment;