import { Outlet } from 'react-router-dom';
import Navbar from './NavBar';

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="mt-4 px-3">
      <Outlet />
      </div>
      </>
  );
}
