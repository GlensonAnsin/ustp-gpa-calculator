import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGhost } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center text-lg p-4 bg-[#16163f] z-100">
      <aside>
        <p className="text-white text-center text-base">
          © {new Date().getFullYear()} USTP GPA Calculator. All rights reserved.
        </p>
        <p className="flex justify-center gap-2 text-white text-base">
          Developed by{' '}
          <span className="flex items-center font-bold gap-1">
            GHOST
            <FontAwesomeIcon icon={faGhost} />
          </span>
        </p>
        <div className="flex items-center justify-center gap-2 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity">
          <span className="text-white">Built with</span>
          <img src="https://cdn.simpleicons.org/react/react" alt="React" className="w-5 h-5" title="React" />
          <img src="https://cdn.simpleicons.org/vite/vite" alt="Vite" className="w-5 h-5" title="Vite" />
          <img
            src="https://cdn.simpleicons.org/tailwindcss/tailwindcss"
            alt="Tailwind CSS"
            className="w-5 h-5"
            title="Tailwind CSS"
          />
        </div>
      </aside>
    </footer>
  );
};

export default Footer;
