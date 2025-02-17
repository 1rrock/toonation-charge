import {useState, useEffect} from "react";
import useReplacePrice from '@/hook/useReplacePrice';

const useAmount = () => {
  const [cache, setCache] = useState<number>(3000);
  const [price, setPrice] = useState<string>(useReplacePrice(cache));
  const [isChangeCacheModal, setIsChangeCacheModal] = useState<boolean>(false);

  useEffect(() => {
    setPrice(useReplacePrice(cache));
  }, [cache]);

  const amountCache = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {target} = event;
    let {value} = target;
    setCache(Number(value.replace(/[^0-9,]/g, '').replaceAll(',', '')));
  };

  const clearCache = () => {
    setCache(0)
  };

  const getTotalPrice = () => {
    return useReplacePrice(cache + (cache*0.1));
  };

  const onChangeCache = (value: number) => {
    setCache(value);
    setIsChangeCacheModal(false);
  };

  return {
    cache,
    setCache,
    price,
    amountCache,
    clearCache,
    getTotalPrice,
    onChangeCache,
    isChangeCacheModal,
    setIsChangeCacheModal,
  };
}

export default useAmount;