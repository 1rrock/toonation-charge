import {paragraphProps} from '@/interface/typoProps';
const Paragraph = ({text}: paragraphProps) => {
  return (
    <p className='paragraph'>{text}</p>
  )
}

export default Paragraph;