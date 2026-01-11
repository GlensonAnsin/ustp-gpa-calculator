const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center text-lg p-4 border-t-1 border-slate-500/20 bg-indigo-950 bottom-0">
      <aside>
        <p>© {new Date().getFullYear()} Glenson Ansin. All rights reserved.</p>
        <div className="flex items-center gap-2 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity">
          <span>Built with</span>
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
