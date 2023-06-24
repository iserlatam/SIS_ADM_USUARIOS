import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import logoApp from './logoApp.svg';
import brandIser from './IserBrand.svg';
import './AppRoot.css';

import { MdCategory } from 'react-icons/md';
import { FiUploadCloud } from 'react-icons/fi';
import { ImExit } from 'react-icons/im';
// import { BiHelpCircle } from 'react-icons/bi';

const handleLogout = () => {
  localStorage.clear();
  window.location.reload();
};

const AppRoot = () => {
  return (
    <div className="flex flex-row w-full h-full">
      <aside className="container bg-cake-blue-900 flex flex-col justify-between bg-cake-blue h-[100vh] w-[100px]">
        <div className="container flex flex-col gap-1">
          <div className="flex justify-center items-center px-1.5 py-5">
            <img src={logoApp} />
          </div>
          <ul className="flex flex-col custom-nav">
            <NavLink to="/pcc/">
              <li className="container p-5 flex justify-center items-center transition ease-out hover:bg-[#2F345A]">
                <MdCategory size={30} className="text-white" />
              </li>
            </NavLink>
            <NavLink to="importar-datos">
              <li className="container p-5 flex justify-center items-center transition ease-out hover:bg-[#2F345A]">
                <FiUploadCloud size={30} className="text-white" />
              </li>
            </NavLink>
            {/* <NavLink to="/ayuda">
                <li className="container p-5 flex justify-center items-center transition ease-out hover:bg-[#2F345A]">
                  <BiHelpCircle size={30} className="text-white" />
                </li>
              </NavLink> */}
            <li
              onClick={handleLogout}
              className="cursor-pointer container p-5 flex justify-center items-center transition ease-out hover:bg-[#2F345A]"
            >
              <ImExit size={30} className="text-white" />
            </li>
          </ul>
        </div>
        <a href="https://iserlatam.com/" target='_blank'>
        <img src={brandIser} alt="" />
        </a>
      </aside>

      <main className="h-[100vh] w-full overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
};

export default AppRoot;
