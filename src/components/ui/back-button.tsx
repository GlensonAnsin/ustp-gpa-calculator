import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';

export const NavBack = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-25 z-40 w-full px-4 md:px-[10%] pointer-events-none">
      <button
        onClick={() => navigate(-1)}
        className="pointer-events-auto text-[#16163f] hover:text-[#FCB316] hover:scale-110 transition ease-in-out cursor-pointer"
        aria-label="Go back"
      >
        <FontAwesomeIcon icon={faCircleChevronLeft} className="text-3xl md:text-4xl" />
      </button>
    </div>
  );
};
