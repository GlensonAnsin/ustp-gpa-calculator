import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';

const WebLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="bg-[#f2f4f7] flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default WebLayout;
