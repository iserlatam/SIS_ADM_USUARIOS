import React, { useState } from 'react';

import cardsData from './cardsData'

const Card = ({ title, info, urlImg }) => {
  return (
    <div className="container h-auto bg-white flex flex-col justify-center  rounded-md shadow-xl">
      <img
        className="bg-cover"
        src={urlImg}
      />

      <div className="container p-4 flex flex-col gap-2">
        <h2 className="font-medium text-2xl">{title}</h2>

        <p>{info}</p>
        <a
          href=""
          className="w-24 h-8 flex justify-center items-center rounded bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium"
        >
          Ver mas
        </a>
      </div>
    </div>
  );
};

const SoportePage = () => {
  const [isOpenN1, setIsOpenN1] = useState(false);

  const handleOpenBtnN1 = () => {
    !isOpenN1 ? setIsOpenN1(true) : setIsOpenN1(false);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <section
        className="flex flex-col justify-center items-center gap-3 w-full"
        style={{
          height: '320px',
          backgroundColor: '#F7F7F7',
        }}
      >
        <h1
          style={{
            fontFamily: 'Roboto',
          }}
          className="font-medium text-4xl text-neutral-700"
        >
          Soporte técnico 🎧 🙋
        </h1>
        <h3 className="text-lg text-neutral-600">
          Encuentre ayuda e información útil sobre nuestros servicios y el
          aplicativo
        </h3>
      </section>
      <section
        className="flex justify-center gap-4 pt-6 w-full"
        style={{
          height: '320px',
        }}
      >
        <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-8 w-full px-28">
          {cardsData.map((card) => (
            <Card key={card.id} title={card.title} info={card.info} urlImg={card.urlImg}></Card>
          ))}
        </div>

        {/* <button onClick={handleOpenBtnN1}>Desplegar</button> */}
      </section>
      {/* {isOpenN1 && <div className="seccion">Esta la abri</div>} */}
    </div>
  );
};

export default SoportePage;
