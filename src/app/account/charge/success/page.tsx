"use client"
import {Suspense,useEffect, useState} from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Header from "@/components/layouts/Header";

import AlignCenterBtn from "@/components/btns/AlignCenterBtn";

import useReplacePrice from "@/hook/useReplacePrice";

const Success = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cache: string | null = searchParams.get("cache");

  const [lastCache, setLastCache] = useState<number>(Number(cache));

  useEffect(() => {
    const myCache = Number(localStorage.getItem("myCache") || 0);
    localStorage.setItem("myCache", JSON.stringify(myCache + Number(cache)));
    setLastCache(myCache + Number(cache));
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='success'>
        <Header title='충전하기' />
        <div className='success__container'>
          <h2>충전 결과</h2>
          <div className='success__wrapper'>
            <table>
              <tbody>
              <tr>
                <th>충전 캐시</th>
                <td><span className='blue'>{useReplacePrice(Number(cache))}</span> 캐시</td>
              </tr>
              <tr>
                <th>보유 캐시 잔액</th>
                <td><span className='blue'>{lastCache}</span> 캐시</td>
              </tr>
              </tbody>
            </table>
          </div>
          <AlignCenterBtn color='primary' size='ml' btnText='확인' onClick={() => {
            router.push('/')
          }}/>
        </div>
      </div>
    </Suspense>
  )
}
export default Success;