"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Header from "@/components/layouts/Header";
import AlignCenterBtn from "@/components/btns/AlignCenterBtn";
import useReplacePrice from "@/hook/useReplacePrice";

const SuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [cache, setCache] = useState<number>(0);
  const [lastCache, setLastCache] = useState<number>(0);

  useEffect(() => {
    const cacheValue = searchParams.get("cache");
    if (cacheValue) {
      const numericCache = Number(cacheValue);
      setCache(numericCache);

      // 기존 localStorage 값 불러오기
      const myCache = Number(localStorage.getItem("myCache") || 0);
      const updatedCache = myCache + numericCache;

      localStorage.setItem("myCache", JSON.stringify(updatedCache));
      setLastCache(updatedCache);
    }
  }, [searchParams]);

  return (
    <div className="success">
      <Header title="충전하기" />
      <div className="success__container">
        <h2>충전 결과</h2>
        <div className="success__wrapper">
          <table>
            <tbody>
            <tr>
              <th>충전 캐시</th>
              <td>
                <span className="blue">{useReplacePrice(cache)}</span> 캐시
              </td>
            </tr>
            <tr>
              <th>보유 캐시 잔액</th>
              <td>
                <span className="blue">{useReplacePrice(lastCache)}</span> 캐시
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <AlignCenterBtn
          color="primary"
          size="ml"
          btnText="확인"
          onClick={() => router.push("/")}
        />
      </div>
    </div>
  );
};

// Suspense로 감싸기 (Next.js의 CSR 우선 처리)
const Success = () => (
  <Suspense fallback={<div>로딩 중...</div>}>
    <SuccessContent />
  </Suspense>
);

export default Success;
