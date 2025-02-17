import {alignCenterBtn} from "@/interface/btnProps";
import Typo from "@/components/typo/Typo";

const AlignCenterBtn = ({isDisable,isActive=false, onClick, ico, btnText, btnText2, color, size = 'm', isPlus = false}: alignCenterBtn) => {
  return (
    <button disabled={isDisable} onClick={onClick} className={`center-btn ${size} ${color ? color : ''} ${isActive ? 'active' : ''}`} type='button'>
      {ico && <img src={ico} />}
      {isPlus && <span className='center-btn__plus'>+</span>}
      {btnText && <Typo txt={btnText} size='s'/>} <br />
      {btnText2 && <Typo txt={btnText2} size='xs' color='grey500'/>}
    </button>
  )
};

export default AlignCenterBtn;