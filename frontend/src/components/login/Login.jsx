import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { useMutation } from 'react-query';
import axios from 'axios';

import eclipse from './eclipse.svg';
import logo from './nobglogo.png';
import './Login.css';

const Login = () => {
  const [err, setErr] = useState(false);

  const postData = async (data) => {
    const { data: response } = await axios.post(
      'https://api.seconalprueba.com/server/v1/auth/ingreso',
      data
    );
    return response;
  };

  const { mutate, isLoading } = useMutation(postData, {
    onSuccess: (data) => {
      // ERROR DE AUTENTICACIÓN
      if (data.message === 'Credenciales incorrectas') {
        setErr(data.message);
        setTimeout(() => {
          setErr(false);
        }, 3000);
      }
      if (data.message === 'No existe un usuario registrado con este correo') {
        setErr(data.message);
        setTimeout(() => {
          setErr(false);
        }, 3000);
      }
      if (data.message === 'ok') {
        // VALIDACIÓN EXITOSA
        localStorage.setItem('initialToken', data.token);
        window.location.href = '/pcc/';
      }
    },
    onError: (error) => {
      setErr(error);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function getDayTime() {
    const time = new Date().getHours();

    if (time >= 5 && time < 12) {
      return (
        <span>
          Buenos <b>días</b>
        </span>
      );
    } else if (time >= 12 && time < 18) {
      return (
        <span>
          Buenas <b>tardes</b>
        </span>
      );
    } else {
      return (
        <span>
          Buenas <b>noches</b>
        </span>
      );
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center justify-center gap-6 w-full"
            >
              <div className="container">
                <input
                  {...register('correo', {
                    required: true,
                    pattern: /\S+@\S+\.\S+/,
                  })}
                  type="text"
                  placeholder="Correo"
                  name="correo"
                  onKeyDown={handleKeyDown}
                  className="w-full h-12 px-2 text-base"
                  style={{
                    backgroundColor: '#ECECEC',
                    color: 'rgba(0,0,0,.65)',
                  }}
                />
                {errors.correo?.type === 'pattern' && (
                  <p className="text-red-600 text-sm my-2 block">
                    El formato del correo es incorrecto
                  </p>
                )}
              </div>
              <div className="container">
                <input
                  {...register('contrasena', {
                    required: true,
                    minLength: 8,
                  })}
                  type="password"
                  placeholder="Contraseña"
                  name="contrasena"
                  onKeyDown={handleKeyDown}
                  className="w-full h-12 px-2 text-base"
                  style={{
                    backgroundColor: '#ECECEC',
                    color: 'rgba(0,0,0,.65)',
                  }}
                />
                {errors.contrasena?.type === 'minLength' && (
                  <p className="text-red-600 text-sm my-2 block">
                    La contraseña debe tener mas de 8 caracteres
                  </p>
                )}
                {err && (
                  <span className="text-red-600 text-sm my-2 block">{err}</span>
                )}
              </div>
              <div className="container text-center">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white text-base font-semibold uppercase custom-login-btn hover:bg-green-700 transition ease-in-out duration-400 active:bg-green-800"
                >
                  ingresar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
