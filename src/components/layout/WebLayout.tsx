import { Outlet } from 'react-router';
import Header from './Header';

const WebLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default WebLayout;
