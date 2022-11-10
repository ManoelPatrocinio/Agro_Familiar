import { WhatsappLogo } from "phosphor-react";
import IconAgriculture from "../assets/images/agriculture.png";
import IconAgroIndut from "../assets/images/agroIndus.png";
import IconAgropecuary from "../assets/images/Agropecuaria.png";

export function CardEntity() {
  return (
    <div className="w-[21.25rem] h-[13.8rem] flex flex-col justify-between pt-4 mt-4 mb-8 border border-gray-400 rounded hover:scale-110 transition duration-300 ease-in-out">
      <a href="/Entity" className="w-full text-center text-palm-700 font-display text-sm">
        Associação dos Produtores Rurais do Pau D´arco
      </a>
      <span className="w-full text-center text-gray-400 font-sans text-xs mb-2">
        Pau D´arco
      </span>

      <div className="flex justify-around items-center py-2">
        <div className="w-12 h-12 ">
          {" "}
          <img
            className="object-cover w-full h-full"
            src={IconAgriculture}
            alt="agricultura icone"
          />
        </div>
        <div className="w-12 h-12 ">
          {" "}
          <img
            className="object-cover w-full h-full"
            src={IconAgropecuary}
            alt="agropecuaria icone"
          />
        </div>
        <div className="w-12 h-12 ">
          {" "}
          <img
            className="object-cover w-full h-full"
            src={IconAgroIndut}
            alt="agroindustria icone"
          />
        </div>
      </div>

      <button
        type="button"
        className="w-full flex justify-center items-center px-2 py-2.5 bg-green-600 text-white  text-sm leading-tight uppercase rounded shadow-md hover:bg-green-500 hover:shadow-lg focus:bg-green-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-600 active:shadow-lg transition duration-150 ease-in-out"
      >
        <WhatsappLogo size={32}  color="#fff" />
        Conversar
      </button>
    </div>
  );
}
