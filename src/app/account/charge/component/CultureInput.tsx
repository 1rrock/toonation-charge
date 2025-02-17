"use client"
import {useState, useRef} from "react";
import BlindText from "@/components/typo/BlindText";
import Typo from "@/components/typo/Typo";

interface Props {
  amountCultureCache: (props: string | null, func: () => void) => void;
}

const CultureInput = ({amountCultureCache}: Props) => {
  const [isCheckBtnDisabled, setIsCheckBtnDisabled] = useState<boolean>(true);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(true);

  const inputRef = useRef<HTMLInputElement>(null);

  const checkConsecutiveNumbers = (val: string) => {
    const consecutiveNumberRegex = /^(.)\1+$/;

    if (consecutiveNumberRegex.test(val)) {
      alert("이미 사용된 번호입니다.");
      return true;
    }
    return false;
  };

  const onChangePin =(e: any) => {
    if(e.target.value.length === 18){
      setIsCheckBtnDisabled(false);
    }
  }

  const onClickAmount = () => {
    if(inputRef.current){
      if(!checkConsecutiveNumbers(inputRef.current.value)){
        setIsCheckBtnDisabled(true);
        setIsInputDisabled(false);
        amountCultureCache(inputRef.current.value, () => {
          setIsCheckBtnDisabled(false);
          setIsInputDisabled(true);
        });
      }

    }
  }


  return (
    <div className='culture__input-wrap'>
      <label htmlFor='culture__label'>
        <input ref={inputRef} disabled={!isInputDisabled} onChange={onChangePin} placeholder='문하상품권 핀번호 입력 (18자리)' id='culture__input' type="text" maxLength={18} />
      </label>
      <button type='button' onClick={onClickAmount} disabled={isCheckBtnDisabled} className='culture__check-btn'>조회</button>
    </div>
  )
}

export default CultureInput;