import { WhatsappLogo } from "phosphor-react";
import { useState } from "react";
import ProductExemple from "../../assets/images/product-exemple.png";
import Star from "../../assets/images/star_icon.png";
import { Carrousel } from "../../Components/Carrousel";
import { Header } from "../../Components/Header";
import { IconAddList } from "../../Components/IconAddList";
import { SectionTitle } from "../../Components/SectionTitle";

export function ProductDetail() {
  const [productQTD, setProductQTD] = useState<number>(1);

  const hendleQuantityIncrement = (item: any) => {
    alert("Sorry, ainda em construção");
  };
  const hendleQuantityDecrement = (item: any) => {
    alert("Sorry, ainda em construção");
  };

  return (
    <>
      <Header />
      <Carrousel />
      <SectionTitle
        title={"Associação dos Produtores Rurais do Pau D´arco"}
        className={"my-6"}
      />
      <main className="w-full flex flex-col md:flex-row px-8 md:px-20">
        <div className="w-full md:w-1/2 p-0">
          <div className="w-full h-[70%] min-h-[65%]">
            <img src={ProductExemple} alt="" className="w-full h-full" />
          </div>
          <div className="w-full max-h-[30%] flex justify-around">
            <div className="w-[6.25rem] h-[6.25rem] min-h-[70%]">
              <img src={ProductExemple} alt="" className="w-full h-full" />
            </div>
            <div className="w-[6.25rem] h-[6.25rem] min-h-[70%]">
              <img src={ProductExemple} alt="" className="w-full h-full" />
            </div>
            <div className="w-[6.25rem] h-[6.25rem] min-h-[70%]">
              <img src={ProductExemple} alt="" className="w-full h-full" />
            </div>
            <div className="w-[6.25rem] h-[6.25rem] min-h-[70%]">
              <img src={ProductExemple} alt="" className="w-full h-full" />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 pt-8 md:pt-0 md:pl-8 md:pr-20">
          <div className="w-full flex flex-col items-center md:items-start ">
            <h2 className="w-full text-center md:text-start text-palm-700 text-md md:text-xl font-medium">
              Maço de ruculo{" "}
            </h2>
            <div className="flex w-1/4 items-center justify-center md:justify-start mb-6">
              <span className="text-sm text-gray-400"> 4.6 </span>
              <img
                src={Star}
                className="w-4 h-4 md:w-[17px] md:h-[17px] ml-1 mr-2"
              />
              <span className="text-xs md:text-xs text-gray-400">(202)</span>
            </div>
            <div className="w-full flex justify-center md:justify-start items-start text-base mb-4">
              <span className=" text-lg text-green-600"> R$ 5,00</span>
              <span className=" text-lg text-gray-400 line-through ml-3 ">
                R$ 5,67
              </span>
            </div>
          </div>

          <div>
            <p className="w-full text-justify md:text-start text-xs md:text-sm text-gray-400 pt-4 md:pt-16 pb-4">
              <span className="text-red-500"> Aviso:</span> Todo o processo de
              negociação e entrega , deve ser feito entre o cliente e
              responsavel por este produto.{" "}
            </p>

            <div className="w-full flex flex-col md:flex-row  items-center mt-2 md:mt-0 mb-4">
              <div className="w-[75%] md:w-1/4 flex justify-start rounded border border-palm-700 py-1 mb-2 md:mb-0 md:mr-8 ">
                <button
                  className="w-1/4 h-full text-center text-xl text-palm-700"
                  type="button"
                  onClick={() => hendleQuantityDecrement(productQTD)}
                >
                  -
                </button>
                <div className="w-1/2 h-full text-center text-sm text-palm-700 py-2">
                  {productQTD}
                </div>
                <button
                  className="w-1/4 h-full text-center text-xl text-palm-700"
                  type="button"
                  onClick={() => hendleQuantityIncrement(productQTD)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="w-[75%] flex items-center justify-center px-2 py-2.5 md:px-0 md:py-2.5 bg-palm-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-palm-500 hover:shadow-lg focus:bg-palm-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-palm-500 active:shadow-lg transition duration-150 ease-in-out"
              >
                <IconAddList w={"20"} h={"20"} color="#fff" className="mr-1" />
                Adicionar a lista
              </button>
            </div>
            <button
              type="button"
              className="w-full flex justify-center items-center px-2 py-2.5 bg-green-600 text-white  text-sm leading-tight uppercase rounded shadow-md hover:bg-green-500 hover:shadow-lg focus:bg-green-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-600 active:shadow-lg transition duration-150 ease-in-out"
            >
              <WhatsappLogo size={32} color="#fff" />
              Conversar
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
