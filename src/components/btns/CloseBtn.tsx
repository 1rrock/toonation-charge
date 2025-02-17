import CloseBtnSvg from "@/image/ico/close-btn.svg";

interface propsType {
  onClick: (() => void | undefined) | undefined;

}

const CloseBtn = ({onClick}: propsType) => {
  return (
    <button onClick={onClick} className='btn-round' type='button'><CloseBtnSvg/></button>
  )
}

export default CloseBtn;