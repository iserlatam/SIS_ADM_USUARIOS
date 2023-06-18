import React, { useState } from "react";
import cardsData from "./cardsData";

const Card = ({ title, info, urlImg }) => {
  return (
    <div className="container h-auto bg-white flex flex-col justify-center  rounded-md shadow-xl">
      <img className="bg-cover" src={urlImg} />

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
  return <div>Soporte</div>;
};

export default SoportePage;
