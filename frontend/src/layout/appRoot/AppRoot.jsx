import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import logo from './logo.svg';
import './AppRoot.css';

import { MdCategory } from 'react-icons/md';
import { FiUploadCloud } from 'react-icons/fi'
import { ImExit } from 'react-icons/im'
import { BiHelpCircle } from 'react-icons/bi'

const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
}

const AppRoot = () => {
  return (
    <div className="flex flex-row">
      <nav
        className="container py-5 flex flex-col justify-between"
        style={{
          height: '100vh',
          backgroundColor: '#004A64',
          flexBasis: '100px',
        }}
      >
        <div className="container flex flex-col gap-1">
          <div className="flex justify-center items-center px-1 py-5">
            <img src={logo} />
          </div>
          <ul className="flex flex-col custom-nav">
            <NavLink to="/">
              <li className="container p-5 flex justify-center items-center transition ease-out hover:bg-cyan-950 active:bg-cyan-950">
                <MdCategory size={30} className="text-white" />
              </li>
            </NavLink>
            <NavLink to="/importar-datos">
              <li className="container p-5 flex justify-center items-center transition ease-out hover:bg-cyan-950 active:bg-cyan-950">
                <FiUploadCloud size={30} className="text-white" />
              </li>
            </NavLink>
            <NavLink to="/ayuda">
              <li className="container p-5 flex justify-center items-center transition ease-out hover:bg-cyan-950 active:bg-cyan-950">
                <BiHelpCircle size={30} className="text-white" />
              </li>
            </NavLink>
            <li onClick={handleLogout} className="cursor-pointer container p-5 flex justify-center items-center transition ease-out hover:bg-cyan-950 active:bg-cyan-950">
              <ImExit size={30} className="text-white" />
            </li>
          </ul>
        </div>
        <div className="container text-center">
          <span style={{fontSize: "8px"}} className='text-slate-300'>
            Cuenta con  <a href="https://iserlatam.com/"><b>Iser Latam</b></a>
          </span>
        </div>
      </nav>
      <main className="main w-full p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppRoot;
