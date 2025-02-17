'use client'
import {useState, useEffect} from 'react'

import AlignCenterBtn from "@/components/btns/AlignCenterBtn";

import AddBtnSvg from '@/image/ico/add-btn.svg';
import SlideLeftArrowSvg from '@/image/ico/slide-left-arrow.svg';
import SlideRightArrowSvg from '@/image/ico/slide-right-arrow.svg';
import CheckedSvg from '@/image/ico/checked.svg';
import CheckeSvg from '@/image/ico/check.svg';

import Typo from "@/components/typo/Typo";
import BlindText from "@/components/typo/BlindText";

interface localPaymentProps {
  paymentType: string;
  changePaymentType: React.ChangeEventHandler<HTMLInputElement>;
  isOtherPayment: boolean;
  showOtherPayment: React.MouseEventHandler<HTMLButtonElement>;
  hideOtherPayment: ()=>void;
  changePaymentMethod: (props: string)=>void;
  paymentMethod: string | null;
}

interface localPaymentState {
  key: number;
  type: string;
}

const LocalPayment = ({paymentMethod, changePaymentMethod, hideOtherPayment, showOtherPayment, isOtherPayment, paymentType, changePaymentType}: localPaymentProps) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [localPayment, setLocalPayment] = useState<localPaymentState[] | null>(null);

  useEffect(() => {
    if(!localPayment) return;
    setSlideIndex(0);
  }, [localPayment]);

  const prevSlide = () => {
    setSlideIndex(v => v - 1);
  };

  const nextSlide = () => {
    setSlideIndex(v => v + 1);
  };

  const onClickPayment = (key: number, type: string) => {
    setSlideIndex(key);
    changePaymentMethod(type);
  };

  const getPaymentSlide = () => {
    if (!localPayment) return null;
    return localPayment.map((paymentObject: localPaymentState, idx) => {
      return (
        <button key={paymentObject.key} onClick={() => {onClickPayment(idx, paymentObject.type)}} className={`payment-btn ${paymentObject.type}`}>
          <BlindText blindText={paymentObject.type} />
          <div className='check'>
            {paymentMethod === paymentObject.type ? <CheckedSvg /> : <CheckeSvg />}
          </div>
        </button>
      )
    })
  };

  const addPayment = (type: string) => {
    setLocalPayment(prev => {
      const current = prev ? [...prev] : [];
      if (current.some(v => v.type === type)) return current;

      current.unshift({ type, key: (localPayment?.length ?? 0) + 1 });
      return current;
    });

    hideOtherPayment();
  };

  return (
    <div className='payment__local'>
      <label>
        <input name='payment' type="radio" defaultChecked={true} onChange={changePaymentType}/>
        <Typo txt='국내 결제' size='s'/>
      </label>
      {
        paymentType === 'local' && (
          <div className='payment__btn-wrap'>
            {slideIndex !== 0 && <button type='button' className='payment__prev' onClick={prevSlide}><SlideLeftArrowSvg/></button>}
            <div className='payment__slide' style={{marginLeft: `calc(50vw - 121px - ${slideIndex * 262}px)`}}>
              {getPaymentSlide()}
              <button onClick={showOtherPayment} className='payment-btn'>
                <AddBtnSvg/>
                <Typo txt='결제수단 추가' size='xs'/>
              </button>
            </div>
            {
              localPayment && localPayment.length + 1 !== slideIndex + 1 && <button type='button' className='payment__next' onClick={nextSlide}><SlideRightArrowSvg/></button>
            }
          </div>
        )
      }
      {
        isOtherPayment && (
          <div className='other-modal'>
            <button className='other-modal__close-btn' type='button' onClick={hideOtherPayment}>
              <BlindText blindText='닫기'/>
            </button>
            <div className='other-modal__wrapper'>
              <h4>결제수단변경</h4>
              <div className='other-modal__btn-wrap'>
                <AlignCenterBtn
                  ico='https://sbosirdwzbyw9257399.gcdn.ntruss.com/assets/frontend-assets/toonation/donator/assets/images/icon/charge/ic_danal_naverpay_light_off.png?v=4'
                  btnText2='네이버페이'
                  size='lg'
                  onClick={() => {
                    addPayment('naver')
                  }}
                />
                <AlignCenterBtn
                  ico='https://sbosirdwzbyw9257399.gcdn.ntruss.com/assets/frontend-assets/toonation/donator/assets/images/icon/charge/ic_danal_kakaopay_light_on.png?v=4'
                  btnText2='카카오페이'
                  size='lg'
                  onClick={() => {
                    addPayment('kakao')
                  }}
                />
                <AlignCenterBtn
                  ico='https://sbosirdwzbyw9257399.gcdn.ntruss.com/assets/frontend-assets/toonation/donator/assets/images/icon/charge/ic_toss_light_off.png?v=4'
                  btnText2='토스'
                  size='lg'
                  onClick={() => {
                    addPayment('toss')
                  }}
                />
                <AlignCenterBtn
                  ico='https://sbosirdwzbyw9257399.gcdn.ntruss.com/assets/frontend-assets/toonation/donator/assets/images/icon/charge/ic_culturegift_pin_light_off.png?v=4'
                  btnText2='문화상품권'
                  size='lg'
                  onClick={() => {
                    addPayment('culturegift')
                  }}
                />
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default LocalPayment;