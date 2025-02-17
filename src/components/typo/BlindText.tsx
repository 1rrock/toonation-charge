import {blindTextProps} from "@/interface/btnProps";

const BlindText = ({blindText}: blindTextProps)  => {
  return (
    <span className='blind'>{blindText}</span>
  )
};
export default BlindText;