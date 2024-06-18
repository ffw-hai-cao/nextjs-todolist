import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

const NavUser = () => {
  return (
    <nav className="fixed top-0 left-0 h-screen w-24 p-2 bg-slate-700 shadow-lg p-4ed text-white flex justify-center ">
      <div className='w-[4rem] h-[4rem] rounded-full bg-[#3CDBB5] hover:bg-[#656FF0] p-4 text-white flex items-center justify-center'>
        <FontAwesomeIcon className='fa-2x' icon={faUserAstronaut} />
      </div>
    </nav>
  );
}

export default NavUser;