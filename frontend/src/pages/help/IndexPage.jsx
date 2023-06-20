import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import data from "./data.json";

const Item = ({ item, index }) => {
  const [visibility, setVisibility] = useState(false);
  const [selectedItem, setSelectedItem] = useState(-1);

  const toggleVisibility = () => {
    setVisibility((prevVisibility) => !prevVisibility);
  };

  const toggleInfo = (infoIndex) => {
    setSelectedItem((prevSelectedItem) =>
      prevSelectedItem === infoIndex ? -1 : infoIndex
    );
  };

  return (
    <div className="w-full flex flex-col border-b border-black" key={index}>
      <div
        onClick={toggleVisibility}
        className="flex justify-between items-center w-full py-3 px-3 cursor-pointer"
      >
        <p className="text-black font-semibold">{item.title}</p>
        {visibility ? (
          <IoIosArrowDown className="text-2xl transform rotate-180 transition duration-500" />
        ) : (
          <IoIosArrowDown className="text-2xl transition duration-500" />
        )}
      </div>
      {visibility && (
        <ul className="border px-3 py-3 flex justify-center items-center flex-col gap-2 transition duration-300">
          {item.info.map((info, infoIndex) => (
            <div
              style={{ width: "96%" }}
              className="cursor-pointer flex flex-col items-start"
              key={infoIndex}
            >
              <div className="flex items-center justify-between w-full">
                <li
                  className="w-full"
                  key={infoIndex}
                  onClick={() => toggleInfo(infoIndex)}
                >
                  {info.option}
                </li>
                {selectedItem === infoIndex ? (
                  <IoIosArrowDown className="text-2xl transform rotate-180 transition duration-500" />
                ) : (
                  <IoIosArrowDown className="text-2xl transition duration-500" />
                )}
              </div>
              {selectedItem === infoIndex && (
                <p className="transition duration-500 mx-2 my-2 opacity-80 text-justify">
                  {info.description}
                </p>
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

const IndexPage = () => {
  return (
    <section className="my-16 mx-28 flex flex-col justify-center items-center text-black rounded">
      {data.map((item, index) => (
        <Item item={item} index={index} key={index} />
      ))}
    </section>
  );
};

export default IndexPage;
