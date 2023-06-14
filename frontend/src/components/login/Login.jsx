import React, { useEffect, useState } from 'react';

import { login } from '../../services/loginDS';
import eclipse from './eclipse.svg'
import logo from './nobglogo.png';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function getDayTime() {
    const time = new Date().getHours();

    if (time >= 5 && time < 12) {
      return <span>Buenos <b>días</b></span>;
    } else if (time >= 12 && time < 18) {
      return <span>Buenas <b>tardes</b></span>;
    } else {
      return <span>Buenas <b>noches</b></span>;
    }
  }

  const [initUser, setInitUser] = useState({
    correo: '',
    contrasena: '',
  });

  const inputHandleChange = ({ currentTarget: input }) => {
    setInitUser({
      ...initUser,
      [input.name]: input.value,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBtn();
    }
  };

  const handleBtn = async () => {
    try {
      setIsLoading(true);
      const URI = 'http://localhost:4205/server/v1/auth/ingreso';
      const response = await axios.post(URI, initUser);

      if (response.data.message === 'ok') {
        setErr(false);
        localStorage.setItem(
          'initialToken',
          JSON.stringify(response.data.token)
        );
        window.location.href = '/';
      } else {
        setErr(response.data.message);
        setTimeout(() => {
          setErr(false);
        }, 5000);
      }
    } catch (e) {
      if (e.response && e.response.status >= 400 && e.response.status <= 500) {
        setErr(e.response.data.message);
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="bg-gray-100 w-full min-h-screen flex justify-center items-center">
          <div className="bg-white p-10 shadow-xl rounded-md relative flex flex-col justify-center items-center">
            
            <img src={eclipse} alt="" />
            <div className="container ms-3 flex flex-col gap-1">
              <h2 className="text-xl font-normal text-gray-500">
                {getDayTime()} 👋
              </h2>
            </div>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="bg-cover bg-center flex justify-center items-center custom-opacity">
          <div
            className="container flex flex-col items-center justify-center gap-6 rounded-sm"
            style={{
              width: '380px',
              height: '450px',
              padding: '60px 33px',
              zIndex: '111',
              backgroundColor: '#f4f4f4',
              boxShadow: '0 2px 25px 5px rgba(255, 255, 255, .5)',
            }}
          >
            <div className="container">
              <img src={logo} />
            </div>
            <div className="container">
              <input
                type="text"
                placeholder="Correo"
                name="correo"
                value={initUser.correo}
                onChange={inputHandleChange}
                onKeyDown={handleKeyDown}
                className="w-full h-12 px-2 text-base"
                style={{
                  backgroundColor: '#ECECEC',
                  color: 'rgba(0,0,0,.65)',
                }}
              />
            </div>
            <div className="container">
              <input
                type="password"
                placeholder="Contraseña"
                name="contrasena"
                value={initUser.contrasena}
                onChange={inputHandleChange}
                onKeyDown={handleKeyDown}
                className="w-full h-12 px-2 text-base"
                style={{
                  backgroundColor: '#ECECEC',
                  color: 'rgba(0,0,0,.65)',
                }}
              />
              {err && (
                <span className="text-red-600 text-sm mt-2 block">{err}</span>
              )}
            </div>
            <div className="container text-center">
              <button
                onClick={handleBtn}
                className="w-full text-white text-base font-semibold uppercase custom-login-btn hover:bg-green-700 transition ease-in-out duration-400 active:bg-green-800"
              >
                ingresar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
