import AlignCenterBtn from "@/components/btns/AlignCenterBtn";

import Typo from "@/components/typo/Typo";

interface internationalPaymentProps {
  paymentType: string;
  changePaymentType: React.ChangeEventHandler<HTMLInputElement>;
  changePaymentMethod: (props: string)=>void;
  paymentMethod: string | null;
}

const internationalPayment = ({paymentMethod, changePaymentMethod, paymentType, changePaymentType}: internationalPaymentProps) => {
  return (
    <div className='payment__international'>
      <label>
        <input name='payment' type="radio" onChange={changePaymentType}/>
        <Typo txt='해외 결제' size='s'/>
      </label>
      {
        paymentType === 'international' && (
          <div className='payment__card-wrap'>
            <AlignCenterBtn isActive={paymentMethod === 'VISA/MASTER/JCB'} onClick={() => {changePaymentMethod('VISA/MASTER/JCB')}} btnText='신용카드' btnText2='(VISA/MASTER/JCB)'/>
            <AlignCenterBtn isActive={paymentMethod === 'AMEX'} onClick={() => {changePaymentMethod('AMEX')}} btnText='신용카드' btnText2='(AMEX)'/>
            <AlignCenterBtn isActive={paymentMethod === 'union'} onClick={() => {changePaymentMethod('union')}} btnText='유니온페이'/>
            <AlignCenterBtn isActive={paymentMethod === 'VISA/MASTER'} onClick={() => {changePaymentMethod('VISA/MASTER')}} btnText='신용카드' btnText2='(VISA/MASTER)'/>
          </div>
        )
      }
    </div>
  )
}
export default internationalPayment;