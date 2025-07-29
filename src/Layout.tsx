import { Outlet } from 'react-router-dom';
import Navbar from './NavBar'; 

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Outlet /> 
      </div>
    </>
  );
}