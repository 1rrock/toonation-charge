import {buttonProps} from "@/interface/btnProps";
import Dropdown from '@/image/ico/dropdown.svg';
import Typo from "@/components/typo/Typo";

const SelectBtn = ({btnText, setIsChangeCacheModal}: buttonProps) => {
  return (
    <button onClick={() => {setIsChangeCacheModal && setIsChangeCacheModal(true)}} className='select-btn' type='button'><Typo txt={btnText} size='s' /><Dropdown /></button>
  )
};

export default SelectBtn;