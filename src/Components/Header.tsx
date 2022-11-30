import { ClipboardText, List, MagnifyingGlass, User } from "phosphor-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import productExemple from "../assets/images/product-exemple.png";
import { Menu_Sidebar } from "./Menu_Sidebar";

export function Header() {
  const [menuVisibility, Setmenuvisibilty] = useState<boolean>(false);
  return (
    <header className="relative w-full px-5 md:px-14">
      <nav className="navbar py-2  bg-white relative flex items-center w-full justify-between">
        <List
          size={32}
          color="#789B3D"
          className="md:hidden"
          onClick={() => Setmenuvisibilty(!menuVisibility)}
        />
        <div className="header-form-search hidden md:flex items-end w-[25%]">
          <button className="w-10 h-10">
            <MagnifyingGlass size={32} color="#789B3D" mirrored />
          </button>
          <input
            type="text"
            placeholder="Busque Aqui..."
            className="w-10/12 p-2 border-b-[1px] border-palm-700 rounded-br focus:outline-none"
          />
        </div>
        <Link to="/" className="w-20 h-20 mt-2">
          {" "}
          <img src={Logo} alt="Logo" className="w-full object-cover" />
        </Link>
        <div className="header-icons-left w-10 md:w-[25%] flex  justify-end">
          <div className=" h-10 mr-6 hidden md:flex items-center">
            <User size={32} color="#789B3D" />
            <Link
              to="/Login"
              className=" font-body text-xs font-semibold text-palm-700 ml-2"
            >
              Login / <br /> Registre-se{" "}
            </Link>
          </div>

          <button
            className="w-10 h-9 relative "
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#PurchaseList"
            aria-controls="PurchaseList"
          >
            <ClipboardText size={36} color="#789B3D" />
            <span className="w-5 h-5 rounded-2xl bg-palm-700 text-white text-xs text-center leading-5 absolute top-[-6px] right-[-2px]">
              2
            </span>{" "}
          </button>

          <div
            className="offcanvas offcanvas-end fixed bottom-0 flex flex-col justify-between max-w-full max-h-[100vh] bg-white invisible bg-clip-padding shadow-sm outline-none transition duration-300 ease-in-out text-gray-700 top-0 right-0 border-none w-[90vw] md:w-[45vw]"
            tabIndex={-1}
            id="PurchaseList"
            aria-labelledby="PurchaseListLabel"
          >
            <div className="offcanvas-header h-[7%] flex items-center justify-between p-4">
              <h5
                className="w-full text-center text-md text-palm-700 mb-0 leading-normal font-semibold "
                id="PurchaseListLabel"
              >
                Lista de Compra
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-2 -my-5 -mr-2 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body max-h-[70%] flex-grow p-4 overflow-y-auto">
              <div className="w-full h-auto min-h-[8rem] flex items-center flex-wrap justify-evenly md:justify-between border-b-2 border-b-green-400 py-3 mb-2">
                <div className="w-32 h-32 max-w-[47%] rounded mr-3 md:mr-0 ">
                  <img
                    src={productExemple}
                    alt=""
                    className="w-full h-full rounded"
                  />
                </div>
                <div className="max-w-[50%] h-32 flex flex-col justify-around items-start">
                  <div>
                    <h4 className="w-full text-left  text-md text-palm-700">
                      Maço de rucula
                    </h4>
                    <p className="w-full text-left text-xs text-gray-400 ">
                      Associação de produtores de Barra
                    </p>
                  </div>
                  <span className="w-full text-left text-lg text-green-600">
                    R$ 3,75
                  </span>
                </div>
                <div className="md:min-w-[6rem] md:w-auto w-1/2 flex justify-start  rounded border border-palm-700 py-1 mt-4 md:mt-0">
                  <button
                    className="w-1/4 h-full text-center text-xl text-palm-700 py-2"
                    type="button"
                  >
                    -
                  </button>
                  <div className="w-1/2 h-full text-center text-sm text-palm-700 py-3">
                    1
                  </div>
                  <button
                    className="w-1/4 h-full text-center text-xl text-palm-700 py-2"
                    type="button"
                  >
                    +
                  </button>
                </div>
                <div className="w-12  h-12 rounded-[100%] bg-red-600 text-center font-bold text-xl mt-4 md:mt-0">
                  {" "}
                  -{" "}
                </div>
              </div>
              <div className="w-full h-auto min-h-[8rem] flex items-center flex-wrap justify-evenly md:justify-between border-b-2 border-b-green-400 py-3">
                <div className="w-32 h-32 max-w-[47%] rounded mr-3 md:mr-0 ">
                  <img
                    src={productExemple}
                    alt=""
                    className="w-full h-full rounded"
                  />
                </div>
                <div className="max-w-[50%] h-32 flex flex-col justify-around items-start">
                  <div>
                    <h4 className="w-full text-left  text-md text-palm-700">
                      Maço de rucula
                    </h4>
                    <p className="w-full text-left text-xs text-gray-400 ">
                      Associação de produtores de Barra
                    </p>
                  </div>
                  <span className="w-full text-left text-lg text-green-600">
                    R$ 3,75
                  </span>
                </div>
                <div className="md:min-w-[6rem] md:w-auto w-1/2 flex justify-start  rounded border border-palm-700 py-1 mt-4 md:mt-0">
                  <button
                    className="w-1/4 h-full text-center text-xl text-palm-700 py-2"
                    type="button"
                  >
                    -
                  </button>
                  <div className="w-1/2 h-full text-center text-sm text-palm-700 py-3">
                    1
                  </div>
                  <button
                    className="w-1/4 h-full text-center text-xl text-palm-700 py-2"
                    type="button"
                  >
                    +
                  </button>
                </div>
                <div className="w-12  h-12 rounded-[100%] bg-red-600 text-center font-bold text-xl mt-4 md:mt-0">
                  {" "}
                  -{" "}
                </div>
              </div>
            </div>
            <div className="w-full h-[23%] flex flex-col justify-between border-t border-gray-200">
              <div className="w-full h-[40%] flex justify-between px-3 py-5">
                {" "}
                <h4 className=" text-md md:text-lg text-gray-600 ">
                  Total
                </h4>{" "}
                <span className="text-md md:text-lg text-green-600 ">
                  R$ 3,34
                </span>
              </div>
              <button className="w-full h-[60%] text-lg text-white  bg-green-600 py-4">
                Solicitar Produtos
              </button>
            </div>
          </div>
        </div>
      </nav>
      <ul className="w-full hidden max-h-8 h-8 md:flex items-center justify-evenly mt-8">
        <li>
          {" "}
          <Link
            to="/"
            className="text-lg text-palm-700 font-normal font-display ml-16"
          >
            Início
          </Link>
        </li>
        <li>
          {" "}
          <Link
            to="/Products"
            className="text-lg text-palm-700 font-normal font-display"
          >
            Produtos
          </Link>
        </li>
        <li>
          {" "}
          <Link
            to="/Entities"
            className="text-lg text-palm-700 font-normal font-display"
          >
            Associações/Cooperativas
          </Link>
        </li>
        <li>
          {" "}
          <Link
            to="/Farmers"
            className="text-lg text-palm-700 font-normal font-display"
          >
            Produtores
          </Link>
        </li>
        <li>
          {" "}
          <Link
            to="/"
            className="text-lg text-palm-700 font-normal font-display"
          >
            Territórios
          </Link>
        </li>
      </ul>

      <div className="relative w-full h-10 mt-4 md:hidden">
        <input
          type="text"
          placeholder="Busque Aqui..."
          className="w-full h-full pl-2 border-[1px] rounded border-palm-700  focus:outline-none"
        />
        <MagnifyingGlass
          size={24}
          color="#789B3D"
          className="absolute right-2 top-2"
        />
      </div>
      <Menu_Sidebar
        toggleMenuVisibility={Setmenuvisibilty}
        valueMenu={menuVisibility}
      />
    </header>
  );
}
