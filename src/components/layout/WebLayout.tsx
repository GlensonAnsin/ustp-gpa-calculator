import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import { ReactLenis, useLenis } from 'lenis/react';

const WebLayout = () => {
  useLenis((lenis) => {
    console.log(lenis);
  });

  return (
    <div className="min-h-screen flex flex-col">
      <ReactLenis root />
      <Header />
      <main className="bg-[#f2f4f7] flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default WebLayout;
