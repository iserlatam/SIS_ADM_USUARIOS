import React from 'react';

import { MdArrowRightAlt } from 'react-icons/md';
import { IconContext } from 'react-icons';

import { Link } from 'react-router-dom';
import { Fade, Slide } from 'react-awesome-reveal';

const Card = ({ data }) => {

  return (
    <>
      <Fade cascade delay={1500} damping={0.5}>
      {data.map((card, index) => (
        <div className="w-full h-auto flex shadow-md rounded bg-white transition-shadow card-action" key={index}>
          <div className="flex flex-col px-4 py-4 gap-3">
            {/* Aqui debe poder colocarse el nombre del icono y automaticamente lo genera */}
            {card.icon && (
                <IconContext.Provider value={{ color: '#1d6af490', size: '50' }}>
                    {React.createElement(card.icon)}
                </IconContext.Provider>
            )}
            <h3 className="text-xl text-neutral-900 block">
              {card.title ? card.title : ''}
            </h3>
            <p className="text-gray-700 block">
              {card.description ? card.description : ''}
            </p>
            <Link className="flex items-center gap-1" to={card.destiny}>
              <span className="font-medium text-gray-700 uppercase hover:font-bold">
                empecemos
              </span>
              <MdArrowRightAlt size={18} />
            </Link>
          </div>
        </div>
        
        ))}
        </Fade>
    </>
  );
};

export default Card;
