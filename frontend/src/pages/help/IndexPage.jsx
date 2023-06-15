import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const IndexPage = () => {
  const [visibility, setVisibility] = useState([]);

  const toggleVisibility = (index) => {
    setVisibility((prevState) => {
      const updatedVisibility = [...prevState];
      updatedVisibility[index] = !updatedVisibility[index];
      return updatedVisibility;
    });
  };

  const data = [
    {
      title: "Usar Aplicativo",
      info: [
        {
          option: "Podras importar certificados",
        },
        {
          option: "Podras eliminar certificados",
        },
        {
          option: "Podras actualizar certificados",
        },
      ],
    },
    {
      title: "Que te ofrece esta plataforma",
      info: [
        {
          option: "Podras actualizar certificados",
        },
      ],
    },
  ];

  return (
    <section
      className="my-16 mx-28 flex flex-col justify-center items-center text-black rounded"
      style={{
        backgroundColor: "#88E0FF",
      }}
    >
      {data.map((item, index) => (
        <div
          onClick={() => toggleVisibility(index)}
          className="w-full flex flex-col border-b border-black"
          key={index}
        >
          <div className="flex justify-between items-center w-full py-3 px-3 cursor-pointer">
            <p className="text-black font-semibold">{item.title}</p>
            <IoIosArrowDown className="text-2xl" />
          </div>
          {visibility[index] && (
            <ul className="border px-3 py-3 flex flex-col gap-2 transition duration-3000">
              {item.info.map((info, infoIndex) => (
                <li className="hover:bg-sky-400 transition duration-3000" key={infoIndex}>
                  <a className="w-full block" href="">
                    {info.option}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
};

export default IndexPage;