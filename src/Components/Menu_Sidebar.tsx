import classNames from "classnames";
import {
  House,
  List,
  MapPinLine,
  ToteSimple,
  User,
  UsersThree,
} from "phosphor-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import exemple_user_profile from "../assets/images/exemple_user_profile.png";
import { AuthContext } from "../context/AuthContext";
import { FormUserAccess } from "./FormUserAccess";
import { MenuOfDashboard } from "./MenuOfDashboard";

type Prop = {
  type: "default" | "admin";
  setFilterByCity?: React.Dispatch<React.SetStateAction<string | null>>;
};
export function Menu_Sidebar({ type,setFilterByCity }: Prop) {
  const { userLogged } = useContext(AuthContext);
  const CheckLogout = () => {
    Swal.fire({
      icon: "question",
      title: "Sair",
      showCancelButton: true,
      confirmButtonText: "Sim",
      text: "Deseja mesmo nos deixar ?",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove('token');
        window.location.reload();
      }
    });
  };
  return (
    <div className="md:hidden m-0 p-0 ">
      <button
        className="md:hidden m-0 p-0 border-0"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      >
        <List size={40} color="#789B3D" className="md:hidden" />
      </button>

      <div
        className="offcanvas offcanvas-start w-[90vw] fixed bottom-0 flex 
        flex-col max-w-full bg-white invisible bg-clip-padding shadow-sm outline-none
        transition duration-300 ease-in-out text-gray-700 top-0 left-0 border-none "
        tabIndex={-1}
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        {type === "default" ? (
          <>
            <div className="w-full h-auto flex items-center justify-between border-b-[1px] py-6 px-2 border-palm-700">
              <div className="dropdown relative items-center">
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
                  {userLogged ? (
                    <div className="w-full h-full flex  justify-start  items-center ">
                      {userLogged?.u_img_profile &&
                      userLogged?.u_img_profile.length > 0 ? (
                        <img
                          src={userLogged.u_img_profile}
                          className="w-12 h-12 rounded-[50%]"
                        />
                      ) : (
                        <img
                          src={exemple_user_profile}
                          className="w-12 h-12 rounded-[50%]"
                        />
                      )}
                      <p className="w-full flex  text-md ml-2 ">
                        Minha Conta{" "}
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
                      </p>
                    </div>
                  ) : (
                    <div className="w-full h-full flex justify-start items-end">
                      <User size={32} color="#789B3D" className="mr-2" />
                      Login / <br /> Registre-se
                    </div>
                  )}
                </button>
                <div
                  className={classNames(
                    " dropdown-menu min-w-max absolute  top-[3rem]   bg-white z-50 float-left  text-left  rounded-lg  shadow-lg mt-1 hidden bg-clip-padding border border-gray-200",
                    {
                      "  min-h-[26rem] h-auto left-0 top-[4rem] px-4  py-8":
                        !userLogged,
                      " w-[13rem]   h-auto py-2": userLogged,
                    }
                  )}
                  aria-labelledby="dropdownLogin"
                >
                  {userLogged ? (
                    <div className="w-full h-full ">
                      <div className="w-full h-full flex flex-col justify-center items-center">
                        {userLogged?.u_img_profile &&
                        userLogged?.u_img_profile.length > 0 ? (
                          <img
                            src={userLogged.u_img_profile}
                            className="w-12 h-12 rounded-[50%]"
                          />
                        ) : (
                          <img
                            src={exemple_user_profile}
                            className="w-12 h-12 rounded-[50%]"
                          />
                        )}
                        <span className="w-full text-center text-[12px] text-gray-600 my-2">
                          {userLogged.u_email}
                        </span>
                      </div>
                      <div className="w-full h-full">
                        {userLogged?.u_type !== "customer" && (
                          <Link
                            to="/Admin/create-product"
                            className="block w-full text-center text-palm-700 text-sm py-3 m-0"
                          >
                            {" "}
                            Dashboard
                          </Link>
                        )}
                        <Link
                          to={`/my-shop/${userLogged?._id}`}
                          className="block w-full text-center text-palm-700 text-sm py-3"
                        >
                          {" "}
                          Meu Espaço
                        </Link>

                        <button
                          className="w-full text-center text-palm-700 text-sm py-3"
                          onClick={() => CheckLogout()}
                        >
                          {" "}
                          Sair da conta
                        </button>
                      </div>
                    </div>
                  ) : (
                    <FormUserAccess type="userLogin" />
                  )}
                </div>
              </div>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-2 -my-5  text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline mr-3"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <ul className="w-full  flex flex-col items-center justify-evenly mt-8 ">
              <li className="w-full px-2    ">
                {" "}
                <Link
                  to="/"
                  className="flex items-end text-left text-lg text-palm-700 font-normal font-display py-4 "
                >
                  <House size={28} weight="fill" className="mr-3" />
                  Início
                </Link>
              </li>
              <li className="w-full  px-2  ">
                {" "}
                <Link
                  to="/Products"
                  className="flex items-end  text-left text-lg text-palm-700 font-normal font-display py-4 "
                >
                  <ToteSimple size={28} weight="fill" className="mr-3" />
                  Produtos
                </Link>
              </li>
              <li className="w-full px-2   ">
                {" "}
                <Link
                  to="/Entities"
                  className="flex items-end text-left text-lg text-palm-700 font-normal font-display py-4"
                >
                  <UsersThree size={28} weight="fill" className="mr-3" />
                  Associações/Cooperativas
                </Link>
              </li>
              <li className="w-full  px-2   ">
                {" "}
                <Link
                  to="/Farmers"
                  className="flex items-end  text-left text-lg text-palm-700 font-normal font-display py-4"
                >
                  <User size={28} weight="fill" className="mr-3" />
                  Produtores
                </Link>
              </li>
              <li className="w-full  px-2 py-4 flex text-palm-700 items-center">
                <MapPinLine size={28} weight="fill" className="mr-3" />

                <select
                  className="
                    form-select 
                    appearance-none
                    block
                    w-full
                    py-2
                    text-lg
                    font-display
                    text-palm-700
                    bg-white bg-clip-padding bg-no-repeat
                    border-none
                    rounded
                    transition
                    ease-in-out
                    m-0                      
                  "
                  aria-label="Default select example"
                  onChange={(e) => setFilterByCity && setFilterByCity(e.target.value)}

                >
                  <option
                    value=""
                    className="flex items-end text-left text-lg text-palm-700 font-normal font-display  py-4 "
                  >
                    {" "}
                    Territórios
                  </option>
                  <optgroup
                    label="Bahia"
                    className="
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
                    "
                  >
                    <option
                      value="Barra"
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
                    </option>
                    <option
                      value="Irecê"
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
                    </option>
                    <option
                      value="Xique-Xique"
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
                    </option>
                  </optgroup>
                </select>
              </li>
            </ul>
          </>
        ) : (
          <MenuOfDashboard />
        )}
      </div>
    </div>
  );
}
