import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { Slide } from 'react-awesome-reveal';

import './RootTutorial.css';

const RootTutorial = () => {
  return (
    <div className="w-full h-screen flex">
      {/* sidenav */}
      <div className="sidenav">
        <div className="relative">
          <div className="index-title-custom">
            <p className="index-title">Temario</p>
          </div>
        </div>
        <nav>
          <ul className="index-contents">
            <li className='px-3 py-3'>
              <NavLink
                to="introduccion"
                className={({ isActive, isPending }) =>
                  isPending
                    ? 'index-item'
                    : isActive
                    ? 'index-active index-item'
                    : ''
                }
              >
                Introducción
              </NavLink>
            </li>

            <li  className='px-3 py-3'>
              <NavLink
                to="primeros-pasos"
                className={({ isActive, isPending }) =>
                  isPending
                    ? 'index-item'
                    : isActive
                    ? 'index-active index-item'
                    : ''
                }
              >
                Primeros pasos
              </NavLink>
            </li>

            <li  className='px-3 py-3'>
              <NavLink
                to="funcionalidades"
                className={({ isActive, isPending }) =>
                  isPending
                    ? 'index-item'
                    : isActive
                    ? 'index-active index-item'
                    : ''
                }
              >
                Funcionalidades del aplicativo
              </NavLink>
            </li>

            <li  className='px-3 py-3'>
              <NavLink
                to="ejemplos"
                className={({ isActive, isPending }) =>
                  isPending
                    ? 'index-item'
                    : isActive
                    ? 'index-active index-item'
                    : ''
                }
              >
                Casos de usos
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      {/* main-content */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default RootTutorial;
