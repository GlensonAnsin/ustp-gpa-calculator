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
      <main className="flex-grow">
        <div className="fixed inset-0 bg-[url('/ustp-cdo-campus-bg.png')] bg-cover bg-center bg-no-repeat z-0"></div>
        <div className="fixed inset-0 bg-[#f2f4f7]/80 z-0"></div>
        <div className="relative z-10 w-full h-full flex-grow">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WebLayout;
