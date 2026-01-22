import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import { ReactLenis } from 'lenis/react';
import ScrollToTop from '../../utils/scrollToTop';

const WebLayout = () => {
  return (
    <ReactLenis root>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
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
    </ReactLenis>
  );
};

export default WebLayout;
