"use client"
import {useState, useEffect, useRef} from "react";
import { useRouter } from "next/navigation";
import useAmount from '@/hook/useAmount';

import Header from "@/components/layouts/Header";
import AlignCenterBtn from "@/components/btns/AlignCenterBtn";
import SelectBtn from "@/components/btns/SelectBtn";

import AmountInput from "./AmountInput";
import LocalPayment from "./LocalPayment";
import InternationalPayment from "./InternationalPayment";
import CultureInput from "./CultureInput";

import Paragraph from "@/components/typo/Paragraph";
import BlindText from "@/components/typo/BlindText";
import Typo from "@/components/typo/Typo";

import useReplacePrice from "@/hook/useReplacePrice";
import usePayment from "@/hook/usePayment";

import PlusSvg from "@/image/ico/plus.svg";


const CacheCharge = () => {
  const router = useRouter();
  const cultureAgreeRef = useRef<HTMLInputElement>(null);

  const {cache, setCache, price, amountCache, clearCache, getTotalPrice, onChangeCache, isChangeCacheModal, setIsChangeCacheModal} = useAmount();
  const {
    changePaymentType,
    paymentType,
    isOtherPayment,
    showOtherPayment,
    hideOtherPayment,
    paymentMethod,
    changePaymentMethod
  } = usePayment();

  const [pinInputLength, setPinInputLength] = useState<number>(1);

  const [isCultureVisible, setIsCultureVisible] = useState<boolean>(false);

  const [cultureCache, setCultureCache] = useState<number>(0);

  const [pinList, setPinList] = useState<string[]>([]);

  const [isCultureChargeDisable, setIsCultureChargeDisable] = useState<boolean>(true);

  useEffect(() => {
    if(pinList.length >= 0){
      if(
        cultureAgreeRef.current
        && cultureAgreeRef.current.checked
      ){
        setIsCultureChargeDisable(false);
      }
    }
  }, [pinList]);

  const charge = () => {
    if(paymentMethod === 'culturegift'){
      setIsCultureVisible(true);
    } else {
      router.push(`/account/charge/success?cache=${cache}`);
    }
  }

  const cultureCharge = () => {
    router.push(`/account/charge/success?cache=${cache}`);
  }

  const hideCulture = () => {
    setIsCultureVisible(false);
  };

  const addPin = () => {
    setPinInputLength(prev => {
      if(prev >= 5) return prev;
      return prev + 1;
    });
  };

  const cultureAgree = (e: any) => {
    if(pinList.length >= 0){
      if(e.target.checked){
        setIsCultureChargeDisable(false);
      } else {
        setIsCultureChargeDisable(true);
      }
    }
  }
  
  const amountCultureCache = (pinNumber: string | null, callback: () => void) => {
    if(pinList.some(v=> v === pinNumber)){
      alert('이미 등록된 번호');
      callback();
    } else {
      if(pinNumber) {
        setPinList(prev => [...prev, pinNumber])
      }
      setCultureCache(prev => prev + 5000);
    }
  };

  return (
    <main className='cache-charge'>
      <section className='amount'>
        <div className='amount__header'>
          <h2>충전 금액</h2>
          {paymentMethod && <SelectBtn setIsChangeCacheModal={setIsChangeCacheModal} btnText='금액변경'/>}
        </div>
        <AmountInput clearCache={clearCache} price={price} amountCache={amountCache}/>
        <div className='amount__btn-wrap'>
          <AlignCenterBtn onClick={() => setCache(prev => prev + 1000)} btnText={useReplacePrice(1000)}/>
          <AlignCenterBtn onClick={() => setCache(prev => prev + 10000)} btnText={useReplacePrice(10000)}/>
          <AlignCenterBtn onClick={() => setCache(prev => prev + 50000)} btnText={useReplacePrice(50000)}/>
        </div>
        <Paragraph text={`* 충전 금액은 ${useReplacePrice(1000)} 캐시 단위로만 결제 가능합니다.`}/>
        {
          isChangeCacheModal && (
            <div className='other-modal'>
              <button className='other-modal__close-btn' type='button' onClick={hideOtherPayment}>
                <BlindText blindText='닫기'/>
              </button>
              <div className='other-modal__wrapper'>
                <h4>금액변경</h4>
                <div className='other-modal__btn-wrap other-modal__btn-wrap--two-line'>
                  <AlignCenterBtn onClick={() => {
                    onChangeCache(10000)
                  }} btnText='10,000' size='m'/>
                  <AlignCenterBtn onClick={() => {
                    onChangeCache(30000)
                  }} btnText='30,000' size='m'/>
                  <AlignCenterBtn onClick={() => {
                    onChangeCache(50000)
                  }} btnText='50,000' size='m'/>
                  <AlignCenterBtn onClick={() => {
                    onChangeCache(100000)
                  }} btnText='100,000' size='m'/>
                  <AlignCenterBtn onClick={() => {
                    onChangeCache(150000)
                  }} btnText='150,000' size='m'/>
                  <AlignCenterBtn onClick={() => {
                    onChangeCache(200000)
                  }} btnText='200,000' size='m'/>
                  <AlignCenterBtn onClick={() => {
                    onChangeCache(300000)
                  }} btnText='300,000' size='m'/>
                  <AlignCenterBtn onClick={() => {
                    onChangeCache(500000)
                  }} btnText='500,000' size='m'/>
                </div>
              </div>
            </div>
          )
        }
      </section>
      <section className='payment'>
        <div className='payment__header'>
          <h3>결제 수단</h3>
          {paymentType === 'local' && <SelectBtn setIsChangeCacheModal={showOtherPayment} btnText='결제수단변경'/>}
        </div>
        <div className='payment__body'>
          <LocalPayment
            paymentMethod={paymentMethod}
            changePaymentMethod={changePaymentMethod}
            hideOtherPayment={hideOtherPayment}
            showOtherPayment={showOtherPayment}
            isOtherPayment={isOtherPayment}
            changePaymentType={changePaymentType}
            paymentType={paymentType}
          />
          <InternationalPayment
            paymentMethod={paymentMethod}
            changePaymentMethod={changePaymentMethod}
            changePaymentType={changePaymentType}
            paymentType={paymentType}
          />
        </div>
      </section>
      <section className='charge'>
        <div className='charge__header'>
          <h4>최종 결제 금액</h4>
          <Typo size='lg' txt={`${getTotalPrice()}원`}/>
        </div>
        <footer className='charge__footer'>
          <Paragraph text='* 캐시 유효기간: 마지막 사용일로부터 5년'/>
          <Paragraph text='* 결제 금액에는 모든 세금이 포함되어 있습니다.'/>
          <Paragraph text='* 만 19세 미만 미성년자 회원은 법정대리인 동의가 필요하며, 동의가 완료 된 후 캐시 충전 서비스 이용이 가능합니다.'/>
        </footer>
        <AlignCenterBtn
          isDisable={(paymentMethod && (cache >= 1000)) ? false : true}
          color='primary'
          size='ml'
          btnText='충전하기'
          onClick={charge}
        />
        {isCultureVisible && (
          <article className='culture'>
            <Header onClick={hideCulture} title='문화상품권 충전'/>
            <div className='culture__pin'>
              <h5>핀번호 직접입력</h5>
              <div className='culture__container'>
                {Array.from({ length: pinInputLength }, (_, index) => (
                  <CultureInput amountCultureCache={amountCultureCache} key={index} />
                ))}
              </div>
              {
                pinInputLength < 5 && (
                  <button className='culture__add-btn' type='button' onClick={addPin}><PlusSvg/>핀번호 추가 (5개까지 추가 가능)</button>
                )
              }
            </div>
            <div className='culture__info'>
              <ul className='culture__info-top'>
                <li>
                  <Typo txt='충전 금액' size='s'/>
                  <Typo txt={`${useReplacePrice(cultureCache)} 원`} size='m'/>
                </li>
                <li>
                  <Typo txt='수수료' size='s'/>
                  <Typo txt={`${useReplacePrice(cultureCache * 0.1)} 원`} size='m'/>
                </li>
              </ul>
              <div className='culture__info-bottom'>
                <h6>총 충전 캐시</h6>
                <Typo txt='0 캐시' size='lg'/>
              </div>
            </div>
            <footer className='culture__footer'>
              <Typo txt='유의사항' size='s' color='grey500'/>
              <Paragraph text='* 캐시 충전 완료된 핀번호는 취소 불가합니다.'/>
              <label className='culture__agree'>
                <input ref={cultureAgreeRef} onChange={cultureAgree} type='checkbox'/>
                <Typo txt='유의사항을 확인하였으며 문화상품권 충전에 동의합니다' color='grey600' size='s'/>
              </label>
              <AlignCenterBtn isDisable={isCultureChargeDisable} color='primary' size='ml' btnText='충전하기' onClick={cultureCharge}/>
            </footer>
          </article>
        )}
      </section>
    </main>
  )
}

export default CacheCharge;