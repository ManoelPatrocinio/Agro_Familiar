import { Header } from "../../Components/Header";
import header_background from "../../assets/images/img_header_exemple.png";
import entity_profile from "../../assets/images/img_entity_profile_exemple.png";
import Star from "../../assets/images/star_icon.png";
import { Filter_category } from "../../Components/Filter_category";
import { Dropdrown } from "../../Components/Dropdrown";
import { DotsThreeVertical, Funnel } from "phosphor-react";
import { CardProduct } from "../../Components/CardProduct";
import { useState } from "react";

export function Entity() {
  const [toggleFilterVisibility, SetToggleFilterVisibility] =
    useState<boolean>(false);

  return (
    <>
      <Header />
      <div className="w-full h-40 md:h-[27rem] md:min-h-[60vh] relative mt-4">
        <img
          src={header_background}
          alt="foto de capa"
          className="w-full h-full  "
        />
        <div className=" w-full absolute top-[7rem] md:top-[24rem] flex justify-between  items-center md:px-20">
          <div className="flex flex-col md:flex-row items-center md:items-end">
            <div className="w-[7rem] h-[7rem] md:w-[9.5rem] md:h-[9.5rem] rounded-[50%]">
              <img
                src={entity_profile}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center md:items-start justify-evenly px-4 pb-4">
              <h4 className="text-sm md:text-lg text-center md:text-left text-gray-800 font-display font-semibold">
                {" "}
                Associação dos Produtores Rurais do Pau D´arco
              </h4>
              <p className="text-xs md:text-sm text-gray-400 font-semibold"> Pau D´arco</p>

              <div className="flex w-1/4 items-center justify-start">
                <span className="text-xs md:text-sm text-gray-400"> 4.6 </span>
                <img
                  src={Star}
                  className="w-4 h-4 md:w-[17px] md:h-[17px] ml-1 mr-2"
                />
                <span className="text-xs md:text-xs text-gray-400">(202)</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <div>
              <div className="dropstart relative">
                <button
                  className="
                    dropdown-toggle
          
                    py-2.5
          
                    flex
                    items-center
                    whitespace-nowrap
                  "
                  type="button"
                  id="dropdownMenuButton1s"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <DotsThreeVertical size={38} weight="bold" />
                </button>
                <ul
                  className="
                    dropdown-menu
                    min-w-max
                    absolute
                    hidden
                    bg-white
                    text-base
                    z-50
                    float-left
                    py-2
                    list-none
                    text-left
                    rounded-lg
                    shadow-lg
                    mt-1
                    m-0
                    bg-clip-padding
                    border-none
                  "
                  aria-labelledby="dropdownMenuButton1s"
                >
                  <li>
                    <a
                      className="
                        dropdown-item
                        text-sm
                        py-2
                        px-4
                        font-normal
                        block
                        w-full
                        whitespace-nowrap
                        bg-transparent
                        text-gray-700
                        hover:bg-gray-100
                      "
                      href="/Entity-info"
                    >
                      Sobre
                    </a>
                  </li>
                  <li>
                    <a
                      className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                      href="#"
                    >
                      Another action
                    </a>
                  </li>
                  <li>
                    <a
                      className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                      href="#"
                    >
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 md:px-20 mt-[10rem]">
        <div className="w-full mb-4 md:mb-8 ">
          <h4 className="w-full text-sm md:text-left md:text-lg text-gray-800  font-medium">
            Todos os Podutos
          </h4>
          <p className="w-full mx-auto   text-xs md:text-left md:text-sm text-gray-400">
            {" "}
            122 items{" "}
          </p>
        </div>
        <div className="relative w-full flex items-start justify-between ">
          <Filter_category
            ToggleFilterVisibility={SetToggleFilterVisibility}
            mobileVisiblity={toggleFilterVisibility}
          />
          <div className="w-full md:w-3/4 flex flex-col  items-start">
            <div className="w-full flex justify-between md:justify-start ">
              <Dropdrown />
              <button
                onClick={() =>
                  SetToggleFilterVisibility(!toggleFilterVisibility)
                }
                className=" md:hidden text-xs text-gray-800 flex items-center whitespace-nowrap "
              >
                <Funnel size={20} className="mr-2" />
                Filtrar
              </button>
            </div>
            <div className="w-full flex flex-wrap justify-around mt-4">
              <CardProduct />
              <CardProduct />
              <CardProduct />
              <CardProduct />
              <CardProduct />
              <CardProduct />
              <CardProduct />
              <CardProduct />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
