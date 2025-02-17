import BlindText from "@/components/typo/BlindText";
import Typo from "@/components/typo/Typo";

import InputResetBtnSvg from "@/image/ico/input-reset-btn.svg";

import {amountProps} from '@/interface/inputProps';

const AmountInput = ({price, amountCache, clearCache}: amountProps) => {

  return (
    <div className='amount__input-wrap'>
      <label htmlFor='charge_amount'>
        <input id='charge_amount' type="text" value={price} onChange={amountCache}/>
        <button type='button' onClick={clearCache}>
          <InputResetBtnSvg/>
          <BlindText blindText='충전 금액 초기화'/>
        </button>
        <Typo txt='캐시'/>
      </label>
    </div>
  )
}

export default AmountInput;