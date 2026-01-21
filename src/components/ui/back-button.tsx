import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';

export const NavBack = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="text-[#16163f] hover:text-[#FCB316] hover:scale-110 transition ease-in-out cursor-pointer sticky top-25 left-10"
      aria-label="Go back"
    >
      <FontAwesomeIcon icon={faCircleChevronLeft} size="2x" />
    </button>
  );
};
