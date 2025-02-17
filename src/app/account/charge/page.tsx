"use client"
import {useState} from 'react';

import Header from "@/components/layouts/Header";

import MenuBtn from "@/components/btns/MenuBtn";

import CacheCharge from './component/CacheCharge';

const Charge = () => {
  const [chargeMode, setChargeMode] = useState<string>("cache");

  return (
    <div>
      <Header title='충전하기' onClick={() => {console.log('!!!')}}/>
      <nav className='menu'>
        <ul className='menu__wrapper'>
          <li className='menu__list'>
            <MenuBtn btnText='캐시충전' mode='cache' chargeMode={chargeMode} setChargeMode={setChargeMode}/>
          </li>
          <li className='menu__list'>
            <MenuBtn btnText='자동충전' mode='auto' chargeMode={chargeMode} setChargeMode={setChargeMode}/>
          </li>
        </ul>
      </nav>
      {
        chargeMode === 'cache' ? <CacheCharge /> : <div>자동충전</div>
      }

    </div>
  );
}

export default Charge;
