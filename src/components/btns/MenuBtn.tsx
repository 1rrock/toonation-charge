import {menuButtonProps} from "@/interface/btnProps";
import Typo from '@/components/typo/Typo';

const MenuBtn = ({btnText, mode, setChargeMode, chargeMode}: menuButtonProps) => {
  const onClickMenu = () => {
    setChargeMode(mode);
  };

  return (
    <a className={`underline_btn${mode === chargeMode ? ' active' : ''}`} href="#" onClick={onClickMenu}>
      <Typo color={mode === chargeMode ? 'grey900' : 'grey500'} txt={btnText} />
    </a>
  )
};

export default MenuBtn;