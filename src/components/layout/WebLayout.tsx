import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';

const WebLayout = () => {
  return (
    <div>
      <Header />
      <main className="bg-[#f2f4f7]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default WebLayout;
