import { MdArrowBack } from 'react-icons/md';
import { Outlet, NavLink } from 'react-router-dom';

import './Index.css';

const HelpRoot = () => {
  return (
    <>
      <header className="bg-cake-blue-50">
        <div className="flex w-full px-3 pt-2 items-center justify-between">
          <div className="flex items-center">
            <img src="/FAQlogo.svg" alt="PCC logo" width="200" />
          </div>
          <div class="w-full flex justify-center">
            <input
              class="appearance-none block w-1/2 bg-gray-100 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
              type="search"
              placeholder="Búscar en la guía..."
            />
          </div>
          <div>
            <NavLink to="/pcc" className="back-button">
              <MdArrowBack size={15} />
              <span>Atrás</span>
            </NavLink>
          </div>
        </div>

        <nav className="w-full pt-5 h-fill flex items-center px-3 text-slate-800">
          <ul className="inline-flex text-sm">
            <li>
              <NavLink className="nav-custom-link" to="/pcc/soporte" end>
                Índice
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-custom-link" to="bienvenida" end>
                Bienvenida
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-custom-link" to="uso-general/introduccion">
                ¿Cómo se usa?
              </NavLink>
            </li>

            <li>
              <NavLink className="nav-custom-link" to="atencion-cliente">
                Atención al cliente
              </NavLink>
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
