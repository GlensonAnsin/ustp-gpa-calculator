import ustpLogo from '../../assets/ustp-logo.png';

const Header = () => {
  return (
    <header className="bg-white w-full h-20 p-10 flex items-center sticky top-0 z-100 flex items-center gap-3">
      <img src={ustpLogo} alt="logo" width={75} height={75} />
      <h1 className="text-2xl font-bold text-[#1a1851]">USTP GPA Calculator</h1>
    </header>
  );
};

export default Header;
