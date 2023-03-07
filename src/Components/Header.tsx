import classNames from "classnames";
import { ClipboardText, MagnifyingGlass, User } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Product } from "../Types/product.type";
import { User as UserType } from "../Types/user.type";
import Logo from "../assets/images/Logo.png";
import { CheckLocalStorage } from "../service/localStorage";
import { FormUserAccess } from "./FormUserAccess";
import { Menu_Sidebar } from "./Menu_Sidebar";
import { PurchaseList } from "./PurchaseList";

interface IPuchaseList {
  product: Product;
  quantity: number;
}

export function Header() {
  const [userStatus, setUserStatus] = useState<UserType | null>(null);
  const [puchaseListForQtd, setPuchaseListForQtf] = useState<IPuchaseList[]>(
    []
  );

  useEffect(() => {
    setUserStatus(CheckLocalStorage.getLoggedUser());
    setPuchaseListForQtf(CheckLocalStorage.getItemPurchaseList());
  }, []);

  const UserFirstName = userStatus?.u_full_name!.split(" ", 1);
  const CheckLogout = () => {
    Swal.fire({
      icon: "question",
      title: "Sair",
      showCancelButton: true,
      confirmButtonText: "Sim",
      text: "Deseja mesmo nos deixar ?",
    }).then((result) => {
      if (result.isConfirmed) {
        CheckLocalStorage.logout();
        window.location.reload();
      }
    });
  };

  return (
    <header className="relative w-full px-5 md:px-14">
      <nav className="navbar py-2  bg-white relative flex items-end w-full justify-between">
        <Menu_Sidebar type="default" />
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
        <Link to="/" className="w-[11rem]  mt-2">
          {" "}
          <img
            src={Logo}
            alt="Logo"
            className="w-full object-cover"
            loading="lazy"
          />
        </Link>
        <div className="header-icons-left w-10 md:w-[25%] flex  justify-end">
          <div className="dropdown relative  h-10 mr-6 hidden md:flex items-center">
            <button
              className="
              flex  
              items-end
              text-left
              font-body
              text-xs 
              font-semibold
              text-palm-700 ml-2  
              capitalize  
            "
              type="button"
              id="dropdownLogin"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <User size={32} color="#789B3D" className="mr-2" />
              {UserFirstName ? (
                UserFirstName
              ) : (
                <>
                  Login / <br /> Registre-se
                </>
              )}
            </button>
            <div
              className={classNames(
                " dropdown-menu min-w-max absolute  top-[3rem]   bg-white z-50 float-left  text-left  rounded-lg  shadow-lg mt-1  hidden   m-0   bg-clip-padding                border                border-gray-200               ",
                {
                  " w-[20rem]  min-h-[26rem] h-auto left-[-8rem] px-4  py-8":
                    !UserFirstName,
                  " w-[10rem]   h-auto py-2": UserFirstName,
                }
              )}
              aria-labelledby="dropdownLogin"
            >
              {UserFirstName ? (
                <div className="w-full h-full">
                  <Link
                    to={`/my-shop/${userStatus?._id}`}
                    className="flex justify-center items-center w-full text-center text-palm-700 text-sm py-2"
                  >
                    {" "}
                    Meu Perfil
                  </Link>
                  {userStatus?.u_type != "customer" && (
                    <Link
                      to="/Admin/create-product"
                      className="flex justify-center items-center  w-full text-center text-palm-700 text-sm py-2 m-0"
                    >
                      {" "}
                      Dashboard
                    </Link>
                  )}
                  <button
                    className="w-full text-center text-palm-700 text-sm py-2"
                    onClick={() => CheckLogout()}
                  >
                    {" "}
                    Sair da conta
                  </button>
                </div>
              ) : (
                <FormUserAccess type="userLogin" />
              )}
            </div>
          </div>

          <button
            className="w-10 h-9 relative mb-[1rem] md:mb-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#PurchaseList"
            aria-controls="PurchaseList"
          >
            <ClipboardText size={40} color="#789B3D" />
            <span className="w-5 h-5 rounded-2xl bg-palm-700 text-white text-xs text-center leading-5 absolute top-[-6px] right-[-2px]">
              {puchaseListForQtd?.length}
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
        <div className="flex justify-center">
          <div className="dropdown relative">
            <button
              className="
                text-lg 
                text-palm-700 
                font-normal 
                font-display
                dropdown-toggle
                transition
                duration-150
                ease-in-out
                flex
                items-center
                whitespace-nowrap
              "
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Territórios
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="caret-down"
                className="w-2 ml-2"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                ></path>
              </svg>
            </button>
            <ul
              className="
                dropdown-menu
                min-w-max
                w-[10rem]
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
              aria-labelledby="dropdownMenuButton1"
            >
              <li>
                <p
                  className="
                    dropdown-item
                    text-md
                    text-left
                    py-2
                    px-4
                    font-semibold
                    block
                    w-full
                    whitespace-nowrap
                    bg-transparent
                    text-gray-400
                    hover:bg-gray-100
                  "
                >
                  Bahia
                </p>
              </li>
              <li>
                <button
                  type="button"
                  className="
                    dropdown-item
                    text-sm
                    text-left
                    py-2
                    pr-4
                    pl-6
                    font-normal
                    block
                    w-full
                    whitespace-nowrap
                    bg-transparent
                    text-gray-700
                    hover:bg-gray-100
                  "
                >
                  Barra
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="
                    dropdown-item
                    text-sm
                    text-left
                    py-2
                    pr-4
                    pl-6
                    font-normal
                    block
                    w-full
                    whitespace-nowrap
                    bg-transparent
                    text-gray-700
                    hover:bg-gray-100
                  "
                >
                  Irecê
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="
                    dropdown-item
                    text-sm
                    text-left
                    py-2
                    pr-4
                    pl-6
                    font-normal
                    block
                    w-full
                    whitespace-nowrap
                    bg-transparent
                    text-gray-700
                    hover:bg-gray-100
                  "
                >
                  Xique-Xique
                </button>
              </li>
            </ul>
          </div>
        </div>
      </ul>

      <div className="relative w-full h-12 mt-4 md:hidden ">
        <input
          type="text"
          placeholder="Busque Aqui..."
          className="w-full h-full pl-2  border-[1px] rounded border-palm-700  focus:outline-none"
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
