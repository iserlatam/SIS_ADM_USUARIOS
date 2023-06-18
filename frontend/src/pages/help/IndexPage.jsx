import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import data from "./data.json";

const IndexPage = () => {
  const [visibility, setVisibility] = useState([]);
  const [infoVisibility, setInfoVisibility] = useState([]);
  // const [infoVisibility, setInfoVisibility] = useState(false);

  const toggleVisibility = (index) => {
    setVisibility((prevState) => {
      const updatedVisibility = [...prevState];
      updatedVisibility[index] = !updatedVisibility[index];
      return updatedVisibility;
    });
  };

  // const toggleInfoVisibility = ()=>{
  //     setInfoVisibility(!infoVisibility);
  // }

  const toggleInfoVisibility = (itemIndex) => {
    setInfoVisibility((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[itemIndex] = !updatedVisibility[itemIndex];
      return updatedVisibility;
    });
  };

  return (
    <section
      className="my-16 mx-28 flex flex-col justify-center items-center text-black rounded"
      style={{
        backgroundColor: "#88E0FF",
      }}
    >
      {data.map((item, index) => (
        <div className="w-full flex flex-col border-b border-black" key={index}>
          <div
            onClick={() => toggleVisibility(index)}
            className="flex justify-between items-center w-full py-3 px-3 cursor-pointer"
          >
            <p className="text-black font-semibold">{item.title}</p>
            {visibility[index] ? (
              <IoIosArrowDown className="text-2xl transform rotate-180 transition duration-50000" />
            ) : (
              <IoIosArrowDown className="text-2xl transition duration-50000" />
            )}
          </div>
          {visibility[index] && (
            <ul className="border px-3 py-3 flex justify-center items-center flex-col gap-2 transition duration-3000">
              {item.info.map((info, infoIndex) => (
                <div
                  onClick={() => toggleInfoVisibility(infoIndex)}
                  style={{ width: "96%" }}
                  className="cursor-pointer flex justify-between items-center"
                >
                  <li className="" key={infoIndex}>
                    {info.option}
                    {console.log(visibility)}
                  </li>
                  {infoVisibility[infoIndex] ? (
                    <IoIosArrowDown className="text-2xl transform rotate-180 transition duration-50000" />
                  ) : (
                    <IoIosArrowDown className="text-2xl transition duration-50000" />
                  )}
                </div>
                //Aquie estara el contenido de cada informacion, por lo que tenemos que modificar el archivo json y tambien
                //Tenemos que realizar el respectivo mapeo para que se vea la informacion correspondiente
                //Tenemos un error y es que el codigo de arriba afecta a todos los iconos de los demas elementos, por lo que 
                //hay que acomodar bien el archivo json, para realizar hacer la animacion del archivo en el index correcto
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
};

export default IndexPage;
