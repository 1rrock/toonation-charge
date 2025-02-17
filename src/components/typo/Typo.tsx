import {textProps} from "@/interface/btnProps";

const Typo = ({size = 'm', txt, color = ''}: textProps) => {
  return (
    <span className={`typo ${size} ${color}`}>{txt}</span>
  )
}
export default Typo;