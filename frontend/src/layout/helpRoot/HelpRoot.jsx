import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
const HelpRoot = () => {
  return (
    <>
      <header>
        <nav className="w-full h-14 shadow-md flex justify-between items-center px-7 font-medium text-slate-500">
          <div className="container">
            <NavLink to="/" className='hover:text-white text-slate-900 transition ease-in-out'>
                <button className='hover:bg-blue-800 border-2 border-blue-800 rounded h-8 w-16'>Atrás</button>
            </NavLink>
          </div>
          <ul className="inline-flex gap-4 justify-end text-base basis-full">
            <li className='hover:text-slate-900 transition ease-in'>
              <NavLink to="/ayuda">Índice</NavLink>
            </li>
            <li className='hover:text-slate-900 transition ease-in'>
              <NavLink to="uso">Uso del sistema</NavLink>
            </li>
            <li className='hover:text-slate-900 transition ease-in'>
              <NavLink to="tutorial">Tutorial</NavLink>
            </li>
            <li className='hover:text-slate-900 transition ease-in'>
              <NavLink to="soporte">Soporte técnico</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};

export default HelpRoot;
