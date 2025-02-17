import CloseBtn from '@/components/btns/CloseBtn';

interface propsType {
  title:string;
  onClick?: (() => void | undefined) | undefined;
}
const Header = ({title, onClick}:propsType ) => {
  return (
    <header className='header'>
      <h1>{title}</h1>
      {
        onClick && <CloseBtn onClick={onClick} />
      }
    </header>
  )
}
export default Header;