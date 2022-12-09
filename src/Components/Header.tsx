import { ClipboardText, MagnifyingGlass, User } from "phosphor-react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { FormUserAccess } from "./FormUserAccess";
import { Menu_Sidebar } from "./Menu_Sidebar";
import { PurchaseList } from "./PurchaseList";

export function Header() {
  return (
    <header className="relative w-full px-5 md:px-14">
      <nav className="navbar py-2  bg-white relative flex items-center w-full justify-between">
        <Menu_Sidebar />
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
          <div className="dropdown relative  h-10 mr-6 hidden md:flex items-center">
            <button
              className="
              flex  
              text-left
              font-body
              text-xs 
              font-semibold
              text-palm-700 ml-2         
            "
              type="button"
              id="dropdownLogin"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <User size={32} color="#789B3D" className="mr-2" />
              Login / <br /> Registre-se{" "}
            </button>
            <div
              className="
                dropdown-menu
                min-w-max
                absolute
                w-[20rem]
                min-h-[26rem]
                h-auto
                top-[3rem]
                left-[-8rem]
                bg-white
                z-50
                float-left
                px-4
                py-8
               text-left
                rounded-lg
                shadow-lg
                mt-1
                hidden
                m-0
                bg-clip-padding
                border
                border-gray-200
              "
              aria-labelledby="dropdownLogin"
            >
              <FormUserAccess type="userLogin" />
            </div>
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
          <PurchaseList />
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
    </header>
  );
}
